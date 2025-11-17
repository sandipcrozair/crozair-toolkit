import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowLeft, Home, ChevronRight, Settings } from "lucide-react";

const Header = ({ isOpen, setIsOpen, routes }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Find active main tab
  const activeMainTab = routes.find((r) =>
    location.pathname.startsWith(r.path)
  );

  // Find active sub-tab (exact match)
  const activeSubTab =
    activeMainTab?.subTabs?.find((sub) => location.pathname === sub.path) ||
    null;
  console.log("activeSubTab", activeSubTab);

  const canGoBack = location.pathname !== "/";

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
      <div className="flex items-center justify-between px-4 py-4 sm:py-5 md:px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {/* Sidebar toggle (mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition flex-shrink-0"
          >
            {isOpen ? (
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
            ) : (
              <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
            )}
          </button>

          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            {/* Home button - Always visible */}
            <button
              onClick={() => navigate("/")}
              className={`flex items-center space-x-1 px-2 sm:px-3 py-2 rounded-lg transition-all duration-200 flex-shrink-0 ${
                location.pathname === "/"
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="text-sm font-medium hidden xs:block">Home</span>
            </button>

            {/* Breadcrumb separator and active page */}
            {activeMainTab && (
              <>
                <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <div className="flex items-center space-x-2 min-w-0">
                  <button
                    onClick={() => navigate(activeMainTab.path)}
                    className="flex items-center space-x-2 px-2 sm:px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-gray-100 group flex-shrink-0 min-w-0"
                  >
                    {activeMainTab.icon && (
                      <div className="text-blue-500 flex-shrink-0">
                        {React.cloneElement(activeMainTab.icon, {
                          className: "h-4 w-4",
                        })}
                      </div>
                    )}
                    <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 truncate max-w-[120px] sm:max-w-[200px]">
                      {activeMainTab.title}
                    </span>
                  </button>

                  {/* Sub-tab breadcrumb */}
                  {activeSubTab && (
                    <>
                      <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <div className="flex items-center space-x-2 px-2 sm:px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-100 flex-shrink-0 min-w-0">
                        {activeSubTab.icon && (
                          <div className="text-blue-600 flex-shrink-0">
                            {React.cloneElement(activeSubTab.icon, {
                              className: "h-4 w-4",
                            })}
                          </div>
                        )}
                        <span className="text-sm font-medium text-blue-700 truncate max-w-[120px] sm:max-w-[200px]">
                          {activeSubTab.title}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Back button */}
          {canGoBack && (
            <button
              onClick={() => navigate(-1)}
              className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 rounded-lg transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-800 flex-shrink-0 ${
                !canGoBack ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium hidden sm:block">Back</span>
            </button>
          )}

          {/* Settings button */}
          {/* <button className="hidden sm:flex p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 text-gray-600 hover:text-gray-800">
            <Settings className="h-5 w-5" />
          </button> */}

          {/* User profile/status */}
          {/* <div className="hidden md:flex items-center space-x-2 pl-2 border-l border-gray-200 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">CT</span>
            </div>
            <div className="hidden lg:block flex-shrink-0">
              <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
                Crozair Toolkit
              </p>
              <p className="text-xs text-gray-500 whitespace-nowrap">
                Professional
              </p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Progress indicator for page transitions */}
      <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 w-0 animate-pulse"></div>
    </header>
  );
};

export default Header;
