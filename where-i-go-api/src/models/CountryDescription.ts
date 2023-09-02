import { Language } from "@prisma/client";
import { builder } from "../builder";

builder.prismaObject("CountryDescription", {
  fields: (t) => ({
    id: t.exposeID("id"),
    description: t.exposeString("description"),
    language: t.expose("language", { type: Language }),
  }),
});
