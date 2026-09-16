import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Query, 
  HttpCode, 
  HttpStatus, 
  ParseUUIDPipe 
} from '@nestjs/common';
import { ContestsService } from './contests.service.js';
import { CreateContestDto } from './dto/create-contest.dto.js';
import { RegisterContestDto, JoinTeamDto } from './dto/register-contest.dto.js';
import { SubmitRoundDto } from './dto/submit-round.dto.js';

@Controller('contests')
export class ContestsController {
  constructor(private readonly contestsService: ContestsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createContest(@Body() createContestDto: CreateContestDto) {
    return await this.contestsService.createContest(createContestDto);
  }

  @Get()
  async getAllContests(
    @Query('status') status?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return await this.contestsService.findAllContests(status, +page, +limit);
  }

  @Get('by-slug/:slug')
  async getContestBySlug(@Param('slug') slug: string) {
    return await this.contestsService.getContestBySlug(slug);
  }

  @Post(':id/register')
  @HttpCode(HttpStatus.CREATED)
  async registerForContest(
    @Param('id', ParseUUIDPipe) contestId: string,
    @Body() registerDto: RegisterContestDto,
  ) {
    // Fixed: Pass the entire registerDto object
    return await this.contestsService.registerTeam(contestId, registerDto);
  }

  @Post('teams/join')
  @HttpCode(HttpStatus.OK)
  async joinTeam(@Body() joinTeamDto: JoinTeamDto) {
    return await this.contestsService.joinTeamByInviteCode(
      joinTeamDto.inviteCode,
      joinTeamDto.userId,
    );
  }

  @Post('rounds/:roundId/submit')
  @HttpCode(HttpStatus.CREATED)
  async submitRound(
    @Param('roundId', ParseUUIDPipe) roundId: string,
    @Body() submitRoundDto: SubmitRoundDto,
  ) {
    return await this.contestsService.submitRound(roundId, submitRoundDto);
  }

  @Get('rounds/:roundId/leaderboard')
  async getLeaderboard(@Param('roundId', ParseUUIDPipe) roundId: string) {
    return await this.contestsService.getRoundLeaderboard(roundId);
  }
}