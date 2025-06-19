import { ViewEntity, ViewColumn, OneToMany, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Assignment } from "../models/Assignment";
import { Dossier } from "../models/Dossier";

@ViewEntity({
    name: "dossiers_kv",
})
export class DossierKV {
    @ViewColumn()
    @PrimaryGeneratedColumn()
    uuid: string;

    @ViewColumn({ name: "external_id" })
    externalId: string;

    @ViewColumn()
    contractor: string;

    @ViewColumn()
    dicipline: string;

    @ViewColumn()
    team: string;

    @ViewColumn({ name: "project_number" })
    projectNumber: number;

    @ViewColumn({ name: "rds_coordinates" })
    rdsCoordinates: {
        x: number;
        y: number;
        z: number;
    };

    @ViewColumn({ name: "expected_start_date" })
    expectedStartDate: Date;

    @OneToMany(() => Assignment, (assignment) => assignment.dossierKV)
    assignments: Assignment[];

    @OneToOne(() => Dossier, (dossier) => dossier.dossierKV)
    dossier: Dossier;
}