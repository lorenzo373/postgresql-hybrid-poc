import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany, OneToOne, JoinColumn } from "typeorm"
import { Assignment } from "./Assignment";
import { DossierGVRN } from "../views/DossierGVRN";
import { DossierKV } from "../views/DossierKV";

@Entity('dossiers')
export class Dossier {
    @PrimaryGeneratedColumn()
    uuid: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
    updatedAt: Date;

    @Column({ name: "external_id", length: 1024 })
    externalId: string;

    @Column({ name: "chain_type", length: 255 })
    chainType: string;

    @Column({ length: 255 })
    dicipline: string;

    @Column({ length: 255 })
    contractor: string;

    @Column({ type: 'jsonb' })
    data: Record<string, any>;

    @OneToMany(() => Assignment, (assignment) => assignment.dossier, { cascade: true, eager: true })
    assignments: Assignment[];

    @OneToOne(() => DossierKV, (dossierKV) => dossierKV.dossier)
    @JoinColumn({ name: "uuid", referencedColumnName: "uuid" })
    dossierKV: DossierKV;

    @OneToOne(() => DossierGVRN, (dossierGVRN) => dossierGVRN.dossier)
    @JoinColumn({ name: "uuid", referencedColumnName: "uuid" })
    dossierGVRN: DossierGVRN;
}
