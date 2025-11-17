import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ScrollToTop from "./ScrollToTop"; // ✅ import here

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    {
      path: "/tools",
      title: "Tools",
      subTabs: [
        { path: "/tools/vacuum-converter", title: "Vaccum Convertor" },
        { path: "/tools/pressure-converter", title: "Pressure Unit Converter" },
        { path: "/tools/elevation-calculator", title: "Elevation Calculator" },
      ],
    },
    {
      path: "/calculators",
      title: "Calculators",
      subTabs: [
        {
          path: "/calculators/boiling-point-calculator",
          title: "Boiling Point Calculator",
        },
        { path: "/calculators/reynolds", title: "Reynolds Number" },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-col flex-1 min-w-0">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} routes={routes} />
        <main id="main-content" className="flex-1 overflow-y-auto bg-gray-50">
          {/* 👇 This will scroll the main content to top when route changes */}
          <ScrollToTop />
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default Layout;
