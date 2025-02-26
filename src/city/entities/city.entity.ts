import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'city' })
export class CityEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'state_id', nullable: false })
    stateId: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
};