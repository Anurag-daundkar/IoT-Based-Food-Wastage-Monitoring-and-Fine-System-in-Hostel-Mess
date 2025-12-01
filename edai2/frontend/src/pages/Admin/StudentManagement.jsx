import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentManagement = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [actionMessage, setActionMessage] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/auth/students');
        setStudents(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load students');
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const mapStatus = (score) => {
    if (score < 50) return 'Excellent';
    if (score < 75) return 'Good';
    return 'Warning';
  };

  const filtered = useMemo(() => {
    return students.filter(s => {
      const matchesQuery =
        (s.name?.toLowerCase().includes(query.toLowerCase()) ||
         s.studentId?.toLowerCase().includes(query.toLowerCase()));
      const status = mapStatus(s.score ?? 0).toLowerCase();
      const matchesStatus = statusFilter === 'all' ? true : status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [students, query, statusFilter]);

  // Handle mark as paid
  const handleMarkAsPaid = async (studentId) => {
    try {
      await axios.put(`/api/auth/students/${studentId}/markPaid`);
      setActionMessage(`✅ Fine marked as paid for student ${studentId}!`);
      // Refresh students list
      const res = await axios.get('/api/auth/students');
      setStudents(res.data);
      setTimeout(() => setActionMessage(''), 3000);
    } catch {
      setActionMessage(`❌ Failed to mark fine as paid for ${studentId}.`);
      setTimeout(() => setActionMessage(''), 3000);
    }
  };

  // Handle send warning
  const handleSendWarning = async (studentId) => {
    try {
      await axios.post(`/api/auth/students/${studentId}/sendWarning`);
      setActionMessage(`⚠️ Warning sent to student ${studentId}!`);
      setTimeout(() => setActionMessage(''), 3000);
    } catch {
      setActionMessage(`❌ Failed to send warning to ${studentId}.`);
      setTimeout(() => setActionMessage(''), 3000);
    }
  };

  const exportToCSV = () => {
    const headers = ['Student Name','ID','Waste (kg)','Total Fines','Pending','Score','Status'];
    const rows = filtered.map(s => [
      s.name,
      s.studentId,
      s.waste,
      `₹${s.totalFine}`,
      `₹${s.pendingFine}`,
      s.score,
      mapStatus(s.score),
    ]);
    const csv = [headers, ...rows]
      .map(r => r.map(field => {
        const str = String(field ?? '');
        if (str.includes(',') || str.includes('"') || str.includes('\n')) {
          return '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
      }).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'students.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 ml-64">
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Smart Sentinel Admin Panel</h1>
      </header>

      <main className="p-6">
        {actionMessage && (
          <div className="mb-4 text-center text-sm font-medium text-green-600 animate-fade-in">
            {actionMessage}
          </div>
        )}
        <div className="space-y-6">
          {/* Header + Export */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Student Management</h2>
              <p className="text-gray-600">Monitor and manage all registered students</p>
            </div>
            <button
              onClick={exportToCSV}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Export Data
            </button>
          </div>

          {/* Filters + Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-6">
              <div className="flex flex-wrap gap-2">
                {['all','warning','good','excellent'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      statusFilter===status ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                    {status==='all' ? ` (${students.length})` : ''}
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  placeholder="Search by name or ID..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <i className="ri-search-line absolute left-3 top-2.5 text-gray-400"></i>
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Student</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Waste (kg)</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Fines</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Pending</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Score</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={8} className="text-center py-8">Loading...</td></tr>
                  ) : error ? (
                    <tr><td colSpan={8} className="text-center text-red-600 py-8">{error}</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={8} className="text-center py-8">No students found.</td></tr>
                  ) : filtered.map((s) => (
                    <tr
                      key={s._id}
                      className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="py-4 px-4 flex items-center space-x-3">
                        {s.photo ? (
                          <img
                            src={`/api/images/${s.photo}`}
                            alt={s.name}
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                            <i className="ri-user-line text-gray-600"></i>
                          </div>
                        )}
                        <span className="font-medium text-gray-900">{s.name}</span>
                      </td>
                      <td className="py-4 px-4 text-gray-700">{s.studentId}</td>
                      <td className="py-4 px-4 text-gray-700">{s.waste}</td>
                      <td className="py-4 px-4 text-red-600 font-semibold">₹{s.totalFine}</td>
                      <td className="py-4 px-4 text-gray-700">₹{s.pendingFine}</td>
                      <td className="py-4 px-4 text-gray-700">{s.score}</td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          mapStatus(s.score)==='Excellent' ? 'bg-green-100 text-green-700' :
                          mapStatus(s.score)==='Good' ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>{mapStatus(s.score)}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => navigate(`/Admin/Student/${s.studentId}`)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                          >
                            View Profile
                          </button>
                          {s.pendingFine > 0 && (
                            <button
                              onClick={() => handleMarkAsPaid(s.studentId)}
                              className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors"
                            >
                              Mark Paid
                            </button>
                          )}
                          <button
                            onClick={() => handleSendWarning(s.studentId)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-600 transition-colors"
                          >
                            Send Warning
                          </button>
                          <button
                            onClick={async () => {
                              if (!confirm(`Delete ${s.name} (${s.studentId})? This cannot be undone.`)) return;
                              try {
                                await axios.delete(`/api/auth/students/${s.studentId}`);
                                setActionMessage(`🗑️ Deleted ${s.studentId}`);
                                const res = await axios.get('/api/auth/students');
                                setStudents(res.data);
                                setTimeout(() => setActionMessage(''), 3000);
                              } catch {
                                setActionMessage(`❌ Failed to delete ${s.studentId}`);
                                setTimeout(() => setActionMessage(''), 3000);
                              }
                            }}
                            className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition-colors"
                          >
                            Delete Student
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentManagement;
