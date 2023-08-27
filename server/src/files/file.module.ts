import {Model} from "sequelize-typescript";
import {Module} from "@nestjs/common";
import {FileService} from "./file.service";


@Module({
    exports:[FileService],
    providers:[FileService]
})
export class FileModule{}