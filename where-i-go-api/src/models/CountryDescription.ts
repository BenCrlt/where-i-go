import { builder } from "../builder";

builder.prismaObject("CountryDescription", {
  fields: (t) => ({
    id: t.exposeID("id"),
    description: t.exposeString("description"),
    language: t.exposeString("language"),
  }),
});
