import React, { useMemo, useState, useEffect } from 'react';
import axios from 'axios';
import { FaRupeeSign, FaUsers } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';

const months = ['Jan','Feb','Mar','Apr','May','Jun'];

const LineChartMini = ({ data }) => {
  const width = 1070; // responsive container will scale it
  const height = 300;
  const paddingLeft = 65;
  const paddingTop = 5;
  const paddingBottom = 35;
  const innerWidth = width - paddingLeft;
  const innerHeight = height - paddingTop - paddingBottom;

  const rawMax = Math.max(...data.map(d => d.value)) || 1;
  const minY = 0;
  const step = Math.max(1, Math.ceil((rawMax / 4) / 100) * 100);
  const niceMax = step * 4;
  const maxY = Math.max(rawMax, niceMax);
  const yTicks = [0, step, step * 2, step * 3, step * 4];
  const points = data.map((d, i) => {
    const x = paddingLeft + (innerWidth / (data.length - 1)) * i;
    const y = paddingTop + innerHeight * (1 - (d.value - minY) / (maxY - minY));
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-full h-[300px]" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Fine Collection Trends">
      {/* Horizontal grid lines */}
      {yTicks.map((t, i) => {
        const y = paddingTop + innerHeight * (1 - (t - minY) / (maxY - minY));
        return <line key={`g-${i}`} x1={paddingLeft} y1={y} x2={width} y2={y} stroke="#e5e7eb" strokeDasharray="3 3" />
      })}
      {/* Y axis */}
      <line x1={paddingLeft} y1={paddingTop} x2={paddingLeft} y2={paddingTop + innerHeight} stroke="#9ca3af" />
      {yTicks.map((t, i) => {
        const y = paddingTop + innerHeight * (1 - (t - minY) / (maxY - minY));
        return (
          <text key={`y-${i}`} x={paddingLeft - 8} y={y} textAnchor="end" dominantBaseline="middle" className="fill-gray-500 text-[12px]">{t}</text>
        );
      })}
      <polyline fill="none" stroke="#ef4444" strokeWidth="3" points={points} />
      {data.map((d, i) => {
        const x = paddingLeft + (innerWidth / (data.length - 1)) * i;
        const y = paddingTop + innerHeight * (1 - d.value / maxY);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="4" fill="#fff" stroke="#ef4444" strokeWidth="3" />
            <text x={x} y={y - 10} textAnchor="middle" className="fill-gray-700 text-[11px]">{d.value}</text>
          </g>
        )
      })}
      {/* X labels */}
      {data.map((d, i) => {
        const x = paddingLeft + (innerWidth / (data.length - 1)) * i;
        return (
          <text key={`x-${i}`} x={x} y={height - 8} textAnchor="middle" className="fill-gray-500 text-[12px]">{d.month}</text>
        )
      })}
      {/* Y baseline */}
      <line x1={paddingLeft} y1={height - paddingBottom} x2={width} y2={height - paddingBottom} stroke="#e5e7eb" strokeDasharray="3 3" />
    </svg>
  );
};

const BarChartMini = ({ data }) => {
  const width = 1070;
  const height = 300;
  const paddingLeft = 65;
  const paddingRight = 20;
  const paddingBottom = 30;
  const innerWidth = width - paddingLeft - paddingRight;
  const innerHeight = height - paddingBottom;
  const rawMax = Math.max(...data.map(d => d.value)) || 1;
  const step = Math.max(1, Math.ceil((rawMax / 4) / 10) * 10);
  const niceMax = step * 4;
  const maxY = Math.max(rawMax, niceMax);
  const yTicks = [0, step, step * 2, step * 3, step * 4];
  const barWidth = innerWidth / data.length * 0.6;

  return (
    <svg className="w-full h-[300px]" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Waste by Month">
      {/* Horizontal grid and Y axis */}
      {yTicks.map((t, i) => {
        const y = (height - paddingBottom) - innerHeight * (t / maxY);
        return <line key={`g-${i}`} x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#e5e7eb" strokeDasharray="3 3" />
      })}
      <line x1={paddingLeft} y1={height - paddingBottom - innerHeight} x2={paddingLeft} y2={height - paddingBottom} stroke="#9ca3af" />
      {yTicks.map((t, i) => {
        const y = (height - paddingBottom) - innerHeight * (t / maxY);
        return (
          <text key={`y-${i}`} x={paddingLeft - 8} y={y} textAnchor="end" dominantBaseline="middle" className="fill-gray-500 text-[12px]">{t}</text>
        );
      })}
      {data.map((d, i) => {
        const x = paddingLeft + (innerWidth / data.length) * i + (innerWidth / data.length - barWidth) / 2;
        const h = innerHeight * (d.value / maxY);
        const y = height - paddingBottom - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barWidth} height={h} fill="#fb923c" rx="6" />
            <text x={x + barWidth / 2} y={height - 8} textAnchor="middle" className="fill-gray-500 text-[12px]">{d.month}</text>
            <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" className="fill-gray-700 text-[11px]">{d.value}</text>
          </g>
        );
      })}
      <line x1={paddingLeft} y1={height - paddingBottom} x2={width - paddingRight} y2={height - paddingBottom} stroke="#e5e7eb" strokeDasharray="3 3" />
    </svg>
  );
};

