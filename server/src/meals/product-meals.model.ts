import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Meals} from "./meals.model";
import {Product} from "../products/products.model";

@Table({tableName: 'product_meals', createdAt: false, updatedAt: false})
export class ProductMeals extends Model<ProductMeals> {

    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @ForeignKey(() => Meals)
    @Column({type: DataType.INTEGER})
    mealId: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER})
    productId: number;


}