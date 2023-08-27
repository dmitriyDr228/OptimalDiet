import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Product} from "./products.model";
import {FileService} from "../files/file.service";
import {CreateProductDto} from "./dto/create-product,dto";

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product) private productRepository: typeof Product,
                private fileService: FileService) {
    }

    async create(dto: CreateProductDto, image: any) {
        const fileName = await this.fileService.createFile(image);
        return await this.productRepository.create({...dto, image: fileName})
    }

    async findByTitle(title: string) {
        const product = await this.productRepository.findOne({
            where: {title},
            include: {all: true}
        })
        return product;
    }

    async findById(id: number) {
        return await this.productRepository.findOne({
            where: {id},
            include: {all: true}
        })
    }

    async findAll() {
        return await this.productRepository.findAll({include: {all: true}})
    }
}