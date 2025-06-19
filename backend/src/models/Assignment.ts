import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Dossier } from "./Dossier";
import { DossierKV } from "../views/DossierKV";
import { DossierGVRN } from "../views/DossierGVRN";

@Entity('assignments')
export class Assignment {
    @PrimaryGeneratedColumn()
    uuid: string;

    @Column({ name: "dossier_uuid" })
    dossierUuid: string;

    @ManyToOne(() => Dossier, (dossier) => dossier.assignments)
    @JoinColumn({ name: "dossier_uuid" })
    dossier: Dossier;

    // DossierGVRN
    @ManyToOne(() => DossierGVRN, (dossierGVRN) => dossierGVRN.assignments)
    @JoinColumn({ name: "dossier_uuid" })
    dossierGVRN: DossierGVRN;

    // DossierKV
    @ManyToOne(() => DossierKV, (dossierKV) => dossierKV.assignments)
    @JoinColumn({ name: "dossier_uuid" })
    dossierKV: DossierKV;
}