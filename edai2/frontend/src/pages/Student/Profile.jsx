import React, { useMemo, useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

const Profile = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    studentId: '',
    college: '',
    room: '',
    phone: '',
    emergency: '',
    status: 'Active Student',
    photo: ''
  })

  useEffect(() => {
    if (!user) return
    setProfile({
      name: user.name || '',
      email: user.email || '',
      studentId: user.studentId || '',
      college: user.college || '',
      room: user.roomNumber || user.room || '',
      phone: user.phone || '',
      emergency: user.emergency || '',
      status: user.status || 'Active Student',
      photo: user.photo || ''
    })
  }, [user])

  const [showEdit, setShowEdit] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [show2FA, setShow2FA] = useState(false)
  const [showActivity, setShowActivity] = useState(false)

  const [editDraft, setEditDraft] = useState(profile)

  const loginActivity = useMemo(() => ([
    { time: '2025-09-12 09:22', location: 'Chrome · Windows · New Delhi' },
    { time: '2025-09-10 20:04', location: 'Safari · iOS · Mumbai' },
    { time: '2025-09-07 14:47', location: 'Edge · Windows · Pune' },
  ]), [])

  const onSaveProfile = () => {
    setProfile(editDraft)
    setShowEdit(false)
  }

  const onChangePwd = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const current = data.get('current')
    const next = data.get('next')
    const confirm = data.get('confirm')
    if (!current || !next || !confirm) return
    if (next !== confirm) return
    setShowPwd(false)
  }

  return (
    <div className="flex-1 ml-64">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Manage your profile, track waste data, and stay connected with campus sustainability.</p>
        </div>

        

        <div className="tab-content">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg  p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <img src={profile.photo || './src/assets/Anurag.JPG'} alt={profile.name || 'Student'} className='w-20 h-20 rounded-full object-cover object-top'/>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                    <p className="text-gray-600">{profile.email}</p>
                    <p className="text-sm text-green-600 font-medium">{profile.status}</p>
                  </div>
                </div>
                <button onClick={() => { setEditDraft(profile); setShowEdit(true) }} type="button" className="font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-3 text-base "><i className="ri-edit-line mr-2"></i>Edit Profile</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <p className="text-gray-900 py-3">{profile.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <p className="text-gray-900 py-3">{profile.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                  <p className="text-gray-900 py-3 bg-gray-50 px-4 rounded-lg">{profile.studentId}</p>
                  <p className="text-xs text-gray-500 mt-1">Student ID cannot be changed</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
                  <p className="text-gray-900 py-3">{profile.college}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
                  <p className="text-gray-900 py-3">{profile.room}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <p className="text-gray-900 py-3">{profile.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                  <p className="text-gray-900 py-3">{profile.emergency}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg  p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Password</p>
                    <p className="text-sm text-gray-600">Last updated 2 months ago</p>
                  </div>
                  <button onClick={() => setShowPwd(true)} type="button" className="font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-4 py-2 text-sm ">Change Password</button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <button onClick={() => setShow2FA(true)} type="button" className="font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-4 py-2 text-sm ">Enable 2FA</button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">Login Activity</p>
                    <p className="text-sm text-gray-600">Review recent login attempts</p>
                  </div>
                  <button onClick={() => setShowActivity(true)} type="button" className="font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-4 py-2 text-sm ">View Activity</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowEdit(false)}></div>
          <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 w-[95%] max-w-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-xl font-bold text-gray-900">Edit Profile</h4>
              <button onClick={() => setShowEdit(false)} className="text-gray-500 hover:text-gray-700"><i className="ri-close-line text-2xl"></i></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" value={editDraft.name} onChange={(e) => setEditDraft({ ...editDraft, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" value={editDraft.email} onChange={(e) => setEditDraft({ ...editDraft, email: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">College</label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" value={editDraft.college} onChange={(e) => setEditDraft({ ...editDraft, college: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" value={editDraft.room} onChange={(e) => setEditDraft({ ...editDraft, room: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" value={editDraft.phone} onChange={(e) => setEditDraft({ ...editDraft, phone: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" value={editDraft.emergency} onChange={(e) => setEditDraft({ ...editDraft, emergency: e.target.value })} />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button onClick={() => setShowEdit(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={onSaveProfile} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPwd && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowPwd(false)}></div>
          <form onSubmit={onChangePwd} className="relative bg-white rounded-xl shadow-xl border border-gray-200 w-[95%] max-w-md p-6">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-xl font-bold text-gray-900">Change Password</h4>
              <button type="button" onClick={() => setShowPwd(false)} className="text-gray-500 hover:text-gray-700"><i className="ri-close-line text-2xl"></i></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input name="current" type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input name="next" type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input name="confirm" type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button type="button" onClick={() => setShowPwd(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Update Password</button>
            </div>
          </form>
        </div>
      )}

      {/* Enable 2FA Modal */}
      {show2FA && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShow2FA(false)}></div>
          <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 w-[95%] max-w-md p-6">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-xl font-bold text-gray-900">Enable Two-Factor Authentication</h4>
              <button onClick={() => setShow2FA(false)} className="text-gray-500 hover:text-gray-700"><i className="ri-close-line text-2xl"></i></button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Scan this QR with an authenticator app (Google Authenticator, Authy), then enter the 6-digit code to complete setup.</p>
            <div className="w-40 h-40 bg-gray-200 rounded-lg mx-auto mb-4"></div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">6-digit code</label>
              <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="123 456" />
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button onClick={() => setShow2FA(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
              <button onClick={() => setShow2FA(false)} className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">Enable</button>
            </div>
          </div>
        </div>
      )}

      {/* Login Activity Modal */}
      {showActivity && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowActivity(false)}></div>
          <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 w-[95%] max-w-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <h4 className="text-xl font-bold text-gray-900">Recent Login Activity</h4>
              <button onClick={() => setShowActivity(false)} className="text-gray-500 hover:text-gray-700"><i className="ri-close-line text-2xl"></i></button>
            </div>
            <div className="space-y-3">
              {loginActivity.map((a, idx) => (
                <div key={idx} className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                  <div>
                    <div className="font-medium text-gray-900">{a.time}</div>
                    <div className="text-sm text-gray-600">{a.location}</div>
                  </div>
                  <i className="ri-shield-check-line text-green-600 text-xl"></i>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end mt-6">
              <button onClick={() => setShowActivity(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
