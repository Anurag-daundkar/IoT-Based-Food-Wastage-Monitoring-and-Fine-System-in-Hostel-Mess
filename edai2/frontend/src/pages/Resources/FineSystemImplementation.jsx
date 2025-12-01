import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaShieldAlt, FaBalanceScale, FaRupeeSign, FaChartLine, FaCheckCircle } from 'react-icons/fa';

const FineSystemImplementation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center text-red-600 hover:text-red-700 mb-4">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Fine System Implementation</h1>
          <p className="text-xl text-gray-600 mt-2">Fair and effective penalty management</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
              <FaShieldAlt className="text-red-600 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Purpose of the Fine System</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            The weight-based fine system serves as an accountability mechanism to encourage responsible waste management. 
            The goal is not to penalize students, but to incentivize sustainable behavior and fund campus environmental initiatives.
          </p>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-800 font-medium">
              <strong>Core Principle:</strong> All fine revenue is reinvested into sustainability programs, infrastructure improvements, 
              and student rewards, creating a positive feedback loop for the hostel community.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <FaBalanceScale className="inline mr-3 text-red-600" />
            Fine Structure
          </h2>
          <div className="bg-gradient-to-r from-red-100 to-pink-100 p-8 rounded-lg mb-6">
            <div className="text-center">
              <p className="text-6xl font-bold text-red-600 mb-4">₹10.00</p>
              <p className="text-2xl text-gray-900 font-semibold mb-2">per gram</p>
              <p className="text-gray-700">for waste exceeding threshold (2+ grams excess)</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-3">How It Works:</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Each hostel area has a predefined waste weight threshold</li>
                <li>• IoT sensors automatically track waste weight in real-time</li>
                <li>• When waste exceeds threshold by 2+ grams, fine is triggered</li>
                <li>• Fine amount = (Excess weight in grams) × ₹10.00</li>
                <li>• Students receive instant notification of fine incurred</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-3">Example Calculation:</h3>
              <div className="space-y-2 text-gray-700 text-sm">
                <p><strong>Threshold for Room A-101:</strong> 500 grams</p>
                <p><strong>Actual waste generated:</strong> 525 grams</p>
                <p><strong>Excess waste:</strong> 525 - 500 = 25 grams</p>
                <p className="bg-red-100 p-3 rounded mt-3 font-semibold text-red-900">
                  Fine = 25 grams × ₹10.00 = ₹250.00
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Implementation Steps</h2>
        <div className="space-y-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">1</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Define Thresholds</h3>
                <p className="text-gray-700 mb-4">
                  Set appropriate waste weight limits based on area type, occupancy, and historical data.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-3">Threshold Guidelines:</p>
                  <table className="w-full text-sm">
                    <thead className="bg-red-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-gray-900">Area Type</th>
                        <th className="px-4 py-2 text-left text-gray-900">Suggested Threshold</th>
                        <th className="px-4 py-2 text-left text-gray-900">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-b">
                        <td className="px-4 py-2">Single Room</td>
                        <td className="px-4 py-2">300-500g/day</td>
                        <td className="px-4 py-2">Adjust for occupancy</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2">Double Room</td>
                        <td className="px-4 py-2">600-800g/day</td>
                        <td className="px-4 py-2">Per room, not per student</td>
                      </tr>
                      <tr className="border-b">
                        <td className="px-4 py-2">Common Area (per floor)</td>
                        <td className="px-4 py-2">2-3kg/day</td>
                        <td className="px-4 py-2">Based on floor population</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Cafeteria/Kitchen</td>
                        <td className="px-4 py-2">5-10kg/day</td>
                        <td className="px-4 py-2">Organic waste separate</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">2</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Configure Automated System</h3>
                <p className="text-gray-700 mb-4">
                  Set up the IoT sensors and Smart Sentinel dashboard to automatically calculate and track fines.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg space-y-3">
                  <div className="flex items-start">
                    <FaCheckCircle className="text-red-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Link sensors to student accounts:</strong>
                      <p className="text-gray-700 text-sm">Ensure each waste bin is mapped to the correct room or area in the system</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-red-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Set notification triggers:</strong>
                      <p className="text-gray-700 text-sm">Configure real-time alerts when waste approaches or exceeds threshold</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="text-red-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-gray-900">Enable automatic calculation:</strong>
                      <p className="text-gray-700 text-sm">System automatically computes fine amount based on excess weight</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">3</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Student Notification Process</h3>
                <p className="text-gray-700 mb-4">
                  Ensure transparency by immediately informing students when a fine is incurred.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-3">Notification Channels:</p>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded border-l-4 border-red-500">
                      <p className="font-semibold text-gray-900">Email Alert</p>
                      <p className="text-gray-700 text-sm">Detailed breakdown of waste weight, threshold, excess amount, and fine calculation</p>
                    </div>
                    <div className="bg-white p-4 rounded border-l-4 border-red-500">
                      <p className="font-semibold text-gray-900">Dashboard Notification</p>
                      <p className="text-gray-700 text-sm">Real-time update in student portal showing pending fine and payment options</p>
                    </div>
                    <div className="bg-white p-4 rounded border-l-4 border-red-500">
                      <p className="font-semibold text-gray-900">SMS (Optional)</p>
                      <p className="text-gray-700 text-sm">Quick text message with fine amount and payment deadline</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">4</div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Payment Collection</h3>
                <p className="text-gray-700 mb-4">
                  Provide convenient and secure payment options for students to clear fines.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Online Payment</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Integrated payment gateway in student portal</li>
                      <li>• Support UPI, cards, net banking</li>
                      <li>• Instant payment confirmation</li>
                      <li>• Automatic receipt generation</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Offline Payment</h4>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Pay at admin office during hours</li>
                      <li>• Cash or card accepted</li>
                      <li>• Manual receipt provided</li>
                      <li>• Updated in system within 24 hours</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <p className="text-yellow-800 text-sm">
                    <strong>Payment Deadline:</strong> Fines must be cleared within 7 days of incurrence. Late payment may result in additional charges or restrictions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Fairness & Appeals Process</h2>
          <p className="text-gray-700 mb-4">
            To ensure fairness, students can dispute fines they believe were incorrectly assessed.
          </p>
          <div className="space-y-4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Grounds for Appeal:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Sensor malfunction or incorrect reading</li>
                <li>• Waste attributed to wrong student/room</li>
                <li>• Extraordinary circumstances (e.g., guest visitors, events)</li>
                <li>• System error in calculation</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Appeal Process:</h3>
              <ol className="space-y-2 text-gray-700">
                <li><strong>1.</strong> Student submits appeal through dashboard or admin office within 48 hours</li>
                <li><strong>2.</strong> Admin reviews sensor data, timestamps, and evidence</li>
                <li><strong>3.</strong> Decision communicated within 3 business days</li>
                <li><strong>4.</strong> If appeal approved, fine is waived and record updated</li>
                <li><strong>5.</strong> If denied, student can request in-person meeting with admin</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <FaChartLine className="inline mr-3 text-red-600" />
            Fine Revenue Utilization
          </h2>
          <p className="text-gray-700 mb-6">
            Transparency in how fine revenue is used builds trust and demonstrates commitment to the community's wellbeing.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-6 rounded-lg text-center">
              <p className="text-4xl font-bold text-green-600 mb-2">40%</p>
              <p className="font-semibold text-gray-900 mb-2">Infrastructure</p>
              <p className="text-gray-600 text-sm">Better bins, composting units, recycling facilities</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">30%</p>
              <p className="font-semibold text-gray-900 mb-2">Student Rewards</p>
              <p className="text-gray-600 text-sm">Prizes, incentives, sustainability kits</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg text-center">
              <p className="text-4xl font-bold text-purple-600 mb-2">30%</p>
              <p className="font-semibold text-gray-900 mb-2">Awareness</p>
              <p className="text-gray-600 text-sm">Campaigns, workshops, educational materials</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">✅ Best Practices</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-3 text-2xl">📋</span>
              <span><strong>Communicate clearly:</strong> Explain the fine system during student orientation and provide written guidelines</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-2xl">🔍</span>
              <span><strong>Maintain transparency:</strong> Publish monthly reports on fines collected and how revenue was utilized</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-2xl">⚖️</span>
              <span><strong>Be fair and consistent:</strong> Apply fine system uniformly without exceptions or favoritism</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-2xl">🔄</span>
              <span><strong>Review regularly:</strong> Adjust thresholds and fine rates based on data, feedback, and effectiveness</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-2xl">💬</span>
              <span><strong>Encourage feedback:</strong> Create channels for students to provide input on the fine system</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FineSystemImplementation;
