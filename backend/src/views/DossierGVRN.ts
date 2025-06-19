import { ViewEntity, ViewColumn, OneToMany, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Assignment } from "../models/Assignment";
import { Dossier } from "../models/Dossier";


@ViewEntity({
    name: "dossiers_gvrn",
})
export class DossierGVRN {
    @ViewColumn()
    @PrimaryGeneratedColumn()
    uuid: string;

    @ViewColumn({ name: "external_id" })
    caseId: string;

    @ViewColumn()
    contractor: string;

    @ViewColumn()
    dicipline: string;

    @ViewColumn()
    name: string;

    @ViewColumn()
    description: string;

    @ViewColumn({ name: "execution_date" })
    executionDate: Date;

    @ViewColumn({ name: "status_code" })
    statusCode: number;

    @ViewColumn({ name: "status_description" })
    statusDescription: string;

    @OneToMany(() => Assignment, (assignment) => assignment.dossierGVRN)
    assignments: Assignment[];

    @OneToOne(() => Dossier, (dossier) => dossier.dossierGVRN)
    dossier: Dossier;
}