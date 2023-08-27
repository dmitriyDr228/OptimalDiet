import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {WorkoutProgramService} from "./workoutProgram.service";
import {WorkoutProgramController} from "./workoutProgram.controller";
import {Workouts} from "../workouts/workouts.model";
import {WorkoutProgram} from "./workoutProgram.model";
import {WorkoutProgramWorkouts} from "./workoutProgram-workouts,model";
import {FileModule} from "../files/file.module";
import {WorkoutsModule} from "../workouts/workouts.module";
import {UsersModule} from "../users/users.module";
import {UserWorkoutProgram} from "./userWorkoutProgram.model";

@Module({
    imports: [
        SequelizeModule.forFeature([Workouts, UserWorkoutProgram, WorkoutProgram, WorkoutProgramWorkouts]),
        FileModule,
        WorkoutsModule,
        UsersModule,
    ],
    exports: [WorkoutProgramService],
    providers: [WorkoutProgramService],
    controllers: [WorkoutProgramController],
})
export class WorkoutProgramModule {
}