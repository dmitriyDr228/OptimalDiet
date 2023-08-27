import {Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {WorkoutsService} from "./workouts.service";
import {CreateWorkoutsDto} from "./dto/create-workouts.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('workouts')
export class WorkoutsController {
    constructor(private workoutService: WorkoutsService) {
    }

    @Get()
    findAll() {
        return this.workoutService.findAll();
    }

    @Get('/:id')
    findOneById(@Param('id') id: number) {
        return this.workoutService.findById(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: CreateWorkoutsDto,
           @UploadedFile() image) {
        return this.workoutService.create(dto, image);
    }

}