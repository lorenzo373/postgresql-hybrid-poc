import "reflect-metadata";
import { DataSource } from "typeorm";
import express from "express";

import { Init1750253020290 } from "./migrations/1750253020290-Init";

import { Dossier } from "./models/Dossier";
import { Assignment } from "./models/Assignment";
import { DossierGVRN } from "./views/DossierGVRN";
import { DossierKV } from "./views/DossierKV";

import seedInitial from "./seeders/seed-initial";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost", // Run locally
  // host: "postgres", // Run in docker
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "postgres",
  logging: true,
  migrations: [Init1750253020290],
  migrationsRun: true,
  entities: [Dossier, DossierGVRN, DossierKV, Assignment],
});

const app = express();

app.get("/dossiers", async (req, res) => {
  const dossiers = await AppDataSource.getRepository(Dossier).find();
  res.json(dossiers);
});

app.get("/dossiers/filter", async (req, res) => {
  const { statusCode, team } = req.query;
  const dossiers = await AppDataSource.getRepository(Dossier).find({
    where: {
      dossierGVRN: {
        statusCode,
      },
      dossierKV: {
        team,
      },
    },
  });
  res.json(dossiers);
});

app.get("/dossiers/gvrn", async (req, res) => {
  const dossiers = await AppDataSource.getRepository(DossierGVRN).find();
  res.json(dossiers);
});

app.get("/dossiers/gvrn/filter", async (req, res) => {
  const { statusCode } = req.query;
  const dossiers = await AppDataSource.getRepository(DossierGVRN).find({
    where: { statusCode },
  });
  res.json(dossiers);
});

app.get("/dossiers/kv", async (req, res) => {
  const dossiers = await AppDataSource.getRepository(DossierKV).find();
  res.json(dossiers);
});

app.get("/assignments", async (req, res) => {
  const assignments = await AppDataSource.getRepository(Assignment).find({
    relations: ["dossier", "dossierGVRN", "dossierKV"],
  });
  res.json(assignments);
});

AppDataSource.initialize().then(async () => {
  // Run seeder
  console.log("Running seeder");
  await seedInitial(AppDataSource);
  console.log("Seeder finished");

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}).catch((error) => {
  console.error("Error initializing database:", error);
});
