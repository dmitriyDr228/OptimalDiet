import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

interface PropertyCreationAttributes {
    weight: number;
    height: number;
    calories: number;
}

@Table({tableName: 'user_property'})
export class Property extends Model<Property, PropertyCreationAttributes> {

    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    id: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    weight: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    calories: number;

    @Column({type: DataType.INTEGER, allowNull: false})
    height: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @Column({type: DataType.INTEGER})
    activity: number;


}