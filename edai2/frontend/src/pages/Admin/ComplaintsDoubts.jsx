import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const statusLabels = {
  pending: "Pending",
  in_progress: "In Progress",
  resolved: "Resolved",
};

const badgeClasses = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-yellow-100 text-yellow-700",
  urgent: "bg-red-100 text-red-700",
};

const ComplaintsDoubts = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [active, setActive] = useState("all"); // all | pending | in_progress | resolved
  const [search, setSearch] = useState("");

  const fetchData = async (statusFilter) => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (statusFilter && statusFilter !== "all") params.status = statusFilter;
      const { data } = await axios.get("/api/complaints", { params });
      setItems(data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(active);
  }, [active]);

  const onStatusChange = async (id, next) => {
    try {
      await axios.patch(`/api/complaints/${id}/status`, { status: next });
      // Optimistic update
      setItems((prev) => prev.map((it) => (it._id === id ? { ...it, status: next } : it)));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  const filtered = useMemo(() => {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter((it) =>
      it.subject?.toLowerCase().includes(q) || it.description?.toLowerCase().includes(q)
    );
  }, [items, search]);

  const counts = useMemo(() => {
    const c = { all: items.length, pending: 0, in_progress: 0, resolved: 0 };
    items.forEach((it) => {
      c[it.status] = (c[it.status] || 0) + 1;
    });
    return c;
  }, [items]);

  return (
    <div className="flex-1 ml-64">
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Smart Sentinel Admin Panel</h1>
      </header>

      <main className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Complaints & Doubts</h2>
              <p className="text-gray-600">Manage student issues and provide responses</p>
            </div>
            <div className="text-sm text-gray-600">{counts.pending} pending</div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {[
                { key: "all", label: "All Issues", count: counts.all },
                { key: "pending", label: "Pending", count: counts.pending },
                { key: "in_progress", label: "In Progress", count: counts.in_progress },
                { key: "resolved", label: "Resolved", count: counts.resolved },
              ].map((t) => (
                <button
                  key={t.key}
                  onClick={() => setActive(t.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap border ${
                    active === t.key
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200"
                  }`}
                >
                  {t.label} {typeof t.count === "number" ? `(${t.count})` : ""}
                </button>
              ))}

              <div className="ml-auto">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search subject/description"
                  className="px-3 py-2 border rounded-lg text-sm"
                />
              </div>
            </div>

            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            {loading ? (
              <div className="text-gray-600 text-sm">Loading...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-600 border-b">
                      <th className="py-2 pr-4">Subject</th>
                      <th className="py-2 pr-4">Category</th>
                      <th className="py-2 pr-4">Priority</th>
                      <th className="py-2 pr-4">Student</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2 pr-4">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((it) => (
                      <tr key={it._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="font-medium text-gray-900">{it.subject}</div>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide ${it.source === 'public' ? 'bg-gray-200 text-gray-700' : 'bg-green-200 text-green-800'}`}>
                              {it.source === 'public' ? 'Public' : 'Student'}
                            </span>
                          </div>
                          <div className="text-gray-600 line-clamp-1 max-w-xl">{it.description}</div>
                        </td>
                        <td className="py-3 pr-4 capitalize">{it.category}</td>
                        <td className="py-3 pr-4">
                          <span className={`px-2 py-1 rounded-full text-xs capitalize ${badgeClasses[it.priority] || 'bg-gray-100 text-gray-700'}`}>
                            {it.priority}
                          </span>
                        </td>
                        <td className="py-3 pr-4">
                          {it.student ? (
                            <div>
                              <div className="font-medium">{it.student?.name || 'N/A'}</div>
                              <div className="text-xs text-gray-500">{it.student?.studentId}</div>
                            </div>
                          ) : (it.contactName || it.contactEmail) ? (
                            <div>
                              <div className="font-medium">{it.contactName || 'Public User'}</div>
                              <div className="text-xs text-gray-500">{it.contactEmail}</div>
                            </div>
                          ) : it.anonymous ? (
                            <span className="text-gray-500 italic">Anonymous</span>
                          ) : (
                            <span className="text-gray-500 italic">Public</span>
                          )}
                        </td>
                        <td className="py-3 pr-4">
                          <select
                            className="px-2 py-1 border rounded-lg text-sm"
                            value={it.status}
                            onChange={(e) => onStatusChange(it._id, e.target.value)}
                          >
                            {Object.entries(statusLabels).map(([k, v]) => (
                              <option key={k} value={k}>{v}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 pr-4 text-xs text-gray-500">
                          {new Date(it.createdAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td className="py-6 text-center text-gray-500" colSpan={6}>
                          No items found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComplaintsDoubts;
