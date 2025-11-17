import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Gauge,
  Wind,
  Calculator,
  Search,
  Filter,
  Sparkles,
  Play,
  Target,
  Users,
  Star,
  Clock,
} from "lucide-react";
import AltimeterIcon from "../assets/altitude.png";
import PressureIcon from "../assets/pressure.png";

const tools = [
  {
    name: "Altimeter",
    subtitle:
      "Calculate elevation differences and related topographical parameters",
    icon: AltimeterIcon, // Use just the image path
    path: "elevation-calculator",
    category: "Topography",
    badgeColor: "bg-blue-100 text-blue-700 border border-blue-200",
    gradient: "from-blue-500 to-blue-600",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    features: [
      "Topographical data",
      "Elevation differences",
      "Geographic parameters",
    ],
  },
  {
    name: "Vacuum Unit Converter",
    subtitle:
      "Convert vacuum units for accurate measurements in scientific applications",
    icon: <Wind className="text-white" size={24} />,
    path: "vacuum-converter",
    category: "Conversion",
    gradient: "from-purple-500 to-purple-600",
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
    badgeColor: "bg-purple-100 text-purple-700 border border-purple-200",
    features: [
      "Scientific applications",
      "Multiple vacuum units",
      "Accurate measurements",
    ],
  },
  {
    name: "Pressure Unit Converter",
    subtitle:
      "Convert between different pressure units with precision and real-time results",
    icon: PressureIcon || <Gauge className="text-white" size={24} />,
    path: "pressure-converter",
    category: "Conversion",
    gradient: "from-emerald-500 to-emerald-600",
    bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    badgeColor: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    features: [
      "Real-time conversion",
      "Multiple unit systems",
      "High precision",
    ],
  },
  {
    name: "Barometric Leg Calculator",
    subtitle:
      "Calculate maximum condensate lift height in vacuum systems using atmospheric pressure principles",
    icon: <Gauge className="text-white" size={24} />,
    path: "barometric-leg-calculator",
    category: "Vacuum Engineering",
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-500 to-pink-500",
    badgeColor: "bg-purple-100 text-purple-700 border border-purple-200",
    features: [
      "Predefined liquid database",
      "Current location pressure",
      "Safety factor adjustment",
    ],
  },
];

export default function Tools() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(tools.map((tool) => tool.category))];

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCardClick = (tool) => {
    navigate(`/tools/${encodeURIComponent(tool.path)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-2">
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
                    Engineering Tools
                  </span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
                Professional{" "}
                <span className="text-cyan-300 block sm:inline">Tools</span>
              </h1>
              <p className="text-blue-100 text-base sm:text-lg lg:text-xl xl:text-2xl max-w-2xl leading-relaxed mb-6 sm:mb-8">
                Essential conversion and calculation tools for engineers and
                scientists. Accurate, reliable, and built for professionals.
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

      {/* Search + Filter */}
      <div className="px-4 mx-auto">
        <div className="mb-4 sm:mb-12">
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
                  placeholder="Search tools.."
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
          </div>
        </div>

        {/* Tools Grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl shadow-lg border border-gray-100">
            <Search className="mx-auto text-gray-400 w-10 h-10 mb-2" />
            <h3 className="text-xl font-bold text-gray-800">No tools found</h3>
            <p className="text-gray-500">
              Try adjusting your filters or search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6 sm:mb-8">
            {filteredTools.map((tool) => (
              <div
                key={tool.name}
                className="group cursor-pointer h-full" // Added h-full here
                onClick={() => handleCardClick(tool)}
              >
                <div className="relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 h-full flex flex-col">
                  {" "}
                  {/* Added h-full and flex flex-col */}
                  <div className={`h-2 ${tool.bgColor}`}></div>
                  <div className="p-6 flex flex-col flex-1">
                    {" "}
                    {/* Added flex-1 to make content area flexible */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl ${tool.bgColor} shadow-lg`}
                      >
                        {typeof tool.icon === "string" ? (
                          <img
                            src={tool.icon}
                            alt={tool.name}
                            className="w-6 h-6 sm:w-8 sm:h-8 object-contain invert"
                          />
                        ) : (
                          React.cloneElement(tool.icon, {
                            className: "text-white w-5 h-5 sm:w-6 sm:h-6",
                          })
                        )}
                      </div>

                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${tool.badgeColor}`}
                      >
                        {tool.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 flex-1">
                      {" "}
                      {/* Added flex-1 to allow text to grow */}
                      {tool.subtitle}
                    </p>
                    <div className="space-y-1">
                      {tool.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                          <span className="text-xs text-gray-500">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500">
                        Click to open
                      </span>
                      <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition">
                        <Play className="text-blue-600 w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
