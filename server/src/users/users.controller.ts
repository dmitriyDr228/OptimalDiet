import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.creteUser(dto);
    }

    @Get('/:id')
    getOneById(@Param('id') id: number){
        return this.userService.findOneById(id);
    }

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    // @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.userService.getAll();
    }

    @ApiOperation({summary: 'Выдать роль'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/role')
    addRoleUser(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }


    @ApiOperation({summary: "Бан пользователя"})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Post('/ban')
    banUser(@Body() dto: BanUserDto) {
        return this.userService.banUser(dto);
    }
}
