import React from "react";

const ComplaintsDoubts = () => {
  return (
    <div className="flex-1 ml-64">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Smart Sentinel Admin Panel</h1>
      </header>

      {/* Main */}
      <main className="p-6">
        <div className="space-y-6">
          {/* Title */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Complaints & Doubts</h2>
              <p className="text-gray-600">Manage student issues and provide responses</p>
            </div>
            <div className="text-sm text-gray-600">2 pending issues</div>
          </div>

          {/* Filter Buttons */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-wrap gap-2 mb-6">
              <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap bg-green-100 text-green-700 border border-green-200">
                All Issues
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap bg-gray-100 text-gray-700 hover:bg-gray-200">
                Pending 
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap bg-gray-100 text-gray-700 hover:bg-gray-200">
                Complaints
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap bg-gray-100 text-gray-700 hover:bg-gray-200">
                Doubts
              </button>
            </div>

            
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComplaintsDoubts;
