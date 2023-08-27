import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Property} from "./property.model";
import {CreatePropertyDto} from "./dto/create-property.dto";
import {UsersService} from "../users/users.service";

@Injectable()
export class PropertyService {

    constructor(@InjectModel(Property) private propertyRepository: typeof Property,
                private userService: UsersService) {
    }


    async create(dto: CreatePropertyDto) {

        return await this.propertyRepository.create({...dto}
        );
    }


    async findById(id: number) {
        return this.propertyRepository.findByPk(id);
    }

    async findByUserId(userId: number) {
        return await this.propertyRepository.findOne({where: {userId}});
    }


}