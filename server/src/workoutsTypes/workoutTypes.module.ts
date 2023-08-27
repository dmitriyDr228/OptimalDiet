import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {WorkoutTypes} from "./workoutTypes.model";
import {WorkoutTypesService} from "./workoutTypes.service";
import {WorkoutTypesController} from "./workoutTypes.controller";

@Module({
    imports: [
        SequelizeModule.forFeature([WorkoutTypes])
    ],
    exports: [WorkoutTypesService],
    providers: [WorkoutTypesService],
    controllers: [WorkoutTypesController],
})
export class WorkoutTypesModule {

}