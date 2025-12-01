import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaRecycle, FaLeaf, FaTrashAlt, FaBiohazard } from 'react-icons/fa';

const WasteSegregation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-4">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">Waste Segregation Guidelines</h1>
          <p className="text-xl text-gray-600 mt-2">Proper sorting techniques for maximum efficiency</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
              <FaRecycle className="text-green-600 w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Why Waste Segregation Matters</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Proper waste segregation is the foundation of effective waste management. By sorting waste at the source, 
            we maximize recycling efficiency, reduce environmental impact, and minimize disposal costs.
          </p>
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-800 font-medium">
              <strong>Did you know?</strong> Proper segregation can reduce total waste volume by up to 40% and increase recycling rates by 60%.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-6">Waste Categories</h2>
        
        <div className="space-y-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-8 border-l-8 border-green-500">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mr-4">
                <FaLeaf className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Biodegradable / Organic Waste</h3>
                <p className="text-green-600 font-semibold">Green Bin</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">✅ INCLUDE:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Food scraps and leftovers</li>
                  <li>• Fruit and vegetable peels</li>
                  <li>• Tea bags and coffee grounds</li>
                  <li>• Eggshells</li>
                  <li>• Paper napkins and tissues (food-soiled)</li>
                  <li>• Garden waste (leaves, flowers)</li>
                  <li>• Cardboard pizza boxes (food-soiled)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">❌ EXCLUDE:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Plastic bags or wrappers</li>
                  <li>• Bones (large animal bones)</li>
                  <li>• Synthetic materials</li>
                  <li>• Metal or glass</li>
                  <li>• Oil or grease containers</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-green-100 p-4 rounded-lg">
              <p className="text-green-900"><strong>Composting Potential:</strong> Organic waste can be converted into nutrient-rich compost for campus gardens, closing the sustainability loop.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-l-8 border-blue-500">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                <FaRecycle className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Recyclable Waste</h3>
                <p className="text-blue-600 font-semibold">Blue Bin</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">✅ INCLUDE:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Paper (newspapers, magazines, notebooks)</li>
                  <li>• Cardboard and paperboard</li>
                  <li>• Plastic bottles and containers (clean)</li>
                  <li>• Metal cans (aluminum, steel)</li>
                  <li>• Glass bottles and jars</li>
                  <li>• Tetra packs (juice/milk cartons)</li>
                  <li>• Clean plastic bags</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">❌ EXCLUDE:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Food-contaminated materials</li>
                  <li>• Plastic wrappers and films</li>
                  <li>• Broken glass or ceramics</li>
                  <li>• Styrofoam</li>
                  <li>• Electronics</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-blue-100 p-4 rounded-lg">
              <p className="text-blue-900"><strong>Preparation Tips:</strong> Rinse containers to remove food residue. Remove caps and labels when possible. Flatten cardboard boxes to save space.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-l-8 border-gray-600">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mr-4">
                <FaTrashAlt className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Non-Recyclable / Dry Waste</h3>
                <p className="text-gray-600 font-semibold">Black/Grey Bin</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">✅ INCLUDE:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Plastic wrappers and pouches</li>
                  <li>• Chip bags and snack packets</li>
                  <li>• Styrofoam packaging</li>
                  <li>• Broken toys or household items</li>
                  <li>• Ceramic and pottery waste</li>
                  <li>• Rubber items</li>
                  <li>• Clothing rags (damaged beyond use)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">⚠️ MINIMIZE:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Avoid single-use plastics</li>
                  <li>• Choose products with minimal packaging</li>
                  <li>• Opt for reusable alternatives</li>
                  <li>• Repair instead of disposing when possible</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-900"><strong>Goal:</strong> This category should be the smallest in volume. Reducing non-recyclable waste is key to sustainability.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border-l-8 border-red-500">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mr-4">
                <FaBiohazard className="text-white w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Hazardous / E-Waste</h3>
                <p className="text-red-600 font-semibold">Special Collection</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">✅ INCLUDE:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Batteries (all types)</li>
                  <li>• Electronic devices (phones, laptops)</li>
                  <li>• Light bulbs and fluorescent tubes</li>
                  <li>• Medical waste (syringes, bandages)</li>
                  <li>• Paint cans and chemical containers</li>
                  <li>• Printer cartridges</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">⚠️ SPECIAL HANDLING:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li>• Never mix with regular waste</li>
                  <li>• Contact admin for collection</li>
                  <li>• Store separately in designated area</li>
                  <li>• Follow institutional e-waste policy</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 bg-red-100 p-4 rounded-lg">
              <p className="text-red-900"><strong>Important:</strong> Hazardous waste requires professional disposal. Contact hostel administration for proper collection and disposal procedures.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Mistakes to Avoid</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <h3 className="font-bold text-red-900 mb-3">❌ DON'T</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Mix wet and dry waste together</li>
                <li>• Dispose of hazardous waste in regular bins</li>
                <li>• Put plastic bags in recycling bins</li>
                <li>• Throw food-contaminated paper in recyclables</li>
                <li>• Ignore segregation labels on bins</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="font-bold text-green-900 mb-3">✅ DO</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Rinse containers before recycling</li>
                <li>• Check bin labels before disposing</li>
                <li>• Flatten cardboard boxes to save space</li>
                <li>• Remove food residue from packaging</li>
                <li>• Separate lids from containers</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">🌱 Your Impact Matters</h2>
          <p className="text-lg mb-4">
            Every correctly segregated item contributes to a cleaner, greener campus. By following these guidelines, 
            you're not just managing waste—you're actively participating in building a sustainable future.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center">
              <p className="text-4xl font-bold mb-2">40%</p>
              <p className="text-sm">Waste Reduction Potential</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center">
              <p className="text-4xl font-bold mb-2">60%</p>
              <p className="text-sm">Recycling Rate Increase</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg text-center">
              <p className="text-4xl font-bold mb-2">100%</p>
              <p className="text-sm">Student Responsibility</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WasteSegregation;
