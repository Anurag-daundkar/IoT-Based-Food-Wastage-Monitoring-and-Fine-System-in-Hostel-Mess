import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone ,FaEnvelope ,FaShieldAlt, FaPlayCircle, FaRecycle, FaUsers, FaChartLine, FaLeaf, FaClock, FaBell, FaHotel, FaBuilding, FaHome, FaBalanceScale, FaPlus, FaTimes, FaUser, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaUserGraduate, FaUserShield } from "react-icons/fa";
const LandingPage = () => {
    const navigate = useNavigate();

  return (
    <div class="min-h-screen">
    {/* <div><Testing/></div> */}
    
        


        {/* Removed inline student/admin modal sign-in dialogs in favor of dedicated pages */}


        {/* Header */}
        <header class="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
                <nav class="px-6 py-4">
                    <div class="flex items-center justify-between max-w-7xl mx-auto">
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center ">
                                <FaRecycle className="text-white w-5 h-5 m-1" />
                                <i class="ri-recycle-line text-white text-lg"></i>
                            </div>
                            <span class="text-xl font-bold text-gray-800">Smart Sentinel</span>
                        </div>
                        <div class="hidden md:flex items-center space-x-8">
                            <button class="text-gray-700 hover:text-green-600 cursor-pointer whitespace-nowrap" onClick={() => document.getElementById("home").scrollIntoView({ behavior: "smooth" })}>Home</button>
                            <button class="text-gray-700 hover:text-green-600 cursor-pointer whitespace-nowrap" onClick={() => document.getElementById("features").scrollIntoView({ behavior: "smooth" })}>Features</button>
                            <button class="text-gray-700 hover:text-green-600 cursor-pointer whitespace-nowrap" onClick={() => document.getElementById("resources").scrollIntoView({ behavior: "smooth" })}>Resources</button>
                            <button class="text-gray-700 hover:text-green-600 cursor-pointer whitespace-nowrap" onClick={() => document.getElementById("pricing").scrollIntoView({ behavior: "smooth" })}>Pricing</button>
                            <button class="text-gray-700 hover:text-green-600 cursor-pointer whitespace-nowrap" onClick={() => document.getElementById("programs").scrollIntoView({ behavior: "smooth" })}>Programs</button>
                            <button class="text-gray-700 hover:text-green-600 cursor-pointer whitespace-nowrap" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>Contact Us</button>
                            <button class="text-gray-700 hover:text-green-600 cursor-pointer whitespace-nowrap" onClick={() => document.getElementById("help").scrollIntoView({ behavior: "smooth" })}>Help</button>
                        </div>

                        <div class="flex gap-2 items-center">
                            {/* Student Login Button */}
                            <button
                                type="button"
                                class="group flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-green-600 text-green-600 bg-white hover:bg-green-600 hover:text-white transition-all duration-200 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                onClick={() => navigate('/StudentLogin')}
                                title="Student Login"
                            >
                                <FaUserGraduate className="w-5 h-5 group-hover:text-white text-green-600 transition-colors duration-200" />
                                <span className="hidden sm:inline">Student Login</span>
                            </button>

                            {/* Admin Login Button */}
                            <button
                                type="button"
                                class="group flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-emerald-600 text-emerald-600 bg-white hover:bg-emerald-600 hover:text-white transition-all duration-200 font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                onClick={() => navigate('/AdminLogin')}
                                title="Admin Login"
                            >
                                <FaUserShield className="w-5 h-5 group-hover:text-white text-emerald-600 transition-colors duration-200" />
                                <span className="hidden sm:inline">Admin Login</span>
                            </button>
                        </div>
                        
                        <button class="md:hidden w-6 h-6 flex items-center justify-center cursor-pointer">
                            <i class="ri-menu-line text-xl">
                            </i>
                        </button>
                    </div>
                </nav>
            </header>
            

            <div>
                {/* Home */}
                <section id="home" class="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center " style={{ backgroundImage: "url('/src/assets/Landing_Page.jpg')" }}>
                    <div class="max-w-7xl mx-auto px-6 w-full">
                        <div class="text-left text-white max-w-2xl">
                            <h1 class="text-5xl md:text-6xl font-bold mb-6 leading-tight">Smart Waste Monitoring for a<span class="text-green-400"> Cleaner Tomorrow</span></h1>
                            <p class="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">Revolutionizing waste management in educational institutions with real-time monitoring, student insights, and eco-friendly initiatives that promote sustainable living.</p>
                            <div class="flex flex-col sm:flex-row gap-4">
                                <button type="button" class="font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl px-8 py-4 text-lg" onClick={()=>{
                                    document.getElementById("features").scrollIntoView({behavior:"smooth"})
                                }}>
                                    <i class="ri-play-circle-line mr-2"></i>
                                    Explore Features
                                </button>
                                <button type="button" class="font-medium rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center border-2 border-white text-white hover:bg-white/75 hover:text-black px-8 py-4 text-lg"><i class="ri-user-add-line mr-2"></i>Join Now</button></div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section id="features" class="py-20 bg-gray-50">
                  <div class="max-w-7xl mx-auto px-6">
                      <div class="text-center mb-16">
                            <h2 class="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
                            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Discover how Smart Sentinel transforms waste management with cutting-edge technology and intelligent monitoring systems designed for modern educational institutions.</p>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                                <div class="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                                    <FaClock className="text-white w-5 h-5 m-1" />
                                </div>
                                <h3 class="text-xl font-semibold text-gray-900 mb-4">Real-Time Waste Tracking</h3>
                                <p class="text-gray-600 leading-relaxed">Monitor waste levels across campus with IoT sensors providing instant updates and automated alerts when bins need attention.</p>
                            </div>
                            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                                <div class="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mb-6">
                                    <FaUsers className="text-white w-5 h-5 m-1" />
                                </div>
                                <h3 class="text-xl font-semibold text-gray-900 mb-4">Student Insights</h3>
                                <p class="text-gray-600 leading-relaxed">Track individual waste patterns, provide personalized feedback, and encourage sustainable behavior through gamification.</p>
                            </div>
                            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                                <div class="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center mb-6">
                                    <FaChartLine className="text-white w-5 h-5 m-1" />
                                </div>
                                <h3 class="text-xl font-semibold text-gray-900 mb-4">Visual Analytics</h3>
                                <p class="text-gray-600 leading-relaxed">Comprehensive dashboards with charts, graphs, and reports to analyze waste trends and optimize collection routes.</p>
                            </div>
                            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                                <div class="w-16 h-16 bg-emerald-500 rounded-lg flex items-center justify-center mb-6">
                                    <FaLeaf className="text-white w-5 h-5 m-1" />
                                </div>
                                <h3 class="text-xl font-semibold text-gray-900 mb-4">Eco-Friendly Initiatives</h3>
                                <p class="text-gray-600 leading-relaxed">Promote recycling campaigns, track carbon footprint reduction, and reward environmentally conscious behavior.</p>
                            </div>
                            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                                <div class="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center mb-6">
                                    <FaBell className="text-white w-5 h-5 m-1" />
                                </div>
                                <h3 class="text-xl font-semibold text-gray-900 mb-4">Smart Notifications</h3>
                                <p class="text-gray-600 leading-relaxed">Automated alerts for maintenance teams, overflowing bins, and collection schedule optimization.</p>
                            </div>
                            <div class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                                <div class="w-16 h-16 bg-pink-500 rounded-lg flex items-center justify-center mb-6">
                                    <FaUsers className="text-white w-5 h-5 m-1" />
                                </div>
                                <h3 class="text-xl font-semibold text-gray-900 mb-4">Community Engagement</h3>
                                <p class="text-gray-600 leading-relaxed">Foster campus-wide participation through leaderboards, challenges, and collaborative sustainability goals.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Resources */}
                <section id="resources" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Resources &amp; Guides</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Everything you need to know about effective waste management</p>
        </div>
        <div class="grid md:grid-cols-2 gap-12">
            <div>
                <h3 class="text-2xl font-semibold text-gray-900 mb-6">Quick Start Guides</h3>
                <div class="space-y-4">
                    <div class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                            <FaPlayCircle className="text-green-600 w-7 h-7"/>
                            </div>
                        <div>
                            <h4 class="font-semibold text-gray-900">Getting Started with Smart Sentinel</h4>
                            <p class="text-gray-600 text-sm">5-minute setup guide for administrators</p>
                        </div>
                    </div>
                    <div class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                            <FaUser className="text-blue-600 w-7 h-7"/>
                             
                            <i class="ri-user-settings-line text-blue-600 text-xl"></i>
                            </div>
                        <div>
                            <h4 class="font-semibold text-gray-900">Student Registration Process</h4>
                            <p class="text-gray-600 text-sm">Step-by-step student onboarding</p>
                        </div>
                    </div>
                    <div class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                            <div><FaChartLine className="text-purple-600 w-7 h-7"/></div>
                            </div>
                        <div>
                            <h4 class="font-semibold text-gray-900">Understanding Analytics Dashboard</h4>
                            <p class="text-gray-600 text-sm">Make data-driven decisions</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3 class="text-2xl font-semibold text-gray-900 mb-6">Best Practices</h3>
                <div class="space-y-4">
                    <div class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                            <FaRecycle className="text-green-600 w-7 h-7"/></div>
                        <div>
                            <h4 class="font-semibold text-gray-900">Waste Segregation Guidelines</h4>
                            <p class="text-gray-600 text-sm">Proper sorting techniques for maximum efficiency</p>
                        </div>
                    </div>
                    <div class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                            <FaUsers className="text-orange-600 w-7 h-7"/>




                            </div>
                        <div>
                            <h4 class="font-semibold text-gray-900">Student Engagement Strategies</h4>
                            <p class="text-gray-600 text-sm">Build sustainable habits in your community</p>
                        </div>
                    </div>
                    <div class="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                            <FaShieldAlt className="text-red-600 w-7 h-7"/>
                            
                            </div>
                        <div>
                            <h4 class="font-semibold text-gray-900">Fine System Implementation</h4>
                            <p class="text-gray-600 text-sm">Fair and effective penalty management</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


                {/* Pricing */}
                <section id="pricing" class="py-20 bg-white">
                    <div class="max-w-7xl mx-auto px-6">
                        <div class="text-center mb-7">
                            <h2 class="text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
                            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Our fair and transparent fine system encourages responsible waste management while promoting sustainable behavior across campus communities.</p>
                        </div>
                        <div class="max-w-4xl mx-auto">
                            <div class="bg-white rounded-xl shadow-lg  p-8 mb-8">
                                <div class="flex items-center justify-center mb-6">
                                    <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                                        <FaBalanceScale className="text-white w-8 h-8 m-1" />
                                    </div>
                                </div>
                                <h3 class="text-2xl font-bold text-center text-gray-900 mb-6">Weight-Based Fine System</h3>
                                <div class = "flex max-w-6xl justify-center">
                                    <div class="min-w-2xs grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
                                        <div class="text-center p-6 bg-red-50 rounded-lg">
                                            <div class="text-3xl font-bold text-red-600 mb-2">₹10.00</div>
                                            <div class="text-sm text-gray-600 mb-2">per gram</div>
                                            <div class="font-medium text-gray-900">Threshold Weight</div>
                                            <div class="text-xs text-gray-500">2+ gram excess</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="bg-gray-50 rounded-lg p-6">
                                    <h4 class="font-semibold text-gray-900 mb-4">How It Works:</h4>
                                    <div class="space-y-3">
                                        <div class="flex items-start">
                                            <div class="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5"><span class="text-white text-sm font-bold">1</span></div>
                                            <div>
                                                <div class="font-medium text-gray-900">Smart Monitoring</div>
                                                <div class="text-sm text-gray-600">IoT sensors automatically track waste weight in real-time</div>
                                            </div>
                                        </div>
                                        <div class="flex items-start">
                                            <div class="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5"><span class="text-white text-sm font-bold">2</span></div>
                                            <div>
                                                <div class="font-medium text-gray-900">Threshold Detection</div>
                                                <div class="text-sm text-gray-600">System identifies when waste exceeds optimal levels per area</div>
                                            </div>
                                        </div>
                                        <div class="flex items-start">
                                            <div class="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5"><span class="text-white text-sm font-bold">3</span></div>
                                            <div>
                                                <div class="font-medium text-gray-900">Automatic Calculation</div>
                                                <div class="text-sm text-gray-600">Fines calculated based on excess weight and tier system</div>
                                            </div>
                                        </div>
                                        <div class="flex items-start">
                                            <div class="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mr-3 mt-0.5"><span class="text-white text-sm font-bold">4</span></div>
                                            <div>
                                                <div class="font-medium text-gray-900">Revenue Reinvestment</div>
                                                <div class="text-sm text-gray-600">All fine revenue goes toward campus sustainability initiatives</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* Upcoming Programs/Project */}
                <section id="programs" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcomming Programs</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Smart Sentinel is currently focused on student hostels. Next, we plan to scale the same system to new domains for wider sustainability impact.
                    </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    
                    {/* Hotels & Resorts */}
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                        <div className="w-16 h-16 bg-amber-500 rounded-lg flex items-center justify-center mb-6">
                        <FaHotel className="text-white w-7 h-7 m-1" />
                        </div>
                        <div className="inline-flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold border text-black shadow-xl/20">Next Phase</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Hotels & Resorts</h3>
                        <p className="text-gray-600 leading-relaxed">
                        Extend Smart Sentinel to hospitality to track and reduce waste, promote eco-friendly practices,
                        and support sustainable tourism through responsible resource usage.
                        </p>
                    </div>

                    {/* Corporate Offices */}
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                        <div className="w-16 h-16 bg-indigo-500 rounded-lg flex items-center justify-center mb-6">
                        <FaBuilding className="text-white w-7 h-7 m-1" />
                        </div>
                        <div className="inline-flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold border text-black shadow-xl/20">Next Phase</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Corporate Offices</h3>
                        <p className="text-gray-600 leading-relaxed">
                        Integrate Smart Sentinel into workplaces to encourage better waste segregation, monitor
                        sustainability KPIs, and foster greener office environments.
                        </p>
                    </div>

                    {/* Community Housing Societies */}
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
                        <div className="w-16 h-16 bg-emerald-500 rounded-lg flex items-center justify-center mb-6">
                        <FaHome className="text-white w-7 h-7 m-1" />
                        </div>
                        <div className="inline-flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold border text-black shadow-xl/20">Next Phase</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Housing Societies</h3>
                        <p className="text-gray-600 leading-relaxed">
                        Deploy Smart Sentinel in residential societies to enable smart waste management, improve
                        recycling habits, and significantly reduce landfill contributions.
                        </p>
                    </div>
                    </div>
                </div>
                </section>



