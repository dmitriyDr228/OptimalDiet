import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from "@nestjs/common";
import {WorkoutProgramService} from "./workoutProgram.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {WorkoutProgramCreateDto} from "./dto/workoutProgram-create.dto";
import {UserWorkoutProgramUpdateDto} from "./dto/userWorkoutProgram-update.dto";
import {UserWorkoutProgramDeleteDto} from "./dto/userWorkoutProgram-delete.dto";

@Controller('workoutPrograms')
export class WorkoutProgramController {
    constructor(private workoutProgramService: WorkoutProgramService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: WorkoutProgramCreateDto,
           @UploadedFile() image) {
        return this.workoutProgramService.create(dto, image);
    }

    @Put()
    updateUserWorkoutPrograms(@Body() dto: UserWorkoutProgramUpdateDto) {
        return this.workoutProgramService.updateUserWorkoutProgram(dto);
    }

    @Delete('user')
    deleteUserWorkoutProgram(@Body() dto: UserWorkoutProgramDeleteDto) {
        return this.workoutProgramService.deleteUserProgram(dto);
    }

    @Delete('/:id')
    delete(@Param() id: number) {
        return this.workoutProgramService.deleteById(id);
    }

    @Get()
    findAll() {
        return this.workoutProgramService.findAll();
    }

    @Get('/:id')
    findOneById(@Param('id') id: number) {
        return this.workoutProgramService.findById(id);
    }

    @Get('/byTitle')
    findOneByTitle(title: string) {
        return this.workoutProgramService.findByTitle(title);
    }
}