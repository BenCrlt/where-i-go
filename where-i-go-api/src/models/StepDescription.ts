import { prisma } from "..";
import { builder } from "../builder";
import { Language, PrismaClient } from "@prisma/client";

const StepDescriptionGQL = builder.prismaObject("StepDescription", {
  fields: (t) => ({
    id: t.exposeID("id"),
    description: t.exposeString("description"),
    language: t.expose("language", { type: Language }),
  }),
});

builder.mutationField("createOrUpdateStepDescription", (t) =>
  t.field({
    type: StepDescriptionGQL,
    args: {
      stepId: t.arg.string({ required: true }),
      language: t.arg({ type: Language, required: true }),
      description: t.arg.string({ required: true }),
    },
    resolve: (root, { stepId, language, description }) =>
      createOrUpdateStepDescription(prisma, { stepId, language, description }),
  })
);

interface CreateOrUpdateStepDescriptionInput {
  stepId: string;
  language: Language;
  description: string;
}

async function createOrUpdateStepDescription(
  db: PrismaClient,
  { stepId, language, description }: CreateOrUpdateStepDescriptionInput
) {
  const stepDescription = await db.stepDescription.findUnique({
    where: {
      stepId_language: {
        stepId,
        language,
      },
    },
  });

  if (stepDescription) {
    return db.stepDescription.update({
      where: {
        id: stepDescription.id,
      },
      data: {
        description,
      },
    });
  }

  return db.stepDescription.create({
    data: {
      stepId,
      description,
      language,
    },
  });
}