{/* Contact */}
<section id="contact" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Core Team</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Dedicated professionals working towards a sustainable campus environment</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="flex items-center flex-col text-center">
                <img alt="Anurag" class="w-50 h-50 mb-6 rounded-full object-cover object-top" src="/src/assets/Anurag.JPG">
                </img>
                <h3 class="text-3xl font-semibold text-gray-900">Anurag Daundkar</h3>
            </div>
             <div class="flex items-center flex-col text-center">
                <img alt="Piyush" class="w-50 h-50 mb-6 rounded-full object-cover object-top" src="/src/assets/Piyushjpg.JPG">
                </img>
                <h3 class="text-3xl font-semibold text-gray-900">Abhijeet Budhwant</h3>
            </div>
            <div class="flex items-center flex-col text-center">
                <img alt="Shashank" class="w-50 h-50 mb-6 rounded-full object-cover object-top" src="/src/assets/Shashank.JPG">
                </img>
                <h3 class="text-3xl font-semibold text-gray-900">Shashank Akhade</h3>
            </div>
             <div class="flex items-center flex-col text-center">
                <img alt="Krishna" class="w-50 h-50 mb-6 rounded-full object-cover object-top" src="/src/assets/Anurag.JPG">
                </img>
                <h3 class="text-3xl font-semibold text-gray-900">Krushna Chandre</h3>
            </div>
        </div>
        <div class="mt-16 text-center">
            <div class="bg-gray-50 p-8 rounded-xl max-w-4xl mx-auto">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
                <div class="grid md:grid-cols-3 gap-6">
                    <div class="flex items-center justify-center">
                        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 p-2">
                            <FaEnvelope className="text-green-600 w-5 h-5"/>
                            
                            </div><span class="text-gray-700">anurag.daundkar231@vit.edu</span>
                    </div>
                    <div class="flex items-center justify-center">
                        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <FaPhone className="text-green-600 w-4 h-4"/>
                            </div><span class="text-gray-700">+91 9168842004</span>
                    </div>
                    <div class="flex items-center justify-center">
                        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <FaMapMarkerAlt className="text-green-600 w-4 h-4"/>
                            </div>
                            <span class="text-gray-700">VIT Pune</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>



                {/* Help */}
