import EngineeringUnits from "./lib/EngineeringUnits.ts";
import { UnitType } from "./lib/types.ts";

const engineeringUnits = new EngineeringUnits<UnitType>();

console.log(engineeringUnits.listAllDimensionClasses("M/T"));
console.log(engineeringUnits.listAllQuantityTypes("length"));
console.log(engineeringUnits.listAllUomByQuantityType("length"));
console.log(engineeringUnits.listAllUomByClass("M/T"));
console.log(engineeringUnits.convert_units("cm/a", 1, "cm/s"));
console.log(engineeringUnits.convert_units("mm", 1, "m"));
