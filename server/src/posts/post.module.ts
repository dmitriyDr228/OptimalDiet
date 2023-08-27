import {Module} from "@nestjs/common";
import {PostController} from "./post.controller";
import sequelize from "sequelize";
import {SequelizeModule} from "@nestjs/sequelize";
import {Post} from "./post.model";
import {PostService} from "./post.service";
import {User} from "../users/users.model";
import {FileModule} from "../files/file.module";



@Module({
    exports:[PostService],
    providers:[PostService],
    imports:[
        SequelizeModule.forFeature([Post,User]),
        FileModule
    ],
    controllers:[PostController]
})
export class PostModule{

}