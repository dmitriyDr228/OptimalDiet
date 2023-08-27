import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Meals} from "../meals/meals.model";
import {ProductMeals} from "../meals/product-meals.model";

interface ProductCreator {
    title: string;
    calories: number;
    image: string;

}

@Table({tableName: 'products'})
export class Product extends Model<Product, ProductCreator> {

    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    calories: number;

    @Column({type: DataType.STRING})
    image: string;

    @BelongsToMany(() => Meals, () => ProductMeals)
    meals: Meals[]
}