<section id="help" class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Help &amp; Support</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">Find answers to common questions and submit your feedback</p>
        </div>
        <div class="grid lg:grid-cols-2 gap-12">
            <div>
                <h3 class="text-2xl font-semibold text-gray-900 mb-8">Frequently Asked Questions</h3>
                <div class="space-y-6">
                    <div class="bg-white p-6 rounded-xl shadow-sm">
                        <h4 class="font-semibold text-gray-900 mb-2">How does the face recognition system work?</h4>
                        <p class="text-gray-600">Our AI-powered system captures images when waste is disposed and matches them with registered student profiles to ensure accurate tracking and accountability.</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm">
                        <h4 class="font-semibold text-gray-900 mb-2">What happens if I can't pay the fine immediately?</h4>
                        <p class="text-gray-600">We offer flexible payment plans and the option to earn eco-points through community service to offset penalties. Contact our support team for assistance.</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm">
                        <h4 class="font-semibold text-gray-900 mb-2">How can I improve my compliance score?</h4>
                        <p class="text-gray-600">Consistently dispose waste properly, participate in recycling programs, attend sustainability workshops, and maintain a clean personal space to boost your score.</p>
                    </div>
                    <div class="bg-white p-6 rounded-xl shadow-sm">
                        <h4 class="font-semibold text-gray-900 mb-2">Is my personal data secure?</h4>
                        <p class="text-gray-600">Yes, we follow strict data protection protocols. Your information is encrypted and used only for waste management purposes within the campus environment.</p>
                    </div>
                </div>
            </div>
            <div>
                <h3 class="text-2xl font-semibold text-gray-900 mb-8">Send Us Your Feedback</h3>
                <div class="bg-white p-8 rounded-xl shadow-sm">
                    <form class="space-y-6" data-readdy-form="true" id="feedback-form">
                        <div><label class="block text-sm font-medium text-gray-700 mb-2">Your Name</label><input type="text" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="Enter your full name" required="" name="name" fdprocessedid="02lo1n"/></div>
                        <div><label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label><input type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" placeholder="your.email@college.edu" required="" name="email" fdprocessedid="y63rxr"/></div>
                        <div><label class="block text-sm font-medium text-gray-700 mb-2">Category</label><select name="category" class="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required="" fdprocessedid="l197uk">
                                <option value="">Select category</option>
                                <option value="general">General Feedback</option>
                                <option value="technical">Technical Issue</option>
                                <option value="suggestion">Feature Suggestion</option>
                                <option value="complaint">Complaint</option>
                                <option value="doubt">Question/Doubt</option>
                            </select></div>
                        <div><label class="block text-sm font-medium text-gray-700 mb-2">Message</label><textarea name="message" rows="5" maxlength="500" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none" placeholder="Please describe your feedback, suggestion, or concern in detail..." required=""></textarea>
                            <p class="text-sm text-gray-500 mt-1">Maximum 500 characters</p>
                        </div><button type="submit" class="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer" fdprocessedid="qn0bx">Submit Feedback</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
            
            </div>



            <footer class="bg-gray-900 text-white py-12">
                <div class="max-w-7xl mx-auto px-6">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div class="flex items-center space-x-2 mb-4">
                                <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                    <FaRecycle className="text-white w-5 h-5"/>
                                </div>
                                <span class="text-xl font-bold">Smart Sentinel</span>
                            </div>
                            <p class="text-gray-300 text-sm">Smart waste monitoring system for a cleaner, more sustainable future in educational institutions.</p>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-4">Quick Links</h3>
                            <div class="space-y-2">
                                <button class="block text-gray-300 hover:text-green-400 cursor-pointer whitespace-nowrap text-left">Home</button>
                                <button class="block text-gray-300 hover:text-green-400 cursor-pointer whitespace-nowrap text-left">Features</button>
                                <button class="block text-gray-300 hover:text-green-400 cursor-pointer whitespace-nowrap text-left">Programs</button>
                                <button class="block text-gray-300 hover:text-green-400 cursor-pointer whitespace-nowrap text-left">Resources</button>
                            </div>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-4">Support</h3>
                            <div class="space-y-2">
                                <button class="block text-gray-300 hover:text-green-400 cursor-pointer whitespace-nowrap text-left">Help Center</button>
                                <button class="block text-gray-300 hover:text-green-400 cursor-pointer whitespace-nowrap text-left">Contact Us</button>
                                <button class="block text-gray-300 hover:text-green-400 cursor-pointer whitespace-nowrap text-left">Pricing</button>
                            </div>
                        </div>
                        <div>
                            <h3 class="font-semibold mb-4">Connect With Us</h3>
                            <div class="flex space-x-4">
                                <div class="w-8 h-8 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                                    <FaFacebook className="text-white w-4 h-4"/>
                                </div>
                                <div class="w-8 h-8 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                                    <FaTwitter className="text-white w-4 h-4"/>
                                </div>
                                <div class="w-8 h-8 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                                    <FaInstagram className="text-white w-4 h-4"/>
                                </div>
                                <div class="w-8 h-8 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center cursor-pointer transition-colors">
                                    <FaLinkedin className="text-white w-4 h-4"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="border-t border-gray-800 mt-8 pt-8 text-center">
                        <p class="text-gray-400 text-sm">© 2024 Smart Sentinel. All rights reserved. Making the world cleaner, one smart bin at a time.</p>
                    </div>
                </div>
            </footer>
    </div>
  );
};

export default LandingPage;