import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {WorkoutProgram} from "./workoutProgram.model";
import {FileService} from "../files/file.service";
import {WorkoutProgramCreateDto} from "./dto/workoutProgram-create.dto";
import {WorkoutsService} from "../workouts/workouts.service";
import {UserWorkoutProgramUpdateDto} from "./dto/userWorkoutProgram-update.dto";
import {UsersService} from "../users/users.service";
import {UserWorkoutProgramDeleteDto} from "./dto/userWorkoutProgram-delete.dto";

@Injectable()
export class WorkoutProgramService {
    constructor(@InjectModel(WorkoutProgram) private workoutProgramRepository: typeof WorkoutProgram,
                private fileService: FileService,
                private workoutService: WorkoutsService,
                private userService: UsersService) {
    }

    async deleteUserProgram(dto: UserWorkoutProgramDeleteDto) {

        const user = await this.userService.findOneById(dto.userId);
        if (!user) {
            return new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }

        const workoutProgram = await this.findById(dto.workoutProgramId);
        if (!user) {
            return new HttpException('Тренировочная программа не найден', HttpStatus.NOT_FOUND);
        }

        await user.$remove('workoutPrograms', [workoutProgram.id])
            .then(value => console.log('Программа успешно удалена у пользователя'))
            .catch(reason => new HttpException(reason, HttpStatus.NOT_FOUND));

        return user.save();

    }


    async updateUserWorkoutProgram(dto: UserWorkoutProgramUpdateDto) {
        const user = await this.userService.findOneById(dto.userId);
        if (!user) {
            return new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }

        const workoutProgramsId = dto.workoutProgramsId;
        for (let i = 0; i < workoutProgramsId.length; i++) {
            const workout = await this.findById(workoutProgramsId[i]);
            if (!workout) {
                return new HttpException('Программа не найдена', HttpStatus.NOT_FOUND);
            }
            await workout.$add('users', [user.id]);
            await workout.save();
        }

    }

    async create(dto: WorkoutProgramCreateDto, image: any) {

        const titleImage = await this.fileService.createFile(image);
        const workoutProgram = await this.workoutProgramRepository.create(
            {...dto, image: titleImage}
        )
        const titleWorkouts = dto.titleWorkouts;
        for (let i = 0; i < titleWorkouts.length; i++) {
            await this.workoutService.findByTitle(titleWorkouts[i])
                .then(workout => {
                    workoutProgram.$add('workouts', [workout.id]);
                    workoutProgram.time += workout.time;
                    workoutProgram.burnedCalories += workout.calorieBurning;
                })
                .catch(reason => console.log(reason))
        }

        return workoutProgram.save();
    }

    async findAll() {
        return this.workoutProgramRepository.findAll({
            include: {all: true}
        })
    }

    async findById(id: number) {
        return this.workoutProgramRepository
            .findOne({where: {id}, include: {all: true}})
    }

    async findByTitle(title: string) {
        return this.workoutProgramRepository
            .findOne({where: {title}, include: {all: true}})
            .catch(reason =>
                new HttpException('Программа с данным названием не найдена', HttpStatus.NOT_FOUND))
    }

    async deleteById(id: number) {
        return this.workoutProgramRepository
            .destroy({where: {id}})
    }

}