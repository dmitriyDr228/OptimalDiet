import {Module} from "@nestjs/common";
import {RolesService} from "./roles.service";
import {RolesController} from "./roles.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {User} from "../users/users.model";
import {UserRoles} from "./user-roles.model";

@Module({
    exports: [RolesService],
    imports: [
        SequelizeModule.forFeature([Role, User,UserRoles])
    ],
    providers: [RolesService],
    controllers: [RolesController]
})
export class RolesModule {

}