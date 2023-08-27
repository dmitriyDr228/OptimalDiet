import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Workouts} from "./workouts.model";
import {FileService} from "../files/file.service";
import {CreateWorkoutsDto} from "./dto/create-workouts.dto";
import {WorkoutTypesService} from "../workoutsTypes/workoutTypes.service";

@Injectable()
export class WorkoutsService {
    constructor(@InjectModel(Workouts) private workoutRepository: typeof Workouts,
                private fileService: FileService,
                private workoutTypeService: WorkoutTypesService) {
    }

    async create(dto: CreateWorkoutsDto, image: any) {

        const fileName = await this.fileService.createFile(image);
        const workout = await this.workoutRepository.create({...dto, image: fileName});
        const type = await this.workoutTypeService.findByValue(dto.type);
        workout.typeId = type.id;
        workout.calorieBurning = workout.time * type.burnFactor;


        return await workout.save();
    }

    async findAll() {
        return await this.workoutRepository.findAll({include: {all: true}});
    }

    async findByTitle(title: string): Promise<Workouts> {
        try {
            const workout = await this.workoutRepository.findOne({
                where: {title},
                include: {all: true}
            })
            return workout;
        }
        catch (e) {
            new HttpException('Такого упражнеия нет', HttpStatus.NOT_FOUND);
        }
    }

    async findById(id: number) {
        return await this.workoutRepository.findOne({
            where:{id},
            include: {all: true}
        })
            .catch(reason =>
            new HttpException('Такого упражения не существует', HttpStatus.NOT_FOUND))
    }

    async deleteByTitle(title: string) {
        return await this.workoutRepository.destroy({where: {title}})
    }



}