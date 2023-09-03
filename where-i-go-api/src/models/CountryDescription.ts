import { Language, PrismaClient, CountryDescription } from "@prisma/client";
import { builder } from "../builder";
import { prisma } from "..";

const CountryDescriptionGQL = builder.prismaObject("CountryDescription", {
  fields: (t) => ({
    id: t.exposeID("id"),
    description: t.exposeString("description"),
    language: t.expose("language", { type: Language }),
  }),
});

builder.mutationField("createOrUpdateDescriptionCoutry", (t) =>
  t.field({
    type: CountryDescriptionGQL,
    args: {
      countryId: t.arg.string({ required: true }),
      language: t.arg({ type: Language, required: true }),
      description: t.arg.string({ required: true }),
    },
    resolve: (root, { countryId, language, description }) =>
      createOrUpdateDescriptionCountry(
        prisma,
        countryId,
        language,
        description
      ),
  })
);

async function createOrUpdateDescriptionCountry(
  db: PrismaClient,
  countryId: string,
  language: Language,
  description: string
): Promise<CountryDescription> {
  const countryDescription = await db.countryDescription.findUnique({
    where: {
      countryId_language: {
        countryId,
        language,
      },
    },
  });

  if (countryDescription) {
    return db.countryDescription.update({
      where: {
        id: countryDescription.id,
      },
      data: {
        description,
      },
    });
  }
  return db.countryDescription.create({
    data: {
      description,
      language,
      countryId,
    },
  });
}
