import {Module} from "@nestjs/common";
import {MealsService} from "./meals.service";
import {MealsController} from "./meals.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Meals} from "./meals.model";
import {FileModule} from "../files/file.module";
import {ProductsModule} from "../products/products.module";
import {Product} from "../products/products.model";
import {ProductMeals} from "./product-meals.model";
import {Diets} from "../diets/diets.model";
import {DietMeals} from "../diets/diet-meals.model";
import {DietsService} from "../diets/diets.service";

@Module({
    exports: [MealsService],
    imports: [
        SequelizeModule.forFeature([Meals, Product, ProductMeals]),
        FileModule,
        ProductsModule,
    ],
    controllers: [MealsController],
    providers: [
        MealsService
    ]
})
export class MealsModule {

}