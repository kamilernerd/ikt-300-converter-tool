export interface UnitType {
  id: string;
  annotation: string;
  Name: string;
  QuantityType?: Array<null | string> | string;
  DimensionalClass?: string;
  SameUnit?: SameUnitElement[] | SameUnitElement;
  CatalogName: CatalogName;
  CatalogSymbol: CatalogSymbol;
  BaseUnit?: BaseUnit | null;
  Deprecated?: string;
  ConversionToBaseUnit?: ConversionToBaseUnit;
}

export interface BaseUnit {
  BasicAuthority?: CatalogName;
  Description?: string;
}

export enum CatalogName {
  API = "API",
  Posc = "POSC",
  Si = "SI",
  Witsml = "WITSML",
}

export interface CatalogSymbol {
  isExplicit: string;
  text: string;
}

export interface ConversionToBaseUnit {
  baseUnit: string;
  Factor?: string;
  Fraction?: Fraction;
  Formula?: Formula;
}

export interface Formula {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface Fraction {
  Numerator: string;
  Denominator: string;
}

export interface SameUnitElement {
  uom: string;
  namingSystem: NamingSystem;
}

export enum NamingSystem {
  Empty = "",
  Posc = "POSC",
  Rp66 = "RP66",
  Witsml = "WITSML",
  WitsmlRp66 = "WITSML/RP66",
}
