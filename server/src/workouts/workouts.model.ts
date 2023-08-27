import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {WorkoutTypes} from "../workoutsTypes/workoutTypes.model";
import {WorkoutProgram} from "../workoutPrograms/workoutProgram.model";
import {WorkoutProgramWorkouts} from "../workoutPrograms/workoutProgram-workouts,model";

interface WorkoutsCreationAttributes {
    title: string;
    instruction: string;
    time: number;
    image?: string;

}

@Table({tableName: 'workouts'})
export class Workouts extends Model<Workouts, WorkoutsCreationAttributes> {

    @Column({type: DataType.INTEGER, allowNull: false, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING})
    instruction: string;

    @Column({type: DataType.STRING})
    image: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    time: number;

    @Column({type: DataType.INTEGER})
    calorieBurning: number;

    @Column({type: DataType.INTEGER})
    @ForeignKey(() => WorkoutTypes)
    typeId: number;

    @BelongsTo(() => WorkoutTypes)
    type: WorkoutTypes;

    @BelongsToMany(() => WorkoutProgram, () => WorkoutProgramWorkouts)
    workoutPrograms: WorkoutProgram[];
}