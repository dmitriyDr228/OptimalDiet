export class CreateWorkoutsDto {
    readonly title: string;
    readonly instruction?: string;
    readonly type?: string;
    readonly time: number;
}