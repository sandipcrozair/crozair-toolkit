import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Wrench, Calculator, Home, X } from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    {
      name: "Home",
      path: "/",
      icon: <Home className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: "Dashboard overview",
      exact: true,
    },
    {
      name: "Tools",
      path: "/tools",
      icon: <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: "Engineering utilities",
      exact: false,
    },
    {
      name: "Calculators",
      path: "/calculators",
      icon: <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />,
      description: "Math & conversions",
      exact: false,
    },
    // {
    //   name: "Settings",
    //   path: "/settings",
    //   icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />,
    //   description: "App configuration",
    // },
  ];

  const isActive = (link) => {
    if (link.exact) {
      return location.pathname === link.path;
    }
    return location.pathname.startsWith(link.path);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-90 z-30 md:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed md:relative inset-y-0 left-0 z-40 w-64 sm:w-72 md:w-80 bg-gradient-to-b from-white to-gray-50/80 backdrop-blur-lg border-r border-gray-200/60 shadow-xl transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-5 md:p-3.5 border-b">
          <div
            className="flex items-center justify-between gap-2 sm:gap-3 cursor-pointer group"
            onClick={() => {
              navigate("/");
              setIsOpen(false);
            }}
          >
            <div className="relative">
              <img
                src="/logo.svg"
                alt="Crozair Logo"
                className="w-100 h-11.5 object-contain"
                onError={(e) => {
                  // Fallback if logo doesn't exist
                  e.target.style.display = "none";
                  const fallback = document.createElement("div");
                  fallback.className =
                    "w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center";
                  fallback.innerHTML =
                    '<span class="text-white font-bold text-xs">C</span>';
                  e.target.parentNode.appendChild(fallback);
                }}
              />
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1.5 sm:p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 group border border-gray-200"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-gray-800" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="p-3 sm:p-4 md:p-6 space-y-1 sm:space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4 px-2 sm:px-3">
            Main Menu
          </p>

          {links.map((link) => {
            const active = isActive(link);
            return (
              <div key={link.path} className="relative">
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center p-3 sm:p-4 rounded-xl sm:rounded-2xl transition-all duration-300 relative overflow-hidden
                    ${
                      active
                        ? "bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-l-4 border-blue-500 shadow-sm"
                        : "hover:bg-white/80 border-l-4 border-transparent hover:border-gray-200 hover:shadow-md"
                    }`}
                >
                  {/* Animated background effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                      active && "opacity-100"
                    }`}
                  ></div>

                  {/* Icon container */}
                  <div
                    className={`relative z-10 p-2 sm:p-3 rounded-lg sm:rounded-xl mr-3 sm:mr-4 transition-all duration-300 shadow-sm
                    ${
                      active
                        ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg transform scale-105 sm:scale-110"
                        : "bg-white text-gray-600 group-hover:text-blue-600 group-hover:bg-blue-50 border border-gray-100"
                    }`}
                  >
                    {link.icon}
                  </div>

                  {/* Text content */}
                  <div className="relative z-10 flex-1 min-w-0">
                    <span
                      className={`font-semibold block transition-colors duration-300 text-sm sm:text-base
                      ${
                        active
                          ? "text-blue-700"
                          : "text-gray-700 group-hover:text-gray-900"
                      }
                    `}
                    >
                      {link.name}
                    </span>
                  </div>

                  {/* Active indicator */}
                  {active && (
                    <div className="relative z-10 flex-shrink-0 ml-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 border-t border-gray-200/60 bg-white/50">
          <div className="text-center">
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2 shadow-sm">
              <span className="text-white text-xs font-bold">CT</span>
            </div>
            <p className="text-xs text-gray-500 font-medium">Crozair Toolkit</p>
            {/* <p className="text-xs text-gray-400 mt-0.5 sm:mt-1">Version 2.0</p> */}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full -translate-y-12 sm:-translate-y-14 md:-translate-y-16 translate-x-12 sm:translate-x-14 md:translate-x-16 blur-xl sm:blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-28 sm:bottom-32 left-0 w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 bg-gradient-to-tr from-blue-100/30 to-purple-100/30 rounded-full -translate-x-10 sm:-translate-x-11 md:-translate-x-12 blur-xl sm:blur-2xl pointer-events-none"></div>
      </div>
    </>
  );
};

export default Sidebar;
