import React from "react";
import {
  Calculator,
  Zap,
  Thermometer,
  Gauge,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export function ResultsDisplay({ loading, result, error }) {
  console.log("result", result);
  if (!loading && !result && !error) return null;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100/80 backdrop-blur-sm mb-8 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-red-50/20 to-transparent pointer-events-none" />

      {/* Accent Border */}
      {/* <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500" /> */}

      {loading && <LoadingState />}
      {error && <ErrorState error={error} />}
      {result && !loading && <SuccessState result={result} />}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="text-center py-4 relative">
      <div className="flex flex-col items-center">
        {/* Animated Icon Container */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <Clock className="w-8 h-8 text-white relative z-10" />
          </div>
          {/* Pulsing Ring */}
          <div className="absolute -inset-4 border-2 border-orange-200 rounded-2xl" />
        </div>

        <div className="space-y-3">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Processing Data
          </h3>
          <p className="text-gray-600 font-medium">
            Calculating boiling point with precision
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6 w-48 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-3/4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorState({ error }) {
  return (
    <div className="text-center py-4">
      <div className="flex flex-col items-center">
        {/* Error Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <AlertCircle className="w-8 h-8 text-white relative z-10" />
          </div>
          {/* Warning Symbol */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">!</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
            Calculation Error
          </h3>

          <div className="bg-red-50 border-l-4 border-red-400 rounded-xl p-4 max-w-md mx-auto">
            <p className="text-red-700 font-medium text-left">{error}</p>
          </div>

          <p className="text-gray-500 text-sm">
            Please review your inputs and try again
          </p>
        </div>
      </div>
    </div>
  );
}

function SuccessState({ result }) {
  return (
    <div className="text-center">
      {/* Success Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <CheckCircle className="w-8 h-8 text-white relative z-10" />
          </div>
          {/* Celebration Dots */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full shadow-sm" />
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-400 rounded-full shadow-sm" />
        </div>

        <div className="space-y-2">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Calculation Complete
          </h3>
          <p className="text-gray-600 text-lg font-medium">{result.message}</p>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {result.P2 !== undefined && (
          <ResultCard
            label="Target Pressure"
            value={result.P2}
            unit="Torr"
            icon={Gauge}
            gradient="from-blue-500 to-cyan-600"
            iconBg="bg-gradient-to-br from-blue-500 to-cyan-600"
          />
        )}
        {result.T2 !== undefined && (
          <ResultCard
            label="Target Temperature"
            value={result.T2}
            unit="°C"
            icon={Thermometer}
            gradient="from-orange-500 to-red-600"
            iconBg="bg-gradient-to-br from-orange-500 to-red-600"
          />
        )}
      </div>

      {/* Success Footer */}
      <div className="mt-8 flex items-center justify-center gap-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-100">
        <Sparkles className="w-5 h-5 text-orange-500" />
        <span className="text-orange-700 font-semibold text-sm">
          Results calculated with scientific precision
        </span>
        <Sparkles className="w-5 h-5 text-orange-500" />
      </div>
    </div>
  );
}

function ResultCard({ label, value, unit, icon: Icon, gradient, iconBg }) {
  return (
    <div className="group bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105">
      {/* Icon Header */}
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="w-2 h-2 bg-green-400 rounded-full" />
      </div>

      {/* Content */}
      <div className="text-left">
        <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
          {label}
        </div>
        <div className="flex items-baseline gap-2">
          <div
            className={`text-4xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
          >
            {typeof value === "number" ? value.toFixed(2) : value}
          </div>
          <div className="text-lg text-gray-400 font-medium">{unit}</div>
        </div>
      </div>

      {/* Accent Bar */}
      <div
        className={`h-1 mt-4 bg-gradient-to-r ${gradient} rounded-full transform origin-left transition-transform duration-500 group-hover:scale-x-100 scale-x-90`}
      />
    </div>
  );
}

// Add to your global CSS
const styles = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-shimmer {
  animation: shimmer 2s infinite;
}
`;
