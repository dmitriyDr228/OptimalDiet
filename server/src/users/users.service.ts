import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {
    }

    async creteUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("ADMIN")
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async getAll() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async findOneById(id: number): Promise<User> {
        return await this.userRepository.findByPk(id,{
            include: {
                all: true,
                include: [{
                    all: true,
                    include: [{all: true}]
                }]
            },
        });
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            include: {
                all: true,
                include: [{
                    all: true,
                    include: [{all: true}]
                }]
            },
            where: {email}
        })
        return user;
    }

    async addRole(dto: AddRoleDto) {

        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (user && role) {
            await user.$add('role', role.id);
            return dto;
        }

        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
    }

    async banUser(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;

    }

}
