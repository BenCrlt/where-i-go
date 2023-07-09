import { builder } from "../builder";

builder.prismaObject("CountryName", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    language: t.exposeString("language"),
  }),
});
