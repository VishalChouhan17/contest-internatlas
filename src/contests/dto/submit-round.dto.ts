import { IsUUID, IsNotEmpty, IsObject } from 'class-validator';

export class SubmitRoundDto {
  @IsUUID()
  @IsNotEmpty()
  registrationId: string;

  @IsObject()
  @IsNotEmpty()
  submissionData: Record<string, unknown>; 
}