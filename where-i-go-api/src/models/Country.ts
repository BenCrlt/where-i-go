import { Country, PrismaClient, Language } from "@prisma/client";
import { prisma } from "..";
import { builder } from "../builder";

builder.enumType(Language, {
  name: "Language",
});

const CountryGQL = builder.prismaObject("Country", {
  fields: (t) => ({
    id: t.exposeID("id"),
    names: t.relation("CountryName"),
    descriptions: t.relation("CountryDescription"),
  }),
});

builder.queryField("countries", (t) =>
  t.prismaField({
    type: ["Country"],
    resolve: () => getAllCountries(prisma),
  })
);

async function getAllCountries(db: PrismaClient): Promise<Country[]> {
  return db.country.findMany({
    include: {
      CountryName: true,
      CountryDescription: true,
      Step: true,
    },
  });
}

builder.queryField("country", (t) =>
  t.prismaField({
    type: "Country",
    args: {
      id: t.arg.string({ required: true }),
    },
    resolve: async (query, root, args, ctx, info) => {
      return prisma.country.findUniqueOrThrow({
        where: { id: args.id },
        include: {
          CountryName: true,
          CountryDescription: true,
          Step: true,
        },
      });
    },
  })
);

const CreateCountryInput = builder.inputType("CreateCountryInput", {
  fields: (t) => ({
    language: t.field({
      type: Language,
      required: true,
    }),
    name: t.string({
      required: true,
    }),
    description: t.string({
      required: true,
    }),
  }),
});

builder.mutationField("createCountry", (t) =>
  t.field({
    type: CountryGQL,
    args: {
      input: t.arg({ type: CreateCountryInput, required: true }),
    },
    resolve: (root, { input }) =>
      createCountry(prisma, input.language, input.name, input.description),
  })
);

async function createCountry(
  db: PrismaClient,
  language: Language,
  name: string,
  description: string
): Promise<Country> {
  return db.country.create({
    data: {
      CountryDescription: {
        create: {
          language,
          description,
        },
      },
      CountryName: {
        create: {
          language,
          name,
        },
      },
    },
  });
}
