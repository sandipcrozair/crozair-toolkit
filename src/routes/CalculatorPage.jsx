import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
const BoilingPointCalculator = React.lazy(() =>
  import(
    "../components/calculators/BoilingPointCalculator/BoilingPointCalculator"
  )
);
const VaccumEvacuationTimeCalculator = React.lazy(() =>
  import(
    "../components/calculators/VacuumEvacuationCalculator/VacuumEvacuationCalculator"
  )
);

const CalculatorPage = () => {
  const { calcName } = useParams();

  const renderCalculator = () => {
    switch (calcName.toLowerCase()) {
      case "boiling-point-calculator":
        return <BoilingPointCalculator />;
      case "vaccum-evacuation-time":
        return <VaccumEvacuationTimeCalculator />;
      default:
        return (
          <p className="text-gray-500 text-center mt-6">
            Calculator not found.
          </p>
        );
    }
  };

  return <Suspense fallback={<Loader />}>{renderCalculator()}</Suspense>;
};

export default CalculatorPage;
