import React from 'react'
import { useNavigate } from 'react-router-dom'

const Payment = () => {
  const navigate = useNavigate()
  const close = () => navigate('/Student/Waste')

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={close}></div>

      {/* Image */}
      <div
        className="relative w-[95%] max-w-md rounded-xl overflow-hidden shadow-xl"
        style={{
          backgroundImage: "url('/src/assets/Payment.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '800px' // Adjust height as needed
        }}
      ></div>
    </div>
  )
}

export default Payment
