import { prisma } from "../prisma";
import { chefSeeder } from "./chef-seeder";

const databaseSeeder = {
  chefSeeder,
};

type SeederName = keyof typeof databaseSeeder;

async function main() {
  const seederName = process.argv[2];
  if (seederName === undefined) {
    for (const [name, seeder] of Object.entries(databaseSeeder)) {
      console.log(`Seeding: ${name}`);
      await seeder();
    }
    return;
  }

  if (seederName in databaseSeeder) {
    const seeder = databaseSeeder[seederName as SeederName];
    console.log(`Seeding: ${seederName}`);
    await seeder();
    return;
  }

  console.error("Error: シーダー名が正しくありません");
  process.exit(1);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
