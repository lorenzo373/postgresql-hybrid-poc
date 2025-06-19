import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1750253020290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create extension for uuid
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Create dossiers table
    await queryRunner.query(`
      CREATE TABLE dossiers (
        uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        external_id VARCHAR(1024) NOT NULL,
        chain_type VARCHAR(255) NOT NULL,
        dicipline VARCHAR(255) NOT NULL,
        contractor VARCHAR(255) NOT NULL,
        data JSONB NOT NULL
      )
    `);

    // Create dossiers_gvrn view
    await queryRunner.query(`
      CREATE VIEW dossiers_gvrn AS
      SELECT *, data->>'name' as name, data->>'description' as description, data->>'execution_date' as execution_date, data->>'status_code' as status_code, data->>'status_description' as status_description
      FROM dossiers WHERE chain_type = 'gvrn'
    `);

    // Create dossiers_kv view
    await queryRunner.query(`
      CREATE VIEW dossiers_kv AS
      SELECT *, data->>'team' as team, data->>'project_number' as project_number, data->>'rds_coordinates' as rds_coordinates, data->>'expected_start_date' as expected_start_date
      FROM dossiers WHERE chain_type = 'kv'
    `);

    // Create assignments table
    await queryRunner.query(`
      CREATE TABLE assignments (
        uuid UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        dossier_uuid UUID NOT NULL,
        CONSTRAINT fk_assignments_dossiers FOREIGN KEY (dossier_uuid) REFERENCES dossiers(uuid)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW dossiers_gvrn`);
    await queryRunner.query(`DROP VIEW dossiers_kv`);
    await queryRunner.query(`DROP TABLE dossiers`);
    await queryRunner.query(`DROP TABLE assignments`);
  }
}
