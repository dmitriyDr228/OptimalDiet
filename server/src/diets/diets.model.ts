import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Meals} from "../meals/meals.model";
import {DietMeals} from "./diet-meals.model";
import {User} from "../users/users.model";
import {DietUser} from "./diet-user.model";

interface DietsCreator {
    title: string;
    calories: number;
    image: string;
    meals?: Meals[];
}

@Table({tableName: 'diets'})
export class Diets extends Model<Diets, DietsCreator> {

    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    calories: number;

    @Column({type: DataType.STRING})
    image: string;

    @BelongsToMany(() => Meals, () => DietMeals)
    meals: Meals[];

    @BelongsToMany(() => User, () => DietUser)
    users: User[];
}