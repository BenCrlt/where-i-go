import { prisma } from "..";
import { builder } from "../builder";

builder.prismaObject("Country", {
  fields: (t) => ({
    id: t.exposeID("id"),
    names: t.relation("CountryName"),
    descriptions: t.relation("CountryDescription"),
  }),
});

builder.queryField("countries", (t) =>
  t.prismaField({
    type: ["Country"],
    resolve: async (query, root, args, ctx, info) => {
      return prisma.country.findMany({ ...query });
    },
  })
);
