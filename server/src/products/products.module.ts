import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {FileModule} from "../files/file.module";
import {Product} from "./products.model";
import {ProductsController} from "./products.controller";
import {ProductsService} from "./products.service";

@Module({
    exports: [ProductsService],
    providers: [ProductsService],
    imports: [
        SequelizeModule.forFeature([Product]),
        FileModule
    ],
    controllers: [ProductsController]
})
export class ProductsModule {

}