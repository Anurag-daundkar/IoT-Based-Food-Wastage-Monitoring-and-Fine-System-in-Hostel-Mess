import React, { useMemo } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Waste = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  // Get current month data
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  const currentMonthData = useMemo(() => {
    if (!user?.monthlyData) return null
    return user.monthlyData.find(data => data.year === currentYear && data.month === currentMonth)
  }, [user, currentYear, currentMonth])

  const totalWasteKg = useMemo(() => {
    if (!currentMonthData) return '0 kg'
    return `${currentMonthData.waste?.toFixed(1) || 0} kg`
  }, [currentMonthData])

  const pendingFine = user?.pendingFine ?? 0
  const paidFine = (user?.totalFine ?? 0) - pendingFine

  // Get last 6 months of data for chart
  const monthlyWasteData = useMemo(() => {
    if (!user?.monthlyData) return []
    
    const months = []
    for (let i = 5; i >= 0; i--) {
      const date = new Date(currentYear, currentMonth - 1 - i, 1)
      const monthName = date.toLocaleString('default', { month: 'short' })
      const monthData = user.monthlyData.find(
        data => data.year === date.getFullYear() && data.month === date.getMonth() + 1
      )
      
      months.push({
        month: monthName,
        waste: monthData?.waste || 0,
        finesCollected: monthData?.finesCollected || 0,
        finesPending: monthData?.finesPending || 0
      })
    }
    return months
  }, [user, currentYear, currentMonth])

  // Calculate average monthly waste
  const averageMonthlyWaste = useMemo(() => {
    if (!user?.monthlyData || user.monthlyData.length === 0) return 0
    const total = user.monthlyData.reduce((sum, data) => sum + (data.waste || 0), 0)
    return (total / user.monthlyData.length).toFixed(1)
  }, [user])

  return (
    <div className="flex-1 ml-64">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Manage your profile, track waste data, and stay connected with campus sustainability.</p>
        </div>

        <div className="space-y-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg  p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Waste</p>
                  <p className="text-2xl font-bold text-gray-900">{totalWasteKg}</p>
                  <p className="text-xs text-green-600 mt-1">This month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-delete-bin-line text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg  p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Fines</p>
                  <p className="text-2xl font-bold text-red-600">₹{pendingFine}</p>
                  <p className="text-xs text-red-600 mt-1">Due soon</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-dollar-circle-line text-red-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg  p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Waste (All Time)</p>
                  <p className="text-2xl font-bold text-green-600">{user?.waste?.toFixed(1) || 0} kg</p>
                  <p className="text-xs text-green-600 mt-1">Lifetime</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-recycle-line text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg  p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Compliance Score</p>
                  <p className="text-2xl font-bold text-blue-600">{user?.score ?? 0}%</p>
                  <p className="text-xs text-blue-600 mt-1">Good standing</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-shield-check-line text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly waste tracking */}
            <div className="bg-white rounded-xl shadow-lg  p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Waste Tracking</h3>
              <div className="space-y-4">
                {monthlyWasteData.length > 0 ? (
                  monthlyWasteData.map((row, index) => {
                    const maxWaste = Math.max(...monthlyWasteData.map(m => m.waste), 1)
                    const percentage = (row.waste / maxWaste) * 100
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 w-12">{row.month}</span>
                        <div className="flex-1 mx-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-600 w-16 text-right">{row.waste > 0 ? `${row.waste} kg` : '0 kg'}</span>
                      </div>
                    )
                  })
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <i className="ri-bar-chart-line text-2xl mb-2"></i>
                    <p>No monthly data available</p>
                  </div>
                )}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <i className="ri-information-line mr-1"></i>
                  Your average is {averageMonthlyWaste} kg/month.
                </p>
              </div>
            </div>

            {/* Fine status */}
            <div className="bg-white rounded-xl shadow-lg  p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fine Status</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-error-warning-line text-red-600 mr-2"></i>
                    <span className="text-sm font-medium text-red-800">Pending Fines</span>
                  </div>
                  <span className="text-sm font-bold text-red-600">₹{pendingFine}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="ri-check-circle-line text-green-600 mr-2"></i>
                    <span className="text-sm font-medium text-green-800">Paid Fines</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">₹{paidFine}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-4">
                <h4 className="font-medium text-gray-900 mb-3">Monthly Fine Breakdown</h4>
                <div className="space-y-2">
                  {monthlyWasteData.length > 0 ? (
                    monthlyWasteData.map((month, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600">{month.month} {currentYear}</span>
                        <div className="text-right">
                          {month.finesCollected > 0 && (
                            <div className="text-green-600">Paid: ₹{month.finesCollected}</div>
                          )}
                          {month.finesPending > 0 && (
                            <div className="text-red-600">Pending: ₹{month.finesPending}</div>
                          )}
                          {month.finesCollected === 0 && month.finesPending === 0 && (
                            <div className="text-gray-500">No fines</div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-2 text-gray-500">
                      <p>No fine data available</p>
                    </div>
                  )}
                </div>
              </div>
              <button onClick={() => navigate('/Student/Waste/payment')} type="button" className="font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl px-6 py-3 text-base w-full mb-4"><i className="ri-money-dollar-circle-line mr-2"></i>Pay Outstanding Fines</button>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800"><i className="ri-time-line mr-1"></i>Next payment due: {user?.waste?.nextDue || 'Soon'}</p>
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-xl shadow-lg  p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Activity Summary</h3>
            <div className="space-y-4">
              {monthlyWasteData.length > 0 ? (
                monthlyWasteData.slice().reverse().map((month, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100">
                        <i className="ri-calendar-line text-blue-600"></i>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{month.month} {currentYear}</p>
                        <p className="text-sm text-gray-600">Monthly Summary</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="space-y-1">
                        <p className="font-medium text-gray-900">{month.waste} kg waste</p>
                        {month.finesCollected > 0 && (
                          <p className="text-sm text-green-600">₹{month.finesCollected} paid</p>
                        )}
                        {month.finesPending > 0 && (
                          <p className="text-sm text-red-600">₹{month.finesPending} pending</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <i className="ri-calendar-line text-4xl mb-2"></i>
                  <p>No activity data available</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Waste