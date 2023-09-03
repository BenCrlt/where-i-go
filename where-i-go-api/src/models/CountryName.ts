import { CountryName, Language, PrismaClient } from "@prisma/client";
import { builder } from "../builder";
import { prisma } from "..";

const CountryNameGQL = builder.prismaObject("CountryName", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    language: t.expose("language", { type: Language }),
  }),
});

builder.mutationField("createOrUpdateCountryName", (t) =>
  t.field({
    type: CountryNameGQL,
    args: {
      countryId: t.arg.string({ required: true }),
      language: t.arg({ type: Language, required: true }),
      name: t.arg.string({ required: true }),
    },
    resolve: (root, { countryId, language, name }) =>
      createOrUpdateCountryName(prisma, countryId, language, name),
  })
);

async function createOrUpdateCountryName(
  db: PrismaClient,
  countryId: string,
  language: Language,
  name: string
): Promise<CountryName> {
  const countryName = await db.countryName.findUnique({
    where: {
      countryId_language: {
        countryId,
        language,
      },
    },
  });

  if (countryName) {
    return db.countryName.update({
      where: {
        id: countryName.id,
      },
      data: {
        name,
      },
    });
  }

  return db.countryName.create({
    data: {
      countryId,
      name,
      language,
    },
  });
}
