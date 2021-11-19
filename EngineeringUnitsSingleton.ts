import EngineeringUnits from "./lib/EngineeringUnits.ts";
import { UnitType } from "./lib/types.ts";

export default class EngineeringUnitsSingleton {
  private static instance: EngineeringUnits<UnitType> | null = null;

  constructor() {}

  public static getInstance(): EngineeringUnits<UnitType> {
    if (EngineeringUnitsSingleton.instance === null) {
      EngineeringUnitsSingleton.instance = new EngineeringUnits<UnitType>();
    }
    return EngineeringUnitsSingleton.instance;
  }
}
