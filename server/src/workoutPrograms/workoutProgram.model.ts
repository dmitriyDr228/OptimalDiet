import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Workouts} from "../workouts/workouts.model";
import {WorkoutProgramWorkouts} from "./workoutProgram-workouts,model";
import {User} from "../users/users.model";
import {UserWorkoutProgram} from "./userWorkoutProgram.model";

interface WorkoutProgramCreateAttributes {
    title: string;
    description: string;
    image?: string;
}

@Table({tableName: 'workoutProgram'})
export class WorkoutProgram extends Model<WorkoutProgram, WorkoutProgramCreateAttributes> {

    @Column({type: DataType.INTEGER, allowNull: false, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false, unique: true})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @Column({type: DataType.STRING})
    image: string;

    @Column({type: DataType.DOUBLE})
    time: number;

    @Column({type: DataType.DOUBLE})
    burnedCalories: number;

    @BelongsToMany(() => Workouts, () => WorkoutProgramWorkouts)
    workouts: Workouts[]

    @BelongsToMany(() => User, () => UserWorkoutProgram)
    users: User[]
}