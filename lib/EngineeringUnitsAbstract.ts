import { UnitType } from "./types.ts";

export type UnitsConverted = {
  uom: string;
  annotation: string;
  value: number;
};

export default abstract class EngineeringUnitsAbstract<T extends UnitType> {
  private units: Array<T> = [];

  protected hasUnit(annotation: string): boolean {
    if (!annotation) {
      new Error("Invalid parameter value!");
    }

    const hasKey = this.getUnits().find(
      (k: UnitType | undefined) => k && k.annotation === annotation
    );

    if (!hasKey) {
      return false;
    }
    return true;
  }

  protected setUnits<K extends T>(units: Array<K>): void {
    if (!units) {
      new Error("Invalid parameter value!");
    }

    this.units = units;
  }

  protected getUnits(): Array<UnitType> {
    return this.units;
  }

  protected getUnit(annotation: string): UnitType | null {
    if (!annotation) {
      new Error("Invalid parameter value!");
    }

    const unit = this.getUnits().find(
      (k: UnitType) => k.annotation === annotation
    );
    if (!unit) {
      return null;
    }
    return unit;
  }

  protected appendUnit(unit: T): void {
    if (!unit) {
      new Error("Invalid parameter value!");
    }

    this.units.push(unit);
  }

  protected removeUnit(id: string): void {
    if (!id) {
      new Error("Invalid parameter value!");
    }

    const itemIndex = this.units.findIndex((k: T) => k.id === id);
    this.units.splice(itemIndex, 1);
  }

  protected convert(
    from: string,
    value: number,
    to: string
  ): UnitsConverted | null {
    if (!from || !value || !to) {
      return null;
    }

    if (!this.hasUnit(from) || !this.hasUnit(to)) {
      return null;
    }

    const unitFrom = this.getUnit(from);
    const unitTo = this.getUnit(to);

    const conversionToBaseUnit = (
      a: number,
      b: number,
      c: number,
      d: number,
      x: number
    ) => {
      return (a + b * x) / (c + d * x);
    };

    const conversionToBaseUnitInverted = (
      a: number,
      b: number,
      c: number,
      d: number,
      y: number
    ) => {
      return (a - c * y) / (d * y - b);
    };

    const doConvertion = (
      unitFrom: UnitType,
      unitTo: UnitType,
      x: number
    ): UnitsConverted | null => {
      let baseUnitFrom = 0;
      let baseUnitTo = 0;

      if (unitFrom.ConversionToBaseUnit) {
        if (unitFrom.ConversionToBaseUnit.Factor) {
          baseUnitFrom = conversionToBaseUnit(
            0,
            Number(unitFrom.ConversionToBaseUnit.Factor),
            1,
            0,
            x
          );
        } else if (unitFrom.ConversionToBaseUnit.Fraction) {
          baseUnitFrom = conversionToBaseUnit(
            0,
            Number(unitFrom?.ConversionToBaseUnit?.Fraction!.Numerator),
            Number(unitFrom?.ConversionToBaseUnit?.Fraction!.Denominator),
            0,
            x
          );
        } else if (unitFrom.ConversionToBaseUnit.Formula) {
          baseUnitFrom = conversionToBaseUnit(
            Number(unitFrom?.ConversionToBaseUnit?.Formula.A),
            Number(unitFrom?.ConversionToBaseUnit?.Formula.B),
            Number(unitFrom?.ConversionToBaseUnit?.Formula.C),
            Number(unitFrom?.ConversionToBaseUnit?.Formula.D),
            x
          );
        }
      } else {
        if (!unitFrom?.ConversionToBaseUnit) {
          baseUnitFrom = x;
        }
      }

      if (unitTo.ConversionToBaseUnit) {
        if (unitTo.ConversionToBaseUnit.Factor) {
          baseUnitTo = conversionToBaseUnitInverted(
            0,
            Number(unitTo.ConversionToBaseUnit.Factor),
            1,
            0,
            baseUnitFrom
          );
        } else if (unitTo.ConversionToBaseUnit.Fraction) {
          baseUnitTo = conversionToBaseUnitInverted(
            0,
            Number(unitTo?.ConversionToBaseUnit?.Fraction!.Numerator),
            Number(unitTo?.ConversionToBaseUnit?.Fraction!.Denominator),
            0,
            baseUnitFrom
          );
        } else if (unitTo.ConversionToBaseUnit.Formula) {
          baseUnitTo = conversionToBaseUnitInverted(
            Number(unitTo?.ConversionToBaseUnit?.Formula.A),
            Number(unitTo?.ConversionToBaseUnit?.Formula.B),
            Number(unitTo?.ConversionToBaseUnit?.Formula.C),
            Number(unitTo?.ConversionToBaseUnit?.Formula.D),
            baseUnitFrom
          );
        }
      } else {
        if (!unitTo?.ConversionToBaseUnit) {
          baseUnitTo = baseUnitFrom * 1;
        }
      }

      return {
        uom: unitTo.Name,
        annotation: unitTo.annotation,
        value: baseUnitTo,
      };
    };

    return doConvertion(unitFrom!, unitTo!, value);
  }
}
