import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class RegisterContestDto {
  @IsUUID()
  @IsNotEmpty()
  leaderId: string; // Will come from JWT auth middleware when integrated

  @IsString()
  @IsOptional()
  teamName?: string;
}

export class JoinTeamDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  inviteCode: string;
}