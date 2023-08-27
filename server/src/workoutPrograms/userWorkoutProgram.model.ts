import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {WorkoutProgram} from "./workoutProgram.model";


@Table({tableName: 'user_workoutPrograms', updatedAt: false, createdAt: false})
export class UserWorkoutProgram extends Model<UserWorkoutProgram> {

    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type:DataType.INTEGER})
    userId: number;

    @ForeignKey(()=>WorkoutProgram)
    @Column({type:DataType.INTEGER})
    workoutProgramId: number;

}
