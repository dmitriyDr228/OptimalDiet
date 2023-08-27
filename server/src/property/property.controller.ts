import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {PropertyService} from "./property.service";
import {CreatePropertyDto} from "./dto/create-property.dto";

@Controller('property')
export class PropertyController {

    constructor(private propertyService: PropertyService) {
    }

    @Get('/:id')
    getOneById(@Param() id: number) {
        return this.propertyService.findById(id);
    }

    @Post()
    create(@Body() dto: CreatePropertyDto) {
        return this.propertyService.create(dto);
    }

}