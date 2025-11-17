import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Calculator,
  Search,
  Filter,
  Sparkles,
  ArrowRight,
  Play,
  Target,
  Users,
  Star,
  Activity,
} from "lucide-react";

import BoilIcon from "../assets/boil.png";

const calculators = [
  {
    name: "Boiling Point Calculator",
    subtitle:
      "Determine boiling points at different pressures using Clausius-Clapeyron equation with substance database",
    icon: BoilIcon,
    path: "boiling-point-calculator",
    category: "Thermodynamics",
    gradient: "from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-500 to-red-500",
    badgeColor: "bg-orange-100 text-orange-700 border border-orange-200",
    features: [
      "Substance database",
      "Bidirectional calculation",
      "Heat of vaporization data",
    ],
  },
  {
    name: "Vacuum Evacuation Time",
    subtitle:
      "Calculate chamber evacuation times with precision using volume, pump capacity, and pressure parameters",
    icon: <Clock className="text-white" size={24} />,
    path: "vaccum-evacuation-time",
    category: "Vacuum Engineering",
    gradient: "from-indigo-500 to-blue-500",
    bgColor: "bg-gradient-to-br from-indigo-500 to-blue-500",
    badgeColor: "bg-indigo-100 text-indigo-700 border border-indigo-200",
    features: [
      "Multi-unit support",
      "Pressure range calculator",
      "Lock & calculate any parameter",
    ],
  },
  // {
  //   name: "Flow Rate Calculator",
  //   subtitle:
  //     "Determine volumetric and mass flow rates through pipes and channels accurately.",
  //   icon: <Activity className="text-white" size={24} />,
  //   path: "flow-rate-calculator",
  //   comingSoon: true,
  //   category: "Fluid Dynamics",
  //   gradient: "from-teal-500 to-blue-500",
  //   bgColor: "bg-gradient-to-br from-teal-500 to-blue-500",
  //   badgeColor: "bg-teal-100 text-teal-700 border border-teal-200",
  //   features: ["Volumetric flow", "Mass flow", "Pipe analysis"],
  // },
];

