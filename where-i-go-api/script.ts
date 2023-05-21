import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    console.log(await prisma.country.findMany());
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })