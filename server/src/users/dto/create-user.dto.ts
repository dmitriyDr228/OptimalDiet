import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example:'user@email.com', description:'Email пользователя'})
    readonly email: string;
    @ApiProperty({example:'12313', description:'Пароль пользователя'})
    readonly password: string;
}