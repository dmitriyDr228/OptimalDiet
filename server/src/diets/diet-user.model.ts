
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Product} from "../products/products.model";
import {Diets} from "./diets.model";
import {Meals} from "../meals/meals.model";
import {User} from "../users/users.model";

@Table({tableName: 'diet_users', createdAt: false, updatedAt: false})
export class DietUser extends Model<DietUser> {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Diets)
    @Column({type: DataType.INTEGER})
    dietId: number;


}