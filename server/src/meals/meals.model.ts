import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Product} from "../products/products.model";
import {ProductMeals} from "./product-meals.model";
import {Diets} from "../diets/diets.model";
import {DietMeals} from "../diets/diet-meals.model";

interface MealsCreator {
    title: string;
    image: string;
    products?: any[];
}

@Table({tableName: 'meals'})
export class Meals extends Model<Meals, MealsCreator> {

    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @BelongsToMany(() => Product, () => ProductMeals)
    products: Product[];

    @Column({type: DataType.STRING})
    image: string;

    @Column({type: DataType.STRING, allowNull: true})
    description: string;

    @BelongsToMany(() => Diets, () => DietMeals)
    Diets?: Diets[];

}