const TopStudentsList = ({ students }) => {
  return (
    <div className="space-y-3">
      {students.map((s, idx) => (
        <div key={s.id} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">{idx + 1}</div>
            <div>
              <div className="font-medium text-gray-900">{s.name}</div>
              <div className="text-xs text-gray-500">ID: {s.studentId}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Waste (kg)</div>
            <div className="text-lg font-semibold text-gray-900">{s.kg}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const [expanded, setExpanded] = useState(null); // 'fines' | 'waste' | 'top' | null
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/api/auth/analytics/monthly');
        setAnalyticsData(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        // Fallback to mock data if API fails
        setAnalyticsData({
          monthlyData: months.map((m, i) => ({
            monthName: m,
            totalWaste: [120, 150, 130, 200, 180, 210][i],
            totalFinesCollected: [1800, 2600, 2300, 4800, 4200, 5200][i]
          })),
          currentMonthTopStudents: [
            { id: 'ST2024007', name: 'Rahul Sharma', studentId: 'ST2024007', waste: 26.3, fines: 850 },
            { id: 'ST2024011', name: 'Aisha Khan', studentId: 'ST2024011', waste: 24.8, fines: 750 },
            { id: 'ST2024003', name: 'Vikram Singh', studentId: 'ST2024003', waste: 22.1, fines: 650 },
            { id: 'ST2024020', name: 'Neha Patel', studentId: 'ST2024020', waste: 20.5, fines: 600 },
            { id: 'ST2024015', name: 'Arjun Mehta', studentId: 'ST2024015', waste: 18.9, fines: 550 },
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const fineTrend = useMemo(() => {
    if (!analyticsData?.monthlyData) return [];
    return analyticsData.monthlyData.map(data => ({
      month: data.monthName,
      value: data.totalFinesCollected
    }));
  }, [analyticsData]);

  const wasteByMonth = useMemo(() => {
    if (!analyticsData?.monthlyData) return [];
    return analyticsData.monthlyData.map(data => ({
      month: data.monthName,
      value: data.totalWaste
    }));
  }, [analyticsData]);

  const topStudents = useMemo(() => {
    if (!analyticsData?.currentMonthTopStudents) return [];
    return analyticsData.currentMonthTopStudents.map(student => ({
      id: student.id,
      name: student.name,
      studentId: student.studentId,
      kg: student.waste,
      fine: `₹${student.fines}`
    }));
  }, [analyticsData]);

  const toggle = (key) => setExpanded(prev => prev === key ? null : key);


  if (loading) {
    return (
      <div className="flex-1 ml-64">
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Smart Sentinel Admin Panel</h1>
        </header>
        <main className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading analytics data...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const currentMonthData = analyticsData?.summary?.currentMonth;
  const totalFinesCollected = analyticsData?.summary?.totalFinesCollected || 0;
  const totalWaste = analyticsData?.summary?.totalWaste || 0;

  return (
    <div className="flex-1 ml-64">
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Smart Sentinel Admin Panel</h1>
        <p className="text-sm text-gray-600 mt-1">Real-time analytics and student waste management</p>
      </header>

      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <button onClick={() => toggle('fines')} className={`text-left bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow ${expanded === 'fines' ? 'ring-1 ring-red-200' : ''}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Fine Collected</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">₹{totalFinesCollected.toLocaleString()}</p>
                <p className="text-xs text-gray-500">From {analyticsData?.currentMonthTopStudents?.length || 0} students • Last 6 months</p>
              </div>
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
              <FaRupeeSign className="text-white w-6 h-6 m-1" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-blue-600">
              <span className="text-sm font-medium">Click to {expanded === 'fines' ? 'collapse' : 'expand'}</span>
              <i className={`ri-arrow-${expanded === 'fines' ? 'down' : 'right'}-line ml-1`}></i>
            </div>
          </button>

          <button onClick={() => toggle('waste')} className={`text-left bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow ${expanded === 'waste' ? 'ring-1 ring-orange-200' : ''}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Waste Thrown</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">{totalWaste} kg</p>
                <p className="text-xs text-gray-500">From {analyticsData?.currentMonthTopStudents?.length || 0} students • Last 6 months</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <FaTrashAlt className="text-white w-6 h-6 m-1" />
              
              </div>
            </div>
            <div className="mt-4 flex items-center text-blue-600">
              <span className="text-sm font-medium">Click to {expanded === 'waste' ? 'collapse' : 'expand'}</span>
              <i className={`ri-arrow-${expanded === 'waste' ? 'down' : 'right'}-line ml-1`}></i>
            </div>
          </button>

          <button onClick={() => toggle('top')} className={`text-left bg-white rounded-xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow ${expanded === 'top' ? 'ring-1 ring-blue-200' : ''}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Top Waste Throwers</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">Top {topStudents.length}</p>
                <p className="text-xs text-gray-500">Ranked by waste amount • Current month</p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <FaUsers className="text-white w-6 h-6 m-1" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-blue-600">
              <span className="text-sm font-medium">Click to {expanded === 'top' ? 'collapse' : 'expand'}</span>
              <i className={`ri-arrow-${expanded === 'top' ? 'down' : 'right'}-line ml-1`}></i>
            </div>
          </button>
        </div>

        {/* Expandable sections */}
        {expanded === 'fines' && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Fine Collection Analytics</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Total Collected: ₹{totalFinesCollected.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Last 6 Months</span>
                </div>
              </div>
            </div>
            
            {fineTrend.length > 0 ? (
              <div>
                <LineChartMini data={fineTrend} />
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Average Monthly Collection</div>
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{Math.round(totalFinesCollected / 6).toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Highest Month</div>
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{Math.max(...fineTrend.map(d => d.value)).toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Total Students with Fines</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {analyticsData?.currentMonthTopStudents?.length || 0}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <i className="ri-line-chart-line text-4xl mb-2"></i>
                <p>No fine collection data available</p>
              </div>
            )}
          </div>
        )}

        {expanded === 'waste' && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Waste Management Analytics</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Total Waste: {totalWaste} kg</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Last 6 Months</span>
                </div>
              </div>
            </div>
            
            {wasteByMonth.length > 0 ? (
              <div>
                <BarChartMini data={wasteByMonth} />
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Average Monthly Waste</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round(totalWaste / 6)} kg
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Highest Month</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.max(...wasteByMonth.map(d => d.value))} kg
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Total Students Tracked</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {analyticsData?.currentMonthTopStudents?.length || 0}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <i className="ri-bar-chart-line text-4xl mb-2"></i>
                <p>No waste data available</p>
              </div>
            )}
          </div>
        )}

        {expanded === 'top' && (
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Top Waste Throwers - Current Month</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Ranked by Waste Amount</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Total Students: {topStudents.length}</span>
                </div>
              </div>
            </div>
            
            {topStudents.length > 0 ? (
              <div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Student Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Student ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Waste (kg)</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Total Fines</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topStudents.map((s, index) => (
                        <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold">
                              {index + 1}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <i className="ri-user-line text-gray-600"></i>
                              </div>
                              <span className="font-medium text-gray-900">{s.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-gray-600 font-mono text-sm">{s.studentId}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-700 font-semibold">{s.kg} kg</span>
                              {index === 0 && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Highest</span>}
                            </div>
                          </td>
                          <td className="py-4 px-4 text-red-600 font-semibold">{s.fine}</td>
                          <td className="py-4 px-4">
                            <button onClick={() => setSelectedStudent(s)} className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors whitespace-nowrap">View Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Highest Waste Amount</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.max(...topStudents.map(s => s.kg))} kg
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Average Waste per Student</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {Math.round(topStudents.reduce((sum, s) => sum + s.kg, 0) / topStudents.length)} kg
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600">Total Fines from Top Students</div>
                    <div className="text-2xl font-bold text-red-600">
                      ₹{topStudents.reduce((sum, s) => sum + parseInt(s.fine.replace('₹', '')), 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <i className="ri-user-line text-4xl mb-2"></i>
                <p>No student data available for current month</p>
              </div>
            )}
          </div>
        )}
        {/* Student details modal */}
        {selectedStudent && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedStudent(null)}></div>
            <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 w-[90%] max-w-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Student Details</h4>
                  <p className="text-sm text-gray-500">Top waste thrower summary</p>
                </div>
                <button onClick={() => setSelectedStudent(null)} className="text-gray-500 hover:text-gray-700">
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-gray-600 text-xl"></i>
                </div>
                <div>
                  <div className="text-lg font-semibold text-gray-900">{selectedStudent.name}</div>
                  <div className="text-sm text-gray-500">ID: {selectedStudent.id}</div>
          </div>
        </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="text-sm text-gray-600">Waste (kg)</div>
                  <div className="text-2xl font-bold text-gray-900">{selectedStudent.kg}</div>
                </div>
                <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                  <div className="text-sm text-gray-600">Total Fines</div>
                  <div className="text-2xl font-bold text-red-600">{selectedStudent.fine}</div>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <button onClick={() => setSelectedStudent(null)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Close</button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;
