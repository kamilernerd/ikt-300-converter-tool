import EngineeringUnitsAbstract, {
  UnitsConverted,
} from "./EngineeringUnitsAbstract.ts";
import FileLoader from "./FileLoader.ts";
import { UnitType } from "./types.ts";

export default class EngineeringUnits<
  T extends UnitType
> extends EngineeringUnitsAbstract<T> {
  private fileLoader: FileLoader | null = null;

  constructor(unitFilePath?: string) {
    super();

    this.fileLoader = new FileLoader(
      unitFilePath ? unitFilePath : "./lib/units.json"
    );

    const loadedUnits = this.fileLoader.readFile();

    if (loadedUnits !== null) {
      this.setUnits<T>(JSON.parse(loadedUnits));
    }
  }

  public listAllDimensionClasses(dimension: string): Array<UnitType> {
    if (!dimension) {
      return [];
    }

    return this.getUnits().filter(
      (unit: UnitType) =>
        unit.DimensionalClass && unit.DimensionalClass === dimension
    );
  }

  public listAllQuantityTypes(type: string): Array<UnitType> {
    if (!type) {
      return [];
    }

    return this.getUnits().filter((unit: UnitType) => {
      const quantityType = unit.QuantityType;
      if (Array.isArray(quantityType)) {
        return quantityType.find((k: null | string) => k === type);
      } else {
        return quantityType && quantityType === type;
      }
    });
  }

  public listAllUomByClass(dimension: string): Array<string> {
    if (!dimension) {
      return [];
    }

    return this.listAllDimensionClasses(dimension).map(
      (unit: UnitType) => unit.annotation!
    );
  }

  public listAllUomByQuantityType(type: string): Array<string> {
    if (!type) {
      return [];
    }

    return this.listAllQuantityTypes(type).map(
      (unit: UnitType) => unit.annotation!
    );
  }

  public convert_units(
    from: string,
    value: number,
    to: string
  ): UnitsConverted | null {
    if (!from || !value || !to) {
      return null;
    }

    return this.convert(from, value, to);
  }
}
