import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaChartLine, FaChartBar, FaChartPie, FaTrophy, FaWeight, FaRupeeSign } from 'react-icons/fa';

const AnalyticsDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Understanding Analytics Dashboard</h1>
          <p className="text-xl text-gray-600 mt-2">Make data-driven decisions with insights</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
              <FaChartLine className="text-purple-600 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            The Smart Sentinel Analytics Dashboard provides real-time insights into waste management performance across your hostel.
            This guide helps you understand each metric and how to leverage data for improved sustainability outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <FaWeight className="text-green-600 text-3xl mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">Waste Metrics</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Total Waste Generated</h4>
                <p className="text-gray-700 text-sm">Track cumulative waste across all hostel areas. Monitor trends to identify high-generation zones and time periods.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Daily Average</h4>
                <p className="text-gray-700 text-sm">Understand daily patterns to optimize collection schedules and resource allocation.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Per Student Contribution</h4>
                <p className="text-gray-700 text-sm">Identify individual waste generation patterns to provide targeted interventions.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center mb-4">
              <FaRupeeSign className="text-red-600 text-3xl mr-4" />
              <h3 className="text-2xl font-bold text-gray-900">Fine Analytics</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Total Fines Collected</h4>
                <p className="text-gray-700 text-sm">Revenue generated from the fine system, reinvested into sustainability initiatives.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Pending Fines</h4>
                <p className="text-gray-700 text-sm">Outstanding amounts that require follow-up and collection efforts.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Fine Distribution</h4>
                <p className="text-gray-700 text-sm">Breakdown by student, room, or floor to identify problem areas.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Performance Indicators (KPIs)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-xl">
              <FaChartBar className="text-green-700 text-4xl mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Waste Reduction Rate</h3>
              <p className="text-gray-800 text-sm">Percentage decrease in waste generation compared to previous period. Target: 10% monthly improvement.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl">
              <FaTrophy className="text-blue-700 text-4xl mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Student Participation</h3>
              <p className="text-gray-800 text-sm">Active engagement rate in sustainability programs and leaderboard activities. Target: 80% participation.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl">
              <FaChartPie className="text-purple-700 text-4xl mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Compliance Score</h3>
              <p className="text-gray-800 text-sm">Overall adherence to waste management guidelines and threshold limits. Target: 95% compliance.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reading the Visualizations</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Line Charts - Trend Analysis</h3>
              <p className="text-gray-700 mb-2">Track changes over time to identify patterns, seasonal variations, and the impact of interventions.</p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-purple-900 text-sm"><strong>Use Case:</strong> Monitor monthly waste generation trends to assess if awareness campaigns are reducing waste levels.</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Bar Charts - Comparative Analysis</h3>
              <p className="text-gray-700 mb-2">Compare metrics across different categories such as floors, blocks, or time periods.</p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-purple-900 text-sm"><strong>Use Case:</strong> Identify which hostel floors generate the most waste to target specific areas for improvement.</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Pie Charts - Proportion Breakdown</h3>
              <p className="text-gray-700 mb-2">Visualize the composition of waste types, fine distribution, or student segment contributions.</p>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-purple-900 text-sm"><strong>Use Case:</strong> Understand what percentage of total waste comes from common areas vs. individual rooms.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Actionable Insights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-green-500 bg-green-50 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-3">✅ Positive Trend</h3>
              <p className="text-gray-700 mb-2"><strong>What it means:</strong> Waste generation is decreasing, compliance is improving.</p>
              <p className="text-gray-700"><strong>Action:</strong> Celebrate success! Share results with students, recognize top performers, continue current strategies.</p>
            </div>
            <div className="border-l-4 border-red-500 bg-red-50 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-3">⚠️ Concerning Trend</h3>
              <p className="text-gray-700 mb-2"><strong>What it means:</strong> Waste is increasing, fines are rising, participation is dropping.</p>
              <p className="text-gray-700"><strong>Action:</strong> Launch awareness campaigns, conduct floor meetings, review fine system fairness, increase monitoring.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reporting Features</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-gray-900">Export Data</h3>
                <p className="text-gray-700 text-sm">Download reports in CSV or PDF format for offline analysis and presentations to administration.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-gray-900">Custom Date Ranges</h3>
                <p className="text-gray-700 text-sm">Filter data by specific periods to analyze events, semesters, or academic years.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-gray-900">Automated Alerts</h3>
                <p className="text-gray-700 text-sm">Set up notifications for threshold breaches, unusual patterns, or milestone achievements.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4 flex-shrink-0">4</div>
              <div>
                <h3 className="font-semibold text-gray-900">Scheduled Reports</h3>
                <p className="text-gray-700 text-sm">Receive weekly or monthly summary reports via email to stay informed effortlessly.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">📊 Pro Tips for Data Analysis</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="mr-3 text-2xl">💡</span>
              <span>Compare data across multiple time periods to identify long-term trends vs. short-term fluctuations</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-2xl">💡</span>
              <span>Cross-reference waste data with academic calendar (exams, holidays) to understand behavioral patterns</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-2xl">💡</span>
              <span>Use leaderboard data to identify sustainability champions and feature them in campaigns</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-2xl">💡</span>
              <span>Share dashboard highlights in monthly newsletters to maintain transparency and engagement</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
