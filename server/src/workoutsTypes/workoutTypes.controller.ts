import {Body, Controller, Get, Post} from "@nestjs/common";
import {WorkoutTypesService} from "./workoutTypes.service";
import {CreateWorkoutTypesDto} from "./dto/create-workoutTypes.dto";

@Controller('workoutsTypes')
export class WorkoutTypesController {
    constructor(private workoutTypesService: WorkoutTypesService) {
    }

    @Get()
    findAll(){
        return this.workoutTypesService.findAll();
    }
    @Post()
    create(@Body() dto: CreateWorkoutTypesDto) {
        return this.workoutTypesService.create(dto);
    }
}