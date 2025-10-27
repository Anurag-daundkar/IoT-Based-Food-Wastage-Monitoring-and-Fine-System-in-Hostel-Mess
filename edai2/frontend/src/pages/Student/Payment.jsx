import React from 'react'
import { useNavigate } from 'react-router-dom'

const Payment = () => {
  const navigate = useNavigate()
  const close = () => navigate('/Student/Waste')

  const onPay = (e) => {
    e.preventDefault()
    close()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={close}></div>
      <form onSubmit={onPay} className="relative bg-white rounded-xl shadow-xl border border-gray-200 w-[95%] max-w-md p-6">
        <div className="flex items-start justify-between mb-4">
          <h4 className="text-xl font-bold text-gray-900">Pay Outstanding Fines</h4>
          <button type="button" onClick={close} className="text-gray-500 hover:text-gray-700"><i className="ri-close-line text-2xl"></i></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input value="$15.00" readOnly className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
            <input required placeholder="1234 5678 9012 3456" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expiry</label>
              <input required placeholder="MM/YY" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CVC</label>
              <input required placeholder="123" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
            <input required placeholder="Sarah Johnson" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
        </div>
        <div className="flex items-center justify-end space-x-3 mt-6">
          <button type="button" onClick={close} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Pay $15.00</button>
        </div>
      </form>
    </div>
  )
}

export default Payment
