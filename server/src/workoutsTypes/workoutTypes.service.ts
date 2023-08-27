import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {WorkoutTypes} from "./workoutTypes.model";
import {CreateWorkoutTypesDto} from "./dto/create-workoutTypes.dto";

@Injectable()
export class WorkoutTypesService {
    constructor(@InjectModel(WorkoutTypes) private workoutTypesRepository: typeof WorkoutTypes) {
    }

    async create(dto: CreateWorkoutTypesDto) {
        return this.workoutTypesRepository.create(dto);
    }

    async findAll() {
        return this.workoutTypesRepository.findAll();
    }

    async findByValue(value: string) {
        return this.workoutTypesRepository.findOne({where: {value}})
    }
}