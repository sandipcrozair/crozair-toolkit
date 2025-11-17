// // Enhanced CalculatorCard component
// import React from "react";
// import { ArrowRight, Clock, Zap } from "lucide-react";
// import { useLocation } from "react-router-dom";

// export default function CalculatorCard({ calc, onClick }) {
//   const path = useLocation();
//   return (
//     <div
//       className={`
//         group relative overflow-hidden rounded-2xl border border-gray-200/60
//         bg-white/80 backdrop-blur-sm transition-all duration-300
//         hover:shadow-xl hover:border-gray-300/80 cursor-pointer
//         ${calc.comingSoon ? "opacity-80" : "hover:scale-[1.02]"}
//         ${calc.bgColor || "bg-gradient-to-br from-gray-50 to-blue-50"}
//       `}
//       onClick={calc.comingSoon ? undefined : onClick}
//     >
//       {/* Gradient Top Bar */}
//       <div
//         className={`h-2 bg-gradient-to-r ${
//           calc.gradient || "from-gray-500 to-gray-600"
//         }`}
//       />

//       <div className="p-6">
//         {/* Header with Icon and Badges */}
//         <div className="flex items-start justify-between mb-4">
//           <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
//             {calc.icon}
//           </div>

//           <div className="flex space-x-2">
//             {calc.comingSoon && (
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
//                 <Clock size={12} className="mr-1" />
//                 Coming Soon
//               </span>
//             )}
//             {!calc.comingSoon && (
//               <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
//                 <Zap size={12} className="mr-1" />
//                 Active
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Category */}
//         {calc.category && (
//           <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mb-3">
//             {calc.category}
//           </span>
//         )}

//         {/* Content */}
//         <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
//           {calc.name}
//         </h3>

//         <p className="text-gray-600 leading-relaxed mb-6">{calc.subtitle}</p>

//         {/* Footer */}
//         <div className="flex items-center justify-between">
//           {!calc.comingSoon ? (
//             <button className="inline-flex items-center space-x-2 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
//               <span>
//                 Open {path.pathname === "/tools" ? "Tools" : "Calculator"}
//               </span>
//               <ArrowRight
//                 size={16}
//                 className="group-hover:translate-x-1 transition-transform"
//               />
//             </button>
//           ) : (
//             <span className="text-gray-500 font-medium">In Development</span>
//           )}
//         </div>
//       </div>

//       {/* Hover Effect Overlay */}
//       {!calc.comingSoon && (
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
//       )}
//     </div>
//   );
// }
