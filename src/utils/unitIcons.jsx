import {
  FiActivity,
  FiBarChart2,
  FiWind,
  FiDroplet,
  FiDivide,
  FiSquare,
  FiCircle,
  FiTriangle,
  FiAnchor,
  FiFeather,
  FiAward,
  FiCloud,
  FiCpu,
  FiGitMerge,
  FiGitBranch,
  FiTarget,
  FiZap,
  FiTrendingUp,
  FiNavigation,
  FiGlobe,
  FiPackage,
  FiTool,
  FiSettings,
  FiStar,
  FiHeart,
  FiShield,
  FiBriefcase,
  FiTruck,
} from "react-icons/fi";

export const getUnitIcon = (unit) => {
  const iconMappings = {
    // Pascal and basic SI units
    pa: <FiActivity className="text-blue-600" />,
    pascal: <FiActivity className="text-blue-600" />,
    kilopascal: <FiBarChart2 className="text-blue-700" />,
    kpa: <FiBarChart2 className="text-blue-700" />,

    // Large scale Pascal units
    mpa: <FiTrendingUp className="text-purple-600" />,
    gpa: <FiTarget className="text-purple-700" />,
    tpa: <FiZap className="text-purple-800" />,
    epa: <FiGlobe className="text-indigo-600" />,
    ppa: <FiNavigation className="text-indigo-700" />,

    // Scientific notation Pascals
    hpa: <FiDivide className="text-green-600" />,
    dapa: <FiGitMerge className="text-green-500" />,
    dpa: <FiGitBranch className="text-green-400" />,
    cpa: <FiCpu className="text-green-300" />,
    mpa_small: <FiSettings className="text-teal-400" />,
    µpa: <FiTool className="text-teal-300" />,
    npa: <FiAward className="text-teal-200" />,
    ppa_small: <FiStar className="text-teal-100" />,
    fpa: <FiHeart className="text-blue-200" />,
    apa: <FiShield className="text-blue-100" />,

    // Bar units
    bar: <FiBarChart2 className="text-red-600" />,
    millibar: <FiBarChart2 className="text-red-500" />,
    mbar: <FiBarChart2 className="text-red-500" />,
    microbar: <FiSettings className="text-red-400" />,

    // Atmosphere
    atm: <FiWind className="text-sky-500" />,
    at: <FiCloud className="text-sky-600" />,

    // PSI and Imperial pressure units
    psi: <FiBarChart2 className="text-orange-600" />,
    ksi: <FiTool className="text-orange-700" />,
    psi_small: <FiBarChart2 className="text-orange-500" />,
    psf: <FiPackage className="text-orange-400" />,
    kip_per_sqin: <FiSettings className="text-orange-800" />,

    // Ton units (heavy weight)
    ton_short_per_sqft: <FiTruck className="text-amber-600" />,
    ton_short_per_sqin: <FiBriefcase className="text-amber-700" />,
    ton_long_per_sqft: <FiTruck className="text-amber-500" />,
    ton_long_per_sqin: <FiBriefcase className="text-amber-800" />,

    // Newton-based units (force)
    newton_per_m2: <FiDivide className="text-indigo-500" />,
    newton_per_cm2: <FiSquare className="text-indigo-600" />,
    newton_per_mm2: <FiCircle className="text-indigo-700" />,
    kilonewton_per_m2: <FiTriangle className="text-indigo-800" />,

    // Force-based units
    dyne_per_cm2: <FiFeather className="text-purple-400" />,
    kgf_per_m2: <FiPackage className="text-gray-600" />,
    kgf_per_cm2: <FiPackage className="text-gray-700" />,
    kgf_per_mm2: <FiPackage className="text-gray-800" />,
    gf_per_cm2: <FiFeather className="text-gray-500" />,
    poundal_per_sqft: <FiAnchor className="text-gray-400" />,

    // Mercury units (medical/weather)
    torr: <FiDroplet className="text-red-300" />,
    cmhg: <FiDroplet className="text-red-400" />,
    mmhg: <FiDroplet className="text-red-500" />,
    inhg: <FiDroplet className="text-red-600" />,

    // Water units (fluid columns)
    cmh2o: <FiDroplet className="text-blue-400" />,
    mmh2o: <FiDroplet className="text-blue-500" />,
    inhaq: <FiDroplet className="text-blue-600" />,
    ftaq: <FiDroplet className="text-blue-700" />,
  };

  return iconMappings[unit] || <FiActivity className="text-gray-600" />;
};
