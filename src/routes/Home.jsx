import {
  Zap,
  Target,
  Microscope,
  Sparkles,
  Rocket,
  Shield,
  Cpu,
  Timer,
  Activity,
} from "lucide-react";
import BoilIcon from "../assets/boil.png";
import PressureIcon from "../assets/pressure.png";
import AltimeterIcon from "../assets/altitude.png";
import WindIcon from "../assets/wind-sign.png";

export default function Home() {
  const tools = [
    {
      name: "Altimeter",
      description:
        "Calculate altimeter differences and related topographical parameters",
      icon: AltimeterIcon,
      category: "tools",
      gradient: "from-blue-500 to-blue-600",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      name: "Vacuum Unit Converter",
      description:
        "Convert vacuum pressure units for accurate measurements in scientific applications",
      icon: WindIcon,
      category: "tools",
      gradient: "from-purple-500 to-purple-600",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      name: "Pressure Unit Converter",
      description:
        "Convert between different pressure units with precision and real-time results",
      icon: PressureIcon,
      category: "tools",
      gradient: "from-emerald-500 to-emerald-600",
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    },
  ];

  const calculators = [
    {
      name: "Boiling Point Calculator",
      description:
        "Calculate boiling points under different pressure conditions with scientific accuracy",
      icon: BoilIcon,
      category: "calculators",
      color: "from-orange-500 to-red-500",
      gradient: "bg-gradient-to-r from-orange-500 to-red-500",
    },
    {
      name: "Vacuum Evacuation Time",
      description:
        "Calculate time required for vacuum system evacuation with advanced algorithms",
      icon: Timer,
      category: "calculators",
      color: "from-indigo-500 to-blue-500",
      gradient: "bg-gradient-to-r from-indigo-500 to-blue-500",
    },
    {
      name: "Flow Rate Calculator",
      description:
        "Calculate fluid flow rates through pipes and channels (Coming Soon)",
      icon: Activity,
      category: "calculators",
      color: "from-teal-500 to-blue-500",
      gradient: "bg-gradient-to-br from-teal-500 to-blue-500",
      badge: "Soon",
      comingSoon: true,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant calculations with optimized algorithms",
      color: "text-yellow-500",
    },
    {
      icon: Target,
      title: "Precision Engineered",
      description: "Industry-standard accuracy for professionals",
      color: "text-green-500",
    },
    {
      icon: Microscope,
      title: "Scientific Grade",
      description: "Trusted by engineers and researchers",
      color: "text-blue-500",
    },
    {
      icon: Sparkles,
      title: "Modern Interface",
      description: "Beautiful, intuitive user experience",
      color: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100/70 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-200/10 rounded-full blur-3xl"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-10 opacity-10 animate-float">
        <Cpu className="w-8 h-8 text-blue-500" />
      </div>
      <div
        className="absolute top-40 right-20 opacity-10 animate-float"
        style={{ animationDelay: "1s" }}
      >
        <Shield className="w-10 h-10 text-purple-500" />
      </div>
      <div
        className="absolute bottom-40 left-20 opacity-10 animate-float"
        style={{ animationDelay: "2s" }}
      >
        <Rocket className="w-12 h-12 text-cyan-500" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6 shadow-lg border border-blue-500/30">
            <Rocket className="w-4 h-4" />
            🛠️ Precision Engineering Tools
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mt-2 sm:mt-3">
              Crozair{" "}
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                Toolkit
              </span>
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            Professional-grade tools and calculators for engineering
            applications.
            <span className="font-semibold text-blue-600">
              {" "}
              Accurate, reliable, and built for experts.
            </span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto mb-12 sm:mb-16 lg:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-4 text-center border border-white/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-white shadow-sm mb-3 ${feature.color}`}
                >
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 leading-tight">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">
                Professional <span className="text-gray-800">Tools</span>
              </h2>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 sm:px-0">
              Essential conversion tools for pressure, vacuum, and elevation
              calculations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                {/* Background Gradient Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                {/* Icon Container */}
                <div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${tool.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className="w-8 h-8 sm:w-8 sm:h-8 lg:w-10 lg:h-10 object-contain filter invert"
                  />
                  <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center relative">
                  {tool.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base text-center leading-relaxed relative">
                  {tool.description}
                </p>

                {/* Hover Effect Line */}
                <div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${tool.color} group-hover:w-3/4 transition-all duration-500 rounded-full`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Calculators Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                Specialized <span className="text-green-600">Calculators</span>
              </h2>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 sm:px-0">
              Advanced calculators for complex engineering computations and
              scientific analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mx-auto">
            {calculators.map((calculator, index) => (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                {/* Background Gradient Effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${calculator.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                ></div>

                {/* Icon Container */}
                <div
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r ${calculator.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {typeof calculator.icon === "string" ? (
                    <img
                      src={calculator.icon}
                      alt={calculator.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 object-contain invert"
                    />
                  ) : (
                    <calculator.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  )}
                  <div className="absolute inset-0 bg-white/10 rounded-2xl"></div>
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 text-center relative">
                  {calculator.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base text-center leading-relaxed relative">
                  {calculator.description}
                </p>

                {/* Hover Effect Line */}
                <div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${calculator.color} group-hover:w-3/4 transition-all duration-500 rounded-full`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/50 shadow-lg mx-auto">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              Ready to Start Calculating?
            </h3>
            <p className="text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
              Choose any tool or calculator above to begin your engineering
              calculations with precision and confidence.
            </p>
            <div className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm sm:text-base">
              Select a tool to get started
              <Zap className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations via style tag */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
