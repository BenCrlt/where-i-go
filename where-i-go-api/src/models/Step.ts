import { prisma } from "..";
import { builder } from "../builder";
import { Language, PrismaClient, Step, StepType } from "@prisma/client";

const StepGQL = builder.prismaObject("Step", {
  fields: (t) => ({
    id: t.exposeID("id"),
    type: t.expose("type", { type: StepType }),
    names: t.relation("StepName"),
    descriptions: t.relation("StepDescription"),
  }),
});

builder.mutationField("createStep", (t) =>
  t.field({
    type: StepGQL,
    args: {
      countryId: t.arg.string({ required: true }),
      type: t.arg({ type: StepType, required: true }),
      language: t.arg({ type: Language, required: true }),
      name: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
    },
    resolve: (root, args) => createStep(prisma, args),
  })
);

interface CreateStepInput {
  countryId: string;
  type: StepType;
  language: Language;
  name: string;
  description: string;
}

async function createStep(
  db: PrismaClient,
  { countryId, description, language, name, type }: CreateStepInput
): Promise<Step> {
  return db.step.create({
    data: {
      countryId,
      type,
      StepName: {
        create: {
          name,
          language,
        },
      },
      StepDescription: {
        create: {
          description,
          language,
        },
      },
    },
  });
}
