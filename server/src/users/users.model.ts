import {BelongsToMany, Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Post} from "../posts/post.model";
import {Diets} from "../diets/diets.model";
import {DietUser} from "../diets/diet-user.model";
import {Property} from "../property/property.model";
import {WorkoutProgram} from "../workoutPrograms/workoutProgram.model";
import {UserWorkoutProgram} from "../workoutPrograms/userWorkoutProgram.model";

interface userCreationAttribute {
    email: string;
    password: string;

}

@Table({tableName: 'users'})
export class User extends Model<User, userCreationAttribute> {
    @ApiProperty({example: '1', description: 'ID пользователя'})
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number;
    @ApiProperty({example: 'user@email.com', description: 'Email пользователя'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    @ApiProperty({example: '123123', description: 'Пароль пользователя'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
    @ApiProperty({example: 'true', description: 'Забанен ли пользователь'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;
    @ApiProperty({example: 'За хулиганство', description: 'Причина бана пользователя'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Post)
    posts: Post[];

    @HasOne(() => Property)
    property: Property;

    @BelongsToMany(() => Diets, () => DietUser)
    diets: Diets[];

    @BelongsToMany(() => WorkoutProgram, () => UserWorkoutProgram)
    workoutPrograms: WorkoutProgram[];
}