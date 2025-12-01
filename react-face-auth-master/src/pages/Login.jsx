import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { ref, set, get, onValue } from "firebase/database";
import { database } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [matchedAccount, setMatchedAccount] = useState(null);
  const [localUserStream, setLocalUserStream] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceApiLoaded, setFaceApiLoaded] = useState(false);
  const [loginResult, setLoginResult] = useState("PENDING");
  const [imageError, setImageError] = useState(false);
  const [counter, setCounter] = useState(3);
  const [labeledFaceDescriptors, setLabeledFaceDescriptors] = useState(null);
  const [labelToAccount, setLabelToAccount] = useState({});
  const videoRef = useRef();
  const canvasRef = useRef();
  const faceApiIntervalRef = useRef();
  const videoWidth = 640;
  const videoHeight = 360;

  const navigate = useNavigate();

  const loadModels = async () => {
    // const uri = import.meta.env.DEV ? "/models" : "/react-face-auth/models";
    const uri = "/models";

    await faceapi.nets.ssdMobilenetv1.loadFromUri(uri);
    await faceapi.nets.faceLandmark68Net.loadFromUri(uri);
    await faceapi.nets.faceRecognitionNet.loadFromUri(uri);
  };

  useEffect(() => {
    // Load models then preload labeled images from backend
    loadModels()
      .then(async () => {
        const { descriptors, mapping } = await loadLabeledImages();
        setLabeledFaceDescriptors(descriptors);
        setLabelToAccount(mapping);
      })
      .then(() => setModelsLoaded(true));
  }, []);

  // Auto-start camera and scanning when Firebase solve=true
  // useEffect(() => {
  //   const solveRef = ref(database, 'solve');
  //   const unsub = onValue(solveRef, (snap) => {
  //     const val = snap.val();
  //     if (val === true) {
  //       if (modelsLoaded && !localUserStream) {
  //         getLocalUserVideo();
  //       }
  //     }
  //   });
  //   return () => unsub();
  // }, [modelsLoaded, localUserStream]);






  useEffect(() => {
  const solveRef = ref(database, "solve");

  const unsub = onValue(solveRef, (snap) => {
    const val = snap.val();

    if (val === true) {
      // Start camera auto
      if (modelsLoaded && !localUserStream) {
        getLocalUserVideo();
      }
    } else {
      // Stop camera when solve becomes false
      if (localUserStream) {
        localUserStream.getTracks().forEach((t) => t.stop());
        videoRef.current.srcObject = null;
        setLocalUserStream(null);
      }
    }
  });

  return () => unsub();
}, [modelsLoaded, localUserStream]);







  useEffect(() => {
    if (loginResult === "SUCCESS") {
      const counterInterval = setInterval(() => {
        setCounter((counter) => counter - 1);
      }, 1000);

      if (counter === 0) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
        localUserStream.getTracks().forEach((track) => {
          track.stop();
        });
        clearInterval(counterInterval);
        clearInterval(faceApiIntervalRef.current);
        localStorage.setItem(
          "faceAuth",
          JSON.stringify({ status: true, account: matchedAccount })
        );
        navigate("/protected", { replace: true });
      }

      return () => clearInterval(counterInterval);
    }
    setCounter(3);
  }, [loginResult, counter]);

  const getLocalUserVideo = async () => {
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setLocalUserStream(stream);
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const scanFace = async () => {
    faceapi.matchDimensions(canvasRef.current, videoRef.current);
    const faceApiInterval = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current)
        .withFaceLandmarks()
        .withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, {
        width: videoWidth,
        height: videoHeight,
      });

      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors);

      const results = resizedDetections.map((d) =>
        faceMatcher.findBestMatch(d.descriptor)
      );

      if (!canvasRef.current) {
        return;
      }

      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, videoWidth, videoHeight);
      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);

      if (results.length > 0) {
        const best = results[0];
        const account = labelToAccount[best.label];
          if (account) {
          setMatchedAccount(account);
          setLoginResult("SUCCESS");
          // Proceed to write detected student info to Firebase Realtime Database
            
            // Write last detection WITHOUT check flag (will be set on Protected page)
            const detectionPayload = {
              id: account.id,
              fullName: account.fullName,
              picture: account.picture,
              detectedAt: new Date().toISOString(),
              check: false, // Keep false during scanning, will be set to true on Protected page
            };
            set(ref(database, "lastDetected"), detectionPayload);

            // Get current month and year
            const now = new Date();
            const currentMonth = now.getMonth() + 1; // 1-12
            const currentYear = now.getFullYear();
            
            // Update student's monthly data
            const studentRef = ref(database, `students/${account.id}`);
            
            // First get current data
            const getCurrentData = async () => {
              try {
                const snapshot = await get(studentRef);
                const studentData = snapshot.val() || {};
                const monthlyData = studentData.monthlyData || [];

                // Find or create current month's data
                let currentMonthData = monthlyData.find(
                  (m) => m.year === currentYear && m.month === currentMonth
                );

                if (!currentMonthData) {
                  currentMonthData = {
                    year: currentYear,
                    month: currentMonth,
                    waste: 0,
                    finesCollected: 0,
                    finesPending: 0,
                    totalFines: studentData.totalFine || 0,
                    score: studentData.score || 100,
                  };
                  monthlyData.push(currentMonthData);
                }

                // Compute aggregated totals from monthlyData so root fields reflect sums
                const totalWaste = monthlyData.reduce((s, m) => s + (m.waste || 0), 0);
                const totalFines = monthlyData.reduce((s, m) => s + (m.totalFines || 0), 0);
                const totalPending = monthlyData.reduce((s, m) => s + (m.finesPending || 0), 0);
                const scoreAvg =
                  monthlyData.length > 0
                    ? Math.round(
                        monthlyData.reduce((s, m) => s + (m.score || 0), 0) / monthlyData.length
                      )
                    : studentData.score || 0;

                const updatedStudent = {
                  ...studentData,
                  monthlyData,
                  waste: totalWaste,
                  totalFine: totalFines,
                  pendingFine: totalPending,
                  score: scoreAvg,
                };

                // Save updated student record (structure preserved)
                set(studentRef, updatedStudent);
                
                // Also update lastDetected/month with current month data
                const lastDetectedMonthRef = ref(database, 'lastDetected/month');
                set(lastDetectedMonthRef, currentMonthData);
              } catch (e) {
                console.error("Failed to update student monthly data:", e);
              }
            };
            
            // Wait for Firebase update to complete then request backend to recompute aggregates
            await getCurrentData();
            try {
              // First try to get mongoId from sync response by calling sync/login synchronously
              const syncResp = await fetch('http://localhost:5000/api/sync/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId: account.id }),
              }).catch(() => null);

              let mongoId = null;
              if (syncResp) {
                const syncJson = await syncResp.json().catch(() => null);
                mongoId = syncJson?.data?.mongoId || syncJson?.mongoId || null;
              }

              // If backend didn't return mongoId, try to fetch user by studentId
              if (!mongoId) {
                try {
                  const userResp = await fetch(`http://localhost:5000/api/auth/students/${account.id}`);
                  if (userResp && userResp.ok) {
                    const userJson = await userResp.json().catch(() => null);
                    mongoId = userJson?.id || null;
                  }
                } catch (e) {
                  console.error('Failed to fetch user by studentId:', e);
                }
              }

              if (mongoId) {
                fetch(`http://localhost:5000/api/users/${mongoId}/aggregate`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                }).catch((e) => console.error('Failed to call aggregate endpoint:', e));
              }
            } catch (e) {
              console.error('Aggregate call error:', e);
            }
          
        } else {
          setLoginResult("FAILED");
        }
      } else {
        setLoginResult("FAILED");
      }

      if (!faceApiLoaded) {
        setFaceApiLoaded(true);
      }
    }, 1000 / 15);
    faceApiIntervalRef.current = faceApiInterval;
  };

  async function loadLabeledImages() {
    // Load all registered users' images from backend and build labeled descriptors
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const files = await res.json();
      const mapping = {};
      const labeled = [];
      for (const f of files) {
        try {
          const label = (f.metadata && (f.metadata.userId || f._id)) || f.id || String(f._id);
          const fullName = (f.metadata && f.metadata.fullName) || "Unknown";
          const url = f.url || `/api/images/${f.id || f._id}`;
          const img = await faceapi.fetchImage(url);
          const det = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          if (det) {
            labeled.push(new faceapi.LabeledFaceDescriptors(String(label), [det.descriptor]));
            mapping[String(label)] = {
              id: String(label),
              fullName,
              type: "CUSTOM",
              picture: url,
            };
          }
        } catch (e) {
          // skip image if fails
        }
      }
      if (labeled.length === 0) {
        setImageError(true);
      }
      return { descriptors: labeled, mapping };
    } catch (e) {
      setImageError(true);
      return { descriptors: [], mapping: {} };
    }
  }

  if (imageError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-[24px] max-w-[840px] mx-auto">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-rose-700 sm:text-4xl">
          <span className="block">
            Upps! There is no profile picture associated with this account.
          </span>
        </h2>
        <span className="block mt-4">
          Please contact administration for registration or try again later.
        </span>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-[24px] max-w-[720px] mx-auto">
      {!localUserStream && !modelsLoaded && (
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-700 sm:text-4xl">
          <span className="block">
            Please For Models to Load
          </span>
          <span className="block text-green-600 mt-2">Loading Models...</span>
        </h2>
      )}
      {!localUserStream && modelsLoaded && (
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block text-green-600 mt-2">
            To Throw Waste Click on Throw Waste
          </span>
        </h2>
      )}
      {localUserStream && loginResult === "SUCCESS" && (
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block text-green-600 mt-2">
            We've successfully recognize your face!
          </span>
          <span className="block text-green-600 mt-2">
            Please stay {counter} more seconds...
          </span>
        </h2>
      )}
      {localUserStream && loginResult === "FAILED" && (
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-rose-700 sm:text-4xl">
          <span className="block mt-[56px]">
            Upps! We did not recognize your face.
          </span>
        </h2>
      )}
      {localUserStream && !faceApiLoaded && loginResult === "PENDING" && (
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block mt-[56px]">Scanning Face...</span>
        </h2>
      )}
      <div className="w-full">
        <div className="relative flex flex-col items-center p-[10px]">
          <video
            muted
            autoPlay
            ref={videoRef}
            height={videoHeight}
            width={videoWidth}
            onPlay={scanFace}
            style={{
              objectFit: "fill",
              height: "360px",
              borderRadius: "10px",
              display: localUserStream ? "block" : "none",
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              display: localUserStream ? "block" : "none",
            }}
          />
        </div>
        {!localUserStream && (
          <>
            {modelsLoaded ? (
              <>
                <button
                  onClick={getLocalUserVideo}
                  type="button"
                  className="flex justify-center items-center w-full py-2.5 px-5 mr-2 text-sm font-medium text-white bg-green-500 hover:bg-gren-700 rounded-lg border border-gray-200 inline-flex items-center"
                >
                  Throw Waste
                </button>
              </>
            ) : (
              <>

                <button
                  disabled
                  type="button"
                  className="cursor-not-allowed flex justify-center items-center w-full py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 inline-flex items-center"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline mr-2 w-4 h-4 text-gray-200 animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                  Please wait while models were loading...
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Login;