// validation/boilingPointSchema.js
import * as yup from "yup";

export const boilingPointSchema = yup
  .object({
    substance: yup.string().required("Please select a substance"),

    P1: yup
      .number()
      .typeError("Pressure must be a number")
      .positive("Pressure must be positive")
      .min(0.001, "Pressure must be at least 0.001 Torr")
      .max(760000, "Pressure cannot exceed 760,000 Torr")
      .required("Reference pressure is required"),

    T1: yup
      .number()
      .typeError("Temperature must be a number")
      .min(-273.15, "Temperature cannot be below absolute zero (-273.15°C)")
      .max(10000, "Temperature cannot exceed 10,000°C")
      .required("Reference temperature is required"),

    Hvap: yup
      .number()
      .typeError("Enthalpy must be a number")
      .positive("Enthalpy must be positive")
      .min(0.1, "Enthalpy must be at least 0.1 kJ/mol")
      .max(1000, "Enthalpy cannot exceed 1000 kJ/mol")
      .required("Enthalpy of vaporization is required"),

    P2: yup
      .number()
      .typeError("Pressure must be a number")
      .positive("Pressure must be positive")
      .min(0.001, "Pressure must be at least 0.001 Torr")
      .max(760000, "Pressure cannot exceed 760,000 Torr")
      .nullable(),
    //   .test(
    //     "one-of-p2-t2",
    //     "Either target pressure or temperature must be provided (not both)",
    //     function (value) {
    //       const { T2 } = this.parent;
    //       return !(value && T2);
    //     }
    //   ),

    T2: yup
      .number()
      .typeError("Temperature must be a number")
      .min(-273.15, "Temperature cannot be below absolute zero (-273.15°C)")
      .max(10000, "Temperature cannot exceed 10,000°C")
      .nullable(),
    //   .test(
    //     "one-of-p2-t2",
    //     "Either target pressure or temperature must be provided (not both)",
    //     function (value) {
    //       const { P2 } = this.parent;
    //       return !(value && P2);
    //     }
    //   ),
  })
  .test(
    "at-least-one-target",
    "Either target pressure or temperature must be provided",
    function (value) {
      const { P2, T2 } = value;
      return !!(P2 || T2);
    }
  );
