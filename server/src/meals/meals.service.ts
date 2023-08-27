import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Meals} from "./meals.model";
import {CreateMealDto} from "./dto/create-meal.dto";
import {FileService} from "../files/file.service";
import {ProductsService} from "../products/products.service";
import {RemoveProductFromMealDto} from "./dto/remove-productFromMeal.dto";

@Injectable()
export class MealsService {

    constructor(@InjectModel(Meals) private mealRepository: typeof Meals,
                private fileService: FileService,
                private productService: ProductsService) {
    }


    async create(dto: CreateMealDto, image: any) {
        const imageName = await this.fileService.createFile(image);

        const meal = await this.mealRepository.create({...dto, image: imageName})
        if (dto.products) {
            for (let i = 0; i < dto.products.length; i++) {
                await this.productService.findByTitle(dto.products[i]).then(
                    product => {
                        meal.$add('products', [product.id])
                    }
                )
            }
        }
        return meal;
    }

    async deleteProductFromMeal(dto: RemoveProductFromMealDto) {

        const meal = await this.findById(dto.mealId);
        if (!meal) {
            return new HttpException('Блюдо не было найдено в базе', HttpStatus.NOT_FOUND)
        }

        const product = await this.productService.findById(dto.productId);
        if (!product) {
            return new HttpException('Продукт не был найден в базе', HttpStatus.NOT_FOUND)
        }

        await meal.$remove('products', [product.id])
            .catch(reason => new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR));

        return meal;

    }

    async findAll() {
        return await this.mealRepository.findAll({
            include: {all: true}
        })
    }

    async findById(id: number) {
        return await this.mealRepository.findOne({
            include: {all: true},
            where: {id}
        })
    }

    async findByTitle(title: string) {
        const meal = await this.mealRepository.findOne({
            where: {title},
            include: {all: true}
        })
        let calories = 0;
        meal.products.map(meal => calories += meal.calories)
        return {
            meal,
            calories
        };
    }

}