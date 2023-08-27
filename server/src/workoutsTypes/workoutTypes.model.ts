import {Column, DataType, Model, Table} from "sequelize-typescript";

interface WorkoutTypesCreateAttributes {
    value: string;
    description: string;
}


@Table({tableName: 'workoutTypes'})
export class WorkoutTypes extends Model<WorkoutTypes, WorkoutTypesCreateAttributes> {

    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @Column({type: DataType.DOUBLE })
    burnFactor: number;

}