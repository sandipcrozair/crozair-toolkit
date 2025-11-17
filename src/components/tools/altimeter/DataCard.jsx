import React from "react";

const DataCard = ({
  label,
  value,
  icon: Icon,
  unit,
  index,
  type = "normal",
}) => {
  // Determine styling based on data type
  const getCardStyles = () => {
    switch (type) {
      case "pressure":
        return {
          bg: "bg-gradient-to-br from-blue-50 to-blue-100",
          border: "border-blue-200",
          hoverBorder: "hover:border-blue-300",
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          valueColor: "text-blue-700",
          unitColor: "text-blue-600",
        };
      case "vacuum":
        return {
          bg: "bg-gradient-to-br from-purple-50 to-purple-100",
          border: "border-purple-200",
          hoverBorder: "hover:border-purple-300",
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
          valueColor: "text-purple-700",
          unitColor: "text-purple-600",
        };
      case "elevation":
        return {
          bg: "bg-gradient-to-br from-green-50 to-green-100",
          border: "border-green-200",
          hoverBorder: "hover:border-green-300",
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
          valueColor: "text-green-700",
          unitColor: "text-green-600",
        };
      case "location":
        return {
          bg: "bg-gradient-to-br from-orange-50 to-orange-100",
          border: "border-orange-200",
          hoverBorder: "hover:border-orange-300",
          iconBg: "bg-orange-100",
          iconColor: "text-orange-600",
          valueColor: "text-orange-700",
          unitColor: "text-orange-600",
        };
      default:
        return {
          bg: "bg-gradient-to-br from-gray-50 to-gray-100",
          border: "border-gray-200",
          hoverBorder: "hover:border-gray-300",
          iconBg: "bg-gray-100",
          iconColor: "text-gray-600",
          valueColor: "text-gray-700",
          unitColor: "text-gray-600",
        };
    }
  };

  const styles = getCardStyles();

  // Format values appropriately
  const formatValue = (val, unitType) => {
    if (typeof val === "number") {
      if (unitType === "pa") {
        // Convert to kPa for better readability
        return (val / 1000).toFixed(2);
      }
      if (unitType === "ft") {
        return val.toFixed(1);
      }
      return val.toFixed(2);
    }
    return val;
  };

  // Format unit display
  const formatUnit = (unitType) => {
    switch (unitType) {
      case "pa":
        return "kPa";
      case "m":
        return "m";
      case "ft":
        return "ft";
      case "degrees":
        return "°";
      default:
        return unit;
    }
  };

  return (
    <div
      className={`${styles.bg} rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${styles.border} ${styles.hoverBorder} group p-6 sm:p-6 lg:p-6 transform hover:-translate-y-1`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Icon Container */}
        <div
          className={`w-12 h-12 ${styles.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className={`w-6 h-6 ${styles.iconColor}`} />
        </div>

        {/* Label */}
        <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide whitespace-nowrap">
          {label}
        </span>

        {/* Value and Unit */}
        <div className="flex items-baseline space-x-2">
          <p className={`text-2xl sm:text-3xl font-bold ${styles.valueColor}`}>
            {formatValue(value, unit)}
          </p>
          {unit && (
            <span className={`text-sm font-medium ${styles.unitColor}`}>
              {formatUnit(unit)}
            </span>
          )}
        </div>

        {/* Additional info for specific types */}
        {type === "pressure" && value > 101325 && (
          <div className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
            Above Standard
          </div>
        )}
        {type === "pressure" && value < 101325 && (
          <div className="text-xs text-orange-600 font-medium bg-orange-50 px-2 py-1 rounded-full">
            Below Standard
          </div>
        )}
      </div>
    </div>
  );
};

// Example usage component
const WeatherDashboard = () => {
  const weatherData = {
    latitude: "19.115599",
    longitude: "72.861648",
    elevation_m: 31,
    elevation_ft: 101.70604,
    pressure_pa: 100953.15,
    vacuum_pa: 371.85,
  };

  // Icons (you'll need to replace these with your actual icons)
  const LocationIcon = () => <span>📍</span>;
  const ElevationIcon = () => <span>⛰️</span>;
  const PressureIcon = () => <span>🌡️</span>;
  const VacuumIcon = () => <span>💨</span>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Weather Station Dashboard
          </h1>
          <p className="text-gray-600">Real-time atmospheric data monitoring</p>
        </div>

        {/* Data Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <DataCard
            label="Latitude"
            value={weatherData.latitude}
            icon={LocationIcon}
            unit="degrees"
            index={0}
            type="location"
          />
          <DataCard
            label="Longitude"
            value={weatherData.longitude}
            icon={LocationIcon}
            unit="degrees"
            index={1}
            type="location"
          />
          <DataCard
            label="Elevation"
            value={weatherData.elevation_m}
            icon={ElevationIcon}
            unit="m"
            index={2}
            type="elevation"
          />
          <DataCard
            label="Pressure"
            value={weatherData.pressure_pa}
            icon={PressureIcon}
            unit="pa"
            index={3}
            type="pressure"
          />
          <DataCard
            label="Vacuum"
            value={weatherData.vacuum_pa}
            icon={VacuumIcon}
            unit="pa"
            index={4}
            type="vacuum"
          />
          <DataCard
            label="Elevation (ft)"
            value={weatherData.elevation_ft}
            icon={ElevationIcon}
            unit="ft"
            index={5}
            type="elevation"
          />
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Location Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Coordinates: </span>
              {weatherData.latitude}, {weatherData.longitude}
            </div>
            <div>
              <span className="font-medium">Elevation: </span>
              {weatherData.elevation_m}m ({weatherData.elevation_ft}ft)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
// Export the dashboard component if needed
export { WeatherDashboard };
