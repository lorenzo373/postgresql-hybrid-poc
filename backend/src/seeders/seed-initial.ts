import { DataSource, DeepPartial, IsNull, Not } from "typeorm";
import { Dossier } from "../models/Dossier";
import { Assignment } from "../models/Assignment";

export default async function seedInitial(dataSource: DataSource) {
  // Clear all assignments and dossiers
  await dataSource.query(`
    TRUNCATE TABLE dossiers CASCADE;
  `);

  // Create dossiers
  const dossiers: DeepPartial<Dossier>[] = [
    {
      externalId: "1234567890",
      chainType: "gvrn",
      dicipline: "elektra",
      contractor: "Lutje B.V.",
      data: {
        name: "Dossier 1",
        description: "Dossier 1 description",
        execution_date: new Date(),
        status_code: 55,
        status_description: "In behandeling",
      },
    },
    {
      externalId: "1234567891",
      chainType: "gvrn",
      dicipline: "elektra",
      contractor: "Lutje B.V.",
      data: {
        name: "Dossier 2",
        description: "Dossier 2 description",
        execution_date: new Date(),
        status_code: 65,
        status_description: "Afgerond",
      },
    },
    {
      externalId: "1234567892",
      chainType: "kv",
      dicipline: "gas",
      contractor: "Lotje B.V.",
      data: {
        team: "Team 1",
        project_number: 2849,
        rds_coordinates: {
          x: 100,
          y: 100,
          z: 100,
        },
        expected_start_date: new Date(),
      },
    },
    {
      externalId: "1234567893",
      chainType: "kv",
      dicipline: "elektra",
      contractor: "Lotje B.V.",
      data: {
        team: "Team 2",
        project_number: 2850,
        rds_coordinates: {
          x: 100,
          y: 100,
          z: 100,
        },
        expected_start_date: new Date(),
      },
    },
  ];

  await dataSource.getRepository(Dossier).save(dossiers);

  // Create assignments
  const gvrnDossier = await dataSource.getRepository(Dossier).findOne({
    where: {
      externalId: "1234567890",
    },
  });
  const kvDossier = await dataSource.getRepository(Dossier).findOne({
    where: {
      externalId: "1234567892",
    },
  });

  const assignments = [
    {
      dossierUuid: gvrnDossier.uuid,
    },
    {
      dossierUuid: kvDossier.uuid,
    },
  ];

  await dataSource.getRepository(Assignment).save(assignments);
}