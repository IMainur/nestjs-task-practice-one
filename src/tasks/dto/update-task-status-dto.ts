import { IsEnum } from "class-validator";
import { ETaskStatus } from "../tasks.constants";

export class UpdateTaskStatusDto {
    @IsEnum(ETaskStatus)
    status: ETaskStatus;
}