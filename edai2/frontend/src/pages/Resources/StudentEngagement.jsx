import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaUsers, FaTrophy, FaBullhorn, FaGift, FaStar, FaCalendar } from 'react-icons/fa';

const StudentEngagement = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Student Engagement Strategies</h1>
          <p className="text-xl text-gray-600 mt-2">Build sustainable habits in your community</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
              <FaUsers className="text-orange-600 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Engage, Motivate, Transform</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            Successful waste management requires active student participation. This guide provides proven strategies to 
            motivate students, foster sustainable behaviors, and create a culture of environmental responsibility in your hostel.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl">
            <FaTrophy className="text-green-700 text-4xl mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Gamification</h3>
            <p className="text-gray-800">Turn waste management into a fun competition with points, levels, and rewards.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl">
            <FaBullhorn className="text-blue-700 text-4xl mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Awareness</h3>
            <p className="text-gray-800">Educate students about environmental impact through campaigns and workshops.</p>
          </div>
          <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl">
            <FaStar className="text-purple-700 text-4xl mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Recognition</h3>
            <p className="text-gray-800">Celebrate achievements and acknowledge sustainability champions publicly.</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Leaderboard System</h2>
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <p className="text-gray-700 mb-6">
            The leaderboard creates healthy competition and motivates students to reduce waste generation. Here's how to maximize its impact:
          </p>
          <div className="space-y-4">
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="font-bold text-gray-900 mb-2">🏆 Individual Rankings</h3>
              <p className="text-gray-700 mb-2">Recognize top performers who consistently stay below waste thresholds.</p>
              <p className="text-gray-600 text-sm"><strong>Strategy:</strong> Display top 10 students on digital boards in common areas. Update weekly to maintain excitement.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="font-bold text-gray-900 mb-2">🏅 Floor/Block Competitions</h3>
              <p className="text-gray-700 mb-2">Foster teamwork by comparing waste generation across different hostel sections.</p>
              <p className="text-gray-600 text-sm"><strong>Strategy:</strong> Award "Green Floor of the Month" with special privileges or treats for all residents.</p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="font-bold text-gray-900 mb-2">⭐ Improvement Awards</h3>
              <p className="text-gray-700 mb-2">Recognize students who show the most improvement, even if they're not at the top.</p>
              <p className="text-gray-600 text-sm"><strong>Strategy:</strong> Award "Most Improved Student" monthly to encourage everyone, not just top performers.</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Reward Programs</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <FaGift className="text-green-600 text-3xl mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">Tangible Rewards</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2 font-bold">•</span>
                <span><strong>Discount Coupons:</strong> Partner with campus cafeteria or bookstore for eco-champions</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 font-bold">•</span>
                <span><strong>Sustainability Kits:</strong> Reusable water bottles, bamboo toothbrushes, cloth bags</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 font-bold">•</span>
                <span><strong>Fine Waivers:</strong> Top performers get one-time fine forgiveness vouchers</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 font-bold">•</span>
                <span><strong>Gift Cards:</strong> Eco-friendly product stores or online platforms</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <FaStar className="text-purple-600 text-3xl mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">Intangible Recognition</h3>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2 font-bold">•</span>
                <span><strong>Social Media Features:</strong> Highlight sustainability champions on official pages</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2 font-bold">•</span>
                <span><strong>Certificate of Excellence:</strong> Formal recognition for portfolios/resumes</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2 font-bold">•</span>
                <span><strong>Leadership Opportunities:</strong> Invite top performers to join sustainability committee</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2 font-bold">•</span>
                <span><strong>Priority Access:</strong> Early registration for popular events or facilities</span>
              </li>
            </ul>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Campaign Ideas</h2>
        <div className="space-y-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">1</div>
              <h3 className="text-2xl font-semibold text-gray-900">Zero Waste Week Challenge</h3>
            </div>
            <p className="text-gray-700 mb-4">
              A week-long intensive campaign where students compete to generate the least amount of waste.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">How to Run:</p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Announce theme and start date 2 weeks in advance</li>
                <li>• Provide daily tips and reminders via email/WhatsApp groups</li>
                <li>• Track waste generation in real-time on dashboard</li>
                <li>• Award prizes to top 3 individuals and best floor</li>
                <li>• Share success stories and statistics post-campaign</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">2</div>
              <h3 className="text-2xl font-semibold text-gray-900">Sustainability Workshops</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Interactive sessions to educate students about environmental impact and practical waste reduction techniques.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">Workshop Topics:</p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• DIY composting and organic waste management</li>
                <li>• Upcycling projects: Turn waste into useful items</li>
                <li>• Plastic-free living tips and alternatives</li>
                <li>• Understanding carbon footprint and climate change</li>
                <li>• Guest speakers from environmental organizations</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">3</div>
              <h3 className="text-2xl font-semibold text-gray-900">Peer Ambassador Program</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Empower student leaders to promote sustainability and assist peers with waste management practices.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">Ambassador Roles:</p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Organize floor-level awareness sessions</li>
                <li>• Monitor and guide waste segregation in common areas</li>
                <li>• Share weekly sustainability tips on social media</li>
                <li>• Assist new students with registration and orientation</li>
                <li>• Collect feedback and suggestions for improvement</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <FaCalendar className="inline mr-3 text-orange-600" />
            Monthly Engagement Calendar
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-1">Week 1: Kickoff</h4>
                <p className="text-gray-700 text-sm">Launch new campaign, announce monthly goals, update leaderboards</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-1">Week 2: Education</h4>
                <p className="text-gray-700 text-sm">Host workshop or webinar on sustainability topic</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-1">Week 3: Competition</h4>
                <p className="text-gray-700 text-sm">Mid-month challenge or flash contest with instant rewards</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-1">Week 4: Recognition</h4>
                <p className="text-gray-700 text-sm">Announce winners, distribute rewards, celebrate achievements</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Communication Channels</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Digital Platforms:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• WhatsApp groups for quick updates</li>
                <li>• Email newsletters with monthly insights</li>
                <li>• Instagram stories for daily tips</li>
                <li>• Dashboard announcements and notifications</li>
                <li>• Student portal banner messages</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Physical Spaces:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Notice boards with infographics</li>
                <li>• Posters near waste disposal areas</li>
                <li>• Digital displays in common rooms</li>
                <li>• Floor meetings and open forums</li>
                <li>• Feedback boxes for suggestions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-yellow-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">🎯 Key Success Metrics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-3xl font-bold mb-2">80%+</p>
              <p className="text-sm">Target Participation Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-2">50%+</p>
              <p className="text-sm">Students Engaged Monthly</p>
            </div>
            <div>
              <p className="text-3xl font-bold mb-2">25%</p>
              <p className="text-sm">Waste Reduction Goal</p>
            </div>
          </div>
          <p className="mt-6 text-sm">
            Remember: Consistency is key. Maintain regular engagement activities, celebrate small wins, and continuously 
            gather feedback to improve your strategies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentEngagement;
