import { 
  IsString, 
  IsNotEmpty, 
  IsOptional, 
  IsEnum, 
  IsDateString, 
  IsInt, 
  Min, 
  Max 
} from 'class-validator';

export enum ParticipationType {
  SOLO = 'SOLO',
  TEAM = 'TEAM',
}

export class CreateContestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  bannerUrl?: string;

  @IsEnum(ParticipationType)
  @IsOptional()
  participationType?: ParticipationType = ParticipationType.SOLO;

  @IsInt()
  @Min(1)
  @IsOptional()
  minTeamSize?: number = 1;

  @IsInt()
  @Min(1)
  @Max(20)
  @IsOptional()
  maxTeamSize?: number = 4;

  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @IsDateString()
  @IsNotEmpty()
  endTime: string;
}