export default function Calculators() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(calculators.map((calc) => calc.category)),
  ];

  const filteredCalculators = calculators.filter((calc) => {
    const matchesSearch =
      calc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || calc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCardClick = async (calc) => {
    if (calc.comingSoon) return;
    navigate(`/calculators/${encodeURIComponent(calc.path)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl mx-4 mt-4 sm:mt-6 mb-8 sm:mb-12 p-6 sm:p-8 lg:p-12 text-white shadow-2xl">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full -translate-y-24 sm:-translate-y-32 translate-x-24 sm:translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-white/10 rounded-full translate-y-16 sm:translate-y-24 -translate-x-16 sm:-translate-x-24"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative z-10 mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-8">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-6">
                <div className="p-2 sm:p-3 bg-white/20 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/30 w-fit">
                  <Calculator className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 rounded-full backdrop-blur-sm border border-white/30 w-fit">
                  <Sparkles className="text-yellow-300 w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-white font-semibold text-xs sm:text-sm">
                    Professional Calculators
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                Engineering{" "}
                <span className="text-cyan-300 block sm:inline">
                  Calculators
                </span>
              </h1>
              <p className="text-blue-100 text-base sm:text-lg lg:text-xl xl:text-2xl max-w-2xl leading-relaxed mb-6 sm:mb-8">
                Advanced calculation tools for engineers, scientists, and
                researchers. Precision-powered solutions for complex problems.
              </p>

              {/* Stats */}
              {/* <div className="flex flex-wrap gap-4 sm:gap-6">
                {[
                  { icon: Users, value: "10K+", label: "Users" },
                  { icon: Target, value: "99.9%", label: "Accuracy" },
                  { icon: Clock, value: "24/7", label: "Available" },
                  { icon: Star, value: "4.9/5", label: "Rating" },
                ].map((stat, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                      <stat.icon className="text-cyan-300 w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm sm:text-base">
                        {stat.value}
                      </div>
                      <div className="text-blue-200 text-xs sm:text-sm">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Feature Illustration */}
            <div className="hidden lg:block flex-shrink-0 mt-6 lg:mt-0">
              <div className="w-64 xl:w-80 h-48 xl:h-64 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 p-4 xl:p-6">
                <div className="grid grid-cols-2 gap-3 xl:gap-4">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="bg-white/10 rounded-2xl p-3 xl:p-4 border border-white/20"
                    >
                      <div className="w-6 h-6 xl:w-8 xl:h-8 bg-cyan-400 rounded-lg mb-2"></div>
                      <div className="w-12 xl:w-16 h-1.5 xl:h-2 bg-white/30 rounded mb-1"></div>
                      <div className="w-8 xl:w-12 h-1.5 xl:h-2 bg-white/20 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mx-auto">
        {/* Search and Filter Section */}
        <div className="mb-8 sm:mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-stretch">
              {/* Search Box */}
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search calculators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm sm:text-base lg:text-lg rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all duration-200 hover:bg-white"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 rounded-xl px-3 sm:px-4 shadow-sm hover:bg-white transition-colors duration-200 focus-within:ring-2 focus-within:ring-blue-500">
                <Filter className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="py-3 w-full text-sm sm:text-base lg:text-lg bg-transparent border-none focus:ring-0 focus:outline-none text-gray-700 font-medium w-48 sm:w-56 cursor-pointer"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count and Clear */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 sm:mt-4 gap-2 sm:gap-0">
              <p className="text-gray-600 font-medium text-sm sm:text-base">
                Showing {filteredCalculators.length} of {calculators.length}{" "}
                calculators
              </p>
              {(searchTerm || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
                >
                  <span>Clear filters</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Calculators Grid */}
        {filteredCalculators.length === 0 ? (
          <div className="text-center py-12 sm:py-20 bg-white rounded-3xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <Search className="text-gray-400 w-6 h-6 sm:w-10 sm:h-10" />
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
              No calculators found
            </h3>
            <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-md mx-auto mb-4 sm:mb-6 px-4">
              Try adjusting your search terms or browse all categories.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
            >
              Show All Calculators
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {filteredCalculators.map((calc, index) => (
              <div
                key={calc.name}
                className="group cursor-pointer"
                onClick={() => handleCardClick(calc)}
              >
                <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1 sm:group-hover:-translate-y-2 h-full">
                  {/* Gradient Header */}
                  <div className={`h-2 ${calc.bgColor}`}></div>

                  <div className="p-4 sm:p-6 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div
                        className={`p-2 sm:p-3 rounded-xl ${calc.bgColor} shadow-lg`}
                      >
                        {typeof calc.icon === "string" ? (
                          <img
                            src={calc.icon}
                            alt={calc.name}
                            className="w-6 h-6 sm:w-8 sm:h-8 object-contain brightness-0 invert"
                          />
                        ) : (
                          React.cloneElement(calc.icon, {
                            className: "text-white w-6 h-6 sm:w-8 sm:h-8",
                          })
                        )}
                      </div>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${calc.badgeColor}`}
                        >
                          {calc.category}
                        </span>
                        <ArrowRight className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-0.5 sm:group-hover:translate-x-1 transition-all duration-300 w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
                        {calc.name}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4">
                        {calc.subtitle}
                      </p>

                      {/* Features */}
                      <div className="space-y-1.5 sm:space-y-2">
                        {calc.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-1.5 sm:space-x-2"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span className="text-xs sm:text-sm text-gray-500">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-gray-100">
                      <div className="text-xs sm:text-sm text-gray-500">
                        {calc.comingSoon ? "Coming Soon" : "Click to open"}
                      </div>
                      <div
                        className={`p-1.5 sm:p-2 rounded-lg ${
                          calc.comingSoon
                            ? "bg-gray-100"
                            : "bg-blue-50 group-hover:bg-blue-100"
                        } transition-colors duration-300`}
                      >
                        {calc.comingSoon ? (
                          <Clock className="text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <Play className="text-blue-600 w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        {/* <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-6 sm:p-8 lg:p-12 text-white text-center shadow-2xl mb-6 sm:mb-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
              Need a Custom Calculator?
            </h3>
            <p className="text-blue-100 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed">
              We specialize in building tailored calculation tools for specific
              engineering and scientific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg text-sm sm:text-base">
                Request Custom Tool
              </button>
              <button className="border-2 border-white/30 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-200 transform hover:-translate-y-0.5 text-sm sm:text-base">
                View Documentation
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
