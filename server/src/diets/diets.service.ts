import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Diets} from "./diets.model";
import {FileService} from "../files/file.service";
import {DietCreateDto} from "./dto/diet-create.dto";
import {MealsService} from "../meals/meals.service";
import {UsersService} from "../users/users.service";
import {DietUserUpdateDto} from "./dto/dietUser-update.dto";
import {RemoveDIetFromUserDto} from "./dto/removeDIetFromUser.dto";
import {RemoveMealFromDietDto} from "./dto/removeMealFromDiet.dto";
import {DietUserUpdateByIdDto} from "./dto/dietUser-updateById.dto";


@Injectable()
export class DietsService {
    constructor(@InjectModel(Diets) private dietRepository: typeof Diets,
                private fileService: FileService,
                private mealService: MealsService,
                private userService: UsersService) {
    }


    async findAll() {
        return await this.dietRepository.findAll({
            include: {
                all: true,
                include: [{
                    all: true
                }]
            }
        })
    }

    async findOneByTitle(title: string) {
        return await this.dietRepository.findOne({
            where: {title},
            include: {
                all: true,
                include: [
                    {all: true}
                ]
            }
        })
    }

    async removeMealFromDiet(dto: RemoveMealFromDietDto) {

        const diet = await this.findOneById(dto.dietId);
        if (!diet) {
            return new HttpException('Рацион не был найден в базе', HttpStatus.NOT_FOUND)
        }

        const meal = await this.mealService.findById(dto.mealId);
        if (!meal) {
            return new HttpException('Блюдо не было найдено в базе', HttpStatus.NOT_FOUND)
        }

        await diet.$remove('meals', [meal.id])
            .catch(reason => console.log(reason))

        return diet;


    }

    async updateDietUserById(dto: DietUserUpdateByIdDto) {
        const user = await this.userService.findOneById(dto.userId);
        if (!user) {
            return new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }

        for (let i = 0; i < dto.dietsId.length; i++) {
            const diet = await this.findOneById(dto.dietsId[i]);
            console.log(diet)
            if (!diet){
                return new HttpException('Рацион не найден', HttpStatus.NOT_FOUND);
            }
            await diet.$add('user', [user.id]);
            await diet.save();
        }
        return user;
    }


    async deleteDietFromUser(dto: RemoveDIetFromUserDto) {

        const user = await this.userService.findOneById(dto.userId);
        const diet = await this.findOneById(dto.dietId);

        if (!user) {
            return new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        if (!diet) {
            return new HttpException('Рацион не найден', HttpStatus.NOT_FOUND);
        }

        await user.$remove('diets', [diet.id])
            .catch(reason => new HttpException(reason, HttpStatus.INTERNAL_SERVER_ERROR))

        return user;


    }

    async findOneById(id: number): Promise<Diets> {
        return await this.dietRepository.findOne({
            where: {id},
            include: {
                all: true,
                include: [
                    {all: true}
                ]
            }
        })
    }

    async updateUser(dto: DietUserUpdateDto) {
        try {
            for (let i = 0; i < dto.diets.length; i++) {
                await dto.diets[i].$add('user', dto.user.id)
                await dto.diets[i].save();
            }
        } catch (e) {
            new HttpException('Ошибка добавления рациона',
                HttpStatus.INTERNAL_SERVER_ERROR)
        }

    }

    async create(dto: DietCreateDto, image: any) {
        const imageName = await this.fileService.createFile(image);
        const diet = await this.dietRepository.create(
            {...dto, image: imageName, calories: 0})
        for (let i = 0; i < dto.titleMeals.length; i++) {
            await this.mealService.findByTitle(dto.titleMeals[i])
                .then(meal => {
                    diet.$add('meals', [meal.meal.id])
                    diet.calories += meal.calories
                })
        }

        await this.userService.getUserByEmail(dto.userEmail).then(
            user => diet.$add('users', [user.id])
        )

        return diet.save();
    }
}