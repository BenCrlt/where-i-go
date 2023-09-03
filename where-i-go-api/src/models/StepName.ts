import { prisma } from "..";
import { builder } from "../builder";
import { Language, PrismaClient } from "@prisma/client";

const StepNameGQL = builder.prismaObject("StepName", {
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    language: t.expose("language", { type: Language }),
  }),
});

builder.mutationField("createOrUpdateStepName", (t) =>
  t.field({
    type: StepNameGQL,
    args: {
      stepId: t.arg.string({ required: true }),
      language: t.arg({ type: Language, required: true }),
      name: t.arg.string({ required: true }),
    },
    resolve: (root, { stepId, language, name }) =>
      createOrUpdateStepName(prisma, { stepId, language, name }),
  })
);

interface CreateOrUpdateStepNameInput {
  stepId: string;
  language: Language;
  name: string;
}

async function createOrUpdateStepName(
  db: PrismaClient,
  { stepId, language, name }: CreateOrUpdateStepNameInput
) {
  const stepName = await db.stepName.findUnique({
    where: {
      stepId_language: {
        stepId,
        language,
      },
    },
  });

  if (stepName) {
    return db.stepName.update({
      where: {
        id: stepName.id,
      },
      data: {
        name,
      },
    });
  }

  return db.stepName.create({
    data: {
      stepId,
      name,
      language,
    },
  });
}
