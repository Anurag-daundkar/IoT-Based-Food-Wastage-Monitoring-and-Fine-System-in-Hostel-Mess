import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const StudentProfile = () => {
  const { id } = useParams(); // studentId
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");

  // Fetch student data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`/api/auth/students/${id}`);
        setStudent(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch student data");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  // Handle mark as paid
  const handleMarkAsPaid = async () => {
    try {
      // Mark all pending fines as paid on the backend
      await axios.put(`/api/auth/students/${id}/markPaid`);

      // Refetch the latest student data so UI reflects updated totals
      const res = await axios.get(`/api/auth/students/${id}`);
      setStudent(res.data);

      setActionMessage("✅ Fine marked as paid successfully!");
      setTimeout(() => setActionMessage(""), 3000);
    } catch {
      setActionMessage("❌ Failed to mark fine as paid.");
      setTimeout(() => setActionMessage(""), 3000);
    }
  };

  // Handle send warning
  const handleSendWarning = async () => {
    try {
      await axios.post(`/api/auth/students/${id}/sendWarning`);
      setActionMessage("⚠️ Warning sent successfully!");
      setTimeout(() => setActionMessage(""), 3000);
    } catch {
      setActionMessage("❌ Failed to send warning.");
      setTimeout(() => setActionMessage(""), 3000);
    }
  };

  if (loading) return <div className="flex-1 ml-64 p-6">Loading...</div>;
  if (error) return <div className="flex-1 ml-64 p-6 text-red-600">{error}</div>;

  return (
    <div className="flex-1 ml-64">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Student Profile</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {actionMessage && (
          <div className="mb-4 text-center text-sm font-medium text-green-600 animate-fade-in">
            {actionMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                  {student.photo ? (
                    <img
                      src={student.photo}
                      alt="Profile"
                      className="w-14 h-14 rounded-full"
                    />
                  ) : (
                    <i className="ri-user-line text-gray-600 text-2xl"></i>
                  )}
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">{student.name}</div>
                  <div className="text-sm text-gray-600">ID: {student.studentId}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-medium text-gray-900">{student.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">College</div>
                  <div className="font-medium text-gray-900">{student.college}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Room</div>
                  <div className="font-medium text-gray-900">{student.roomNumber}</div>
                </div>
              </div>
            </div>

            {/* Waste & Fines */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Waste & Fines</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="text-sm text-gray-600">Waste (kg)</div>
                  <div className="text-2xl font-bold text-gray-900">{student.waste}</div>
                </div>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="text-sm text-gray-600">Total Fines</div>
                  <div className="text-2xl font-bold text-red-600">₹{student.totalFine}</div>
                </div>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="text-sm text-gray-600">Pending</div>
                  <div className="text-2xl font-bold text-gray-900">₹{student.pendingFine}</div>
                </div>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="text-sm text-gray-600">Score</div>
                  <div className="text-2xl font-bold text-gray-900">{student.score}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
              <div className="text-sm text-gray-600 mb-1">Status</div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  student.score < 50
                    ? "bg-green-100 text-green-700"
                    : student.score < 75
                    ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {student.score < 50
                  ? "Excellent"
                  : student.score < 75
                  ? "Good"
                  : "Warning"}
              </span>

              {/* Divider */}
              <div className="w-full h-px bg-gray-200 my-4"></div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={handleMarkAsPaid}
                  className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition duration-200"
                >
                  💰 Mark as Paid
                </button>
                <button
                  onClick={handleSendWarning}
                  className="w-full py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition duration-200"
                >
                  ⚠️ Send Warning
                </button>
              </div>

              {/* Small note */}
              <p className="text-xs text-gray-500 mt-3">
                Manage student fines and performance from here.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentProfile;
