import { IsEnum, IsOptional, IsString } from "class-validator";
import { ETaskStatus } from "../tasks.constants";

export class GetTasksFilterDto{
    @IsOptional()
    @IsEnum(ETaskStatus)
    status?: ETaskStatus;
    
    @IsOptional()
    @IsString()
    search?:string;
}