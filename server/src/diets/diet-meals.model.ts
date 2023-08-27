
import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Product} from "../products/products.model";
import {Diets} from "./diets.model";
import {Meals} from "../meals/meals.model";

@Table({tableName: 'diet_meals', createdAt: false, updatedAt: false})
export class DietMeals extends Model<DietMeals> {
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => Meals)
    @Column({type: DataType.INTEGER})
    mealId: number;

    @ForeignKey(() => Diets)
    @Column({type: DataType.INTEGER})
    dietId: number;


}