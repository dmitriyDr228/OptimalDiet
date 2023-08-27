import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Property} from "./property.model";
import {PropertyService} from "./property.service";
import {PropertyController} from "./property.controller";
import {UsersService} from "../users/users.service";
import {UsersModule} from "../users/users.module";


@Module({
    exports: [PropertyService],
    imports: [
        SequelizeModule.forFeature([Property, User]),
        UsersModule
    ],
    providers: [PropertyService],
    controllers: [PropertyController]
})
export class PropertyModule {

}