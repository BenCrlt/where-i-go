import { Language } from "@prisma/client";
import { builder } from "../builder";

builder.prismaObject("CountryName", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    language: t.expose("language", { type: Language }),
  }),
});
