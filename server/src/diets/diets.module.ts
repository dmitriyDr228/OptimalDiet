import {forwardRef, Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Meals} from "../meals/meals.model";
import {FileModule} from "../files/file.module";
import {DietsService} from "./diets.service";
import {Diets} from "./diets.model";
import {DietMeals} from "./diet-meals.model";
import {DietsController} from "./diets.controller";
import {MealsModule} from "../meals/meals.module";
import {User} from "../users/users.model";
import {DietUser} from "./diet-user.model";
import {UsersModule} from "../users/users.module";
import {Product} from "../products/products.model";
import {ProductMeals} from "../meals/product-meals.model";
import {ProductsModule} from "../products/products.module";
import {JwtService} from "@nestjs/jwt";
import {AuthModule} from "../auth/auth.module";

@Module({
    exports: [DietsService],
    imports: [
        SequelizeModule.forFeature([Meals, Diets, DietMeals, User, DietUser, Product, ProductMeals]),
        FileModule,
        MealsModule,
        UsersModule,
        ProductsModule,
        forwardRef(() => AuthModule),

    ],
    controllers: [DietsController],
    providers: [
        DietsService
    ]
})
export class DietsModule {

}