import { builder } from "./builder";
import "./models/Country";
import "./models/CountryDescription";
import "./models/CountryName";

builder.mutationType({});
builder.queryType({});

export const schema = builder.toSchema({});
