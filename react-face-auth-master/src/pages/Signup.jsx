import React, { useState } from "react";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!fullName || !file) {
      setMessage("Please provide name and a photo.");
      return;
    }
    try {
      setSubmitting(true);
      const form = new FormData();
      form.append("image", file);
      form.append("fullName", fullName);
      form.append("userId", crypto.randomUUID());

      const res = await fetch("/api/users", { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setMessage(`Signed up as ${fullName}. You can now log in.`);
      setFullName("");
      setFile(null);
      const input = document.getElementById("signup-file");
      if (input) input.value = "";
    } catch (err) {
      setMessage("Error while signing up. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center gap-[24px] w-full max-w-[720px] mx-auto">
      <h1 className="text-2xl font-semibold">Sign up</h1>
      <form onSubmit={onSubmit} className="w-full max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="Anurag Daundkar"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Photo</label>
          <input
            id="signup-file"
            type="file"
            accept=".png,.jpg,.jpeg"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1 block w-full text-sm text-gray-500"
          />
        </div>
        <button
          disabled={submitting}
          type="submit"
          className={`w-full py-2.5 px-5 text-sm font-medium text-white rounded-lg ${
            submitting ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-700"
          }`}
        >
          {submitting ? "Submitting..." : "Create account"}
        </button>
        {message && <p className="text-sm text-center text-gray-600">{message}</p>}
      </form>
    </div>
  );
}

export default Signup;


