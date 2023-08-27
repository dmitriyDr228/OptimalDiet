import {Module} from "@nestjs/common";
import {WorkoutsController} from "./workouts.controller";
import {WorkoutsService} from "./workouts.service";
import {FileService} from "../files/file.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Workouts} from "./workouts.model";
import {FileModule} from "../files/file.module";
import {WorkoutTypesModule} from "../workoutsTypes/workoutTypes.module";

@Module({
    imports:[
        SequelizeModule.forFeature([Workouts]),
        FileModule,
        WorkoutTypesModule
    ],
    exports:[WorkoutsService],
    providers:[WorkoutsService],
    controllers:[WorkoutsController]
})
export class WorkoutsModule{

}