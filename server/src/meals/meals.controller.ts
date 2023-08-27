import {Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors} from "@nestjs/common";
import {MealsService} from "./meals.service";
import {CreateMealDto} from "./dto/create-meal.dto";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('meals')
export class MealsController {
    constructor(private mealService: MealsService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: CreateMealDto,
           @UploadedFile() image) {
        return this.mealService.create(dto, image);
    }

    @Get()
    getAllMeals() {
        return this.mealService.findAll();
    }

    @Get('/:id')
    getOneById(@Param('id') id: number) {
        return this.mealService.findById(id);
    }

    @Get('/:title')
    getOneByTitle(@Param('title') title: string) {
        return this.mealService.findByTitle(title);
    }
}