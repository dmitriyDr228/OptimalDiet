import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import * as process from "process";
import {User} from "./users/users.model";
import {Role} from "./roles/roles.model";
import {UserRoles} from "./roles/user-roles.model";
import {RolesModule} from "./roles/roles.module";
import {AuthModule} from "./auth/auth.module";
import {Post} from "./posts/post.model";
import {PostModule} from "./posts/post.module";
import {Product} from "./products/products.model";
import {ProductsModule} from "./products/products.module";
import {Meals} from "./meals/meals.model";
import {ProductMeals} from "./meals/product-meals.model";
import {MealsModule} from "./meals/meals.module";
import {DietMeals} from "./diets/diet-meals.model";
import {Diets} from "./diets/diets.model";
import {DietsModule} from "./diets/diets.module";
import {DietUser} from "./diets/diet-user.model";
import {ServeStaticModule} from "@nestjs/serve-static";
import * as path from "path";
import {Property} from "./property/property.model";
import {PropertyModule} from "./property/property.module";
import {Workouts} from "./workouts/workouts.model";
import {WorkoutsModule} from "./workouts/workouts.module";
import {WorkoutTypes} from "./workoutsTypes/workoutTypes.model";
import {WorkoutTypesModule} from "./workoutsTypes/workoutTypes.module";
import {WorkoutProgram} from "./workoutPrograms/workoutProgram.model";
import {WorkoutProgramWorkouts} from "./workoutPrograms/workoutProgram-workouts,model";
import {WorkoutProgramModule} from "./workoutPrograms/workoutProgram.module";
import {UserWorkoutProgram} from "./workoutPrograms/userWorkoutProgram.model";


@Module({
    exports: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: +process.env.POSTGRES_PORT,
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role,UserWorkoutProgram, UserRoles, WorkoutTypes,WorkoutProgram,WorkoutProgramWorkouts, Post, Product, Meals, ProductMeals, DietMeals, Diets, DietUser, Property, Workouts],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule,
        AuthModule,
        PostModule,
        WorkoutsModule,
        WorkoutTypesModule,
        ProductsModule,
        MealsModule,
        DietsModule,
        PropertyModule,
        WorkoutProgramModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {
}