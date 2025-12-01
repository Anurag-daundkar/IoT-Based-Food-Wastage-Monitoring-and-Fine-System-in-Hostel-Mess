import React, { useState } from 'react'
import axios from 'axios'

const Feedback = () => {
  const [form, setForm] = useState({ subject: '', category: 'suggestion', priority: 'low', description: '', anonymous: false })
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')
    try {
      const payload = { ...form }
      // backend expects status default, only send known fields
      await axios.post('/api/complaints', payload)
      setMessage('Submitted successfully!')
      setForm({ subject: '', category: 'suggestion', priority: 'low', description: '', anonymous: false })
    } catch (err) {
      setMessage(err.response?.data?.message || 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex-1 ml-64">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg  p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Submit Feedback</h3>
            <form onSubmit={onSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                <input name="subject" value={form.subject} onChange={onChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm" placeholder="Brief description of your feedback" type="text" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <div className="relative">
                    <select name="category" value={form.category} onChange={onChange} required className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm appearance-none bg-white cursor-pointer">
                      <option value="suggestion">Suggestion</option>
                      <option value="complaint">Complaint</option>
                      <option value="doubt">Question/Doubt</option>
                      <option value="technical">Technical Issue</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none">
                      <i className="ri-arrow-down-s-line text-gray-400"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
                  <div className="relative">
                    <select name="priority" value={form.priority} onChange={onChange} required className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm appearance-none bg-white cursor-pointer">
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none">
                      <i className="ri-arrow-down-s-line text-gray-400"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea name="description" value={form.description} onChange={onChange} required maxLength={500} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-vertical" placeholder="Please provide detailed information about your feedback..."></textarea>
                <div className="text-xs text-gray-500 mt-1">{form.description.length}/500 characters</div>
              </div>
              <div className="mb-6">
                <label className="flex items-center">
                  <input className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" type="checkbox" name="anonymous" checked={form.anonymous} onChange={onChange} />
                  <span className="ml-2 text-sm text-gray-700">Submit anonymously</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">Anonymous submissions help protect your privacy but may limit our ability to follow up directly.</p>
              </div>
              <button type="submit" disabled={submitting} className={`font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center text-white shadow-lg hover:shadow-xl px-8 py-4 text-lg w-full ${submitting ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}>
                <i className="ri-send-plane-line mr-2"></i>{submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
              {message && <div className={`mt-3 text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>}
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg  p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button type="button" className="font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-3 text-base w-full justify-start"><i className="ri-question-line mr-3"></i>View FAQ</button>
              <button type="button" className="font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-3 text-base w-full justify-start"><i className="ri-chat-3-line mr-3"></i>Live Chat Support</button>
              <button type="button" className="font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-3 text-base w-full justify-start"><i className="ri-phone-line mr-3"></i>Contact Admin</button>
              <button type="button" className="font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-3 text-base w-full justify-start"><i className="ri-book-line mr-3"></i>User Guide</button>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Response Time</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex justify-between"><span>Urgent Issues:</span><span className="font-medium">2-4 hours</span></div>
                <div className="flex justify-between"><span>High Priority:</span><span className="font-medium">24 hours</span></div>
                <div className="flex justify-between"><span>General Feedback:</span><span className="font-medium">2-3 days</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Feedback
