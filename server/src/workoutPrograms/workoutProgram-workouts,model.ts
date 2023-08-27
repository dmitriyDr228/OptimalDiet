import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Workouts} from "../workouts/workouts.model";
import {WorkoutProgram} from "./workoutProgram.model";

@Table({tableName: 'workoutPrograms_workouts', updatedAt: false, createdAt: false})
export class WorkoutProgramWorkouts extends Model<WorkoutProgramWorkouts> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ForeignKey(() => Workouts)
    @Column({type: DataType.INTEGER})
    workoutId: number;

    @ForeignKey(() => WorkoutProgram)
    @Column({type: DataType.INTEGER})
    workoutProgramId: number;
}