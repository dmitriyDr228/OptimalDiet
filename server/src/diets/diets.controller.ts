import {Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors} from "@nestjs/common";
import {DietsService} from "./diets.service";
import {DietCreateDto} from "./dto/diet-create.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {DietUserUpdateDto} from "./dto/dietUser-update.dto";
import {RemoveDIetFromUserDto} from "./dto/removeDIetFromUser.dto";
import {RemoveMealFromDietDto} from "./dto/removeMealFromDiet.dto";
import {DietUserUpdateByIdDto} from "./dto/dietUser-updateById.dto";

@Controller('diets')
export class DietsController {
    constructor(private dietService: DietsService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    create(@Body() dto: DietCreateDto,
           @UploadedFile() image) {
        return this.dietService.create(dto, image);
    }

    @Put()
    updateUser(@Body() dto: DietUserUpdateByIdDto) {
        return this.dietService.updateDietUserById(dto);
    }

    @Post('/addDiet')
    updateDietsUser(@Body() dto: DietUserUpdateByIdDto) {
        console.log(dto)
        return this.dietService.updateDietUserById(dto);
    }

    @Get()
    findAll() {
        return this.dietService.findAll();
    }

    @Get('/:id')
    findOneById(@Param('id') id: number) {
        return this.dietService.findOneById(id);
    }

    @Delete('/deleteMeals')
    deleteMealFromDiet(@Body() dto: RemoveMealFromDietDto) {
        return this.dietService.removeMealFromDiet(dto);
    }

    @Delete()
    deleteDietFromUser(@Body() dto: RemoveDIetFromUserDto) {
        return this.dietService.deleteDietFromUser(dto);
    }

}
