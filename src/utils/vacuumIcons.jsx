import {
  FiActivity,
  FiBarChart2,
  FiWind,
  FiDroplet,
  FiRefreshCw,
  FiArrowRight,
} from "react-icons/fi";

export const getVacuumUnitIcon = (unit) => {
  const iconMappings = {
    // Pascal units
    pa: <FiActivity className="text-blue-600" />,
    kpa: <FiBarChart2 className="text-blue-700" />,
    mbar: <FiBarChart2 className="text-blue-500" />,

    // Bar units
    bar: <FiBarChart2 className="text-red-600" />,

    // Atmosphere
    atm: <FiWind className="text-sky-500" />,

    // Torr units
    torr: <FiDroplet className="text-red-500" />,
    mtorr: <FiDroplet className="text-red-400" />,

    // Mercury units
    inhg_abs: <FiDroplet className="text-orange-600" />,
    inhg_g: <FiDroplet className="text-orange-500" />,

    // PSI units
    psi_abs: <FiBarChart2 className="text-orange-600" />,
    psig: <FiBarChart2 className="text-orange-500" />,

    // Water units
    inh2o: <FiDroplet className="text-blue-400" />,
    mmws: <FiDroplet className="text-blue-500" />,
    mws: <FiDroplet className="text-blue-600" />,
  };

  return iconMappings[unit] || <FiActivity className="text-gray-600" />;
};

// Export individual icons for use in components
export {
  FiActivity,
  FiBarChart2,
  FiWind,
  FiDroplet,
  FiRefreshCw,
  FiArrowRight,
};
