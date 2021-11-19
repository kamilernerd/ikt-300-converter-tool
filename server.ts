import {
  opine,
  json,
  Request,
  Response,
} from "https://deno.land/x/opine@1.9.1/mod.ts";
import EngineeringUnitsSingleton from "./EngineeringUnitsSingleton.ts";
import { UnitsConverted } from "./lib/EngineeringUnitsAbstract.ts";
import { UnitType } from "./lib/types.ts";

const app = opine();

app.use(json());

app.get("/listAllUomByQuantityType", function (req: Request, res: Response) {
  const { type } = req.body;

  const conversion: string[] | null =
    EngineeringUnitsSingleton.getInstance().listAllUomByQuantityType(type);

  if (!conversion) {
    res.send(null);
  }

  res.json(conversion);
});

app.get("/listAllUomByClass", function (req: Request, res: Response) {
  const { dimension } = req.body;

  const conversion: string[] | null =
    EngineeringUnitsSingleton.getInstance().listAllUomByClass(dimension);

  if (!conversion) {
    res.send(null);
  }

  res.json(conversion);
});

app.get("/listAllQuantityTypes", function (req: Request, res: Response) {
  const { type } = req.body;

  const conversion: UnitType[] | null =
    EngineeringUnitsSingleton.getInstance().listAllQuantityTypes(type);

  if (!conversion) {
    res.send(null);
  }

  res.json(conversion);
});

app.get("/listAllDimensionClasses", function (req: Request, res: Response) {
  const { dimension } = req.body;

  const conversion: UnitType[] | null =
    EngineeringUnitsSingleton.getInstance().listAllDimensionClasses(dimension);

  if (!conversion) {
    res.send(null);
  }

  res.json(conversion);
});

app.get("/convert", function (req: Request, res: Response) {
  const { from, value, to } = req.body;

  const conversion: UnitsConverted | null =
    EngineeringUnitsSingleton.getInstance().convert_units(from, value, to);

  if (!conversion) {
    res.send(null);
  }

  res.json({
    uom: conversion?.uom,
    annotation: conversion?.annotation,
    value: conversion?.value,
  });
});

app.listen(3000, () =>
  console.log("server has started on http://localhost:3000 🚀")
);
