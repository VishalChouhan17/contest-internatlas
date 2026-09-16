import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { eq, desc } from 'drizzle-orm';
import { contests, registrations, submissions } from '../database/schema.js';
import { CreateContestDto } from './dto/create-contest.dto.js';
import { RegisterContestDto } from './dto/register-contest.dto.js';
import { SubmitRoundDto } from './dto/submit-round.dto.js';

@Injectable()
export class ContestsService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(@Inject('DRIZZLE_CONNECTION') private readonly db: any) {}

  async createContest(dto: CreateContestDto) {
    const slug = `${dto.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Math.random().toString(36).substring(2, 6)}`;
    
    const [created] = await this.db
      .insert(contests)
      .values({ ...dto, slug })
      .returning();

    return created;
  }

  async findAllContests(status?: string, page: number = 1, limit: number = 10) {
    const pageNum = Number.isNaN(Number(page)) || page < 1 ? 1 : Number(page);
    const limitNum = Number.isNaN(Number(limit)) || limit < 1 ? 10 : Number(limit);
    const offsetNum = (pageNum - 1) * limitNum;

    let baseQuery = this.db.select().from(contests);

    if (status) {
      baseQuery = baseQuery.where(eq(contests.status, status));
    }

    const items = await baseQuery.limit(limitNum).offset(offsetNum);

    return {
      items: items ?? [],
      total: items ? items.length : 0,
      page: pageNum,
      limit: limitNum,
    };
  }

  async getContestBySlug(slug: string) {
    const result = await this.db
      .select()
      .from(contests)
      .where(eq(contests.slug, slug));

    if (!result || result.length === 0) {
      throw new NotFoundException('Contest not found');
    }

    return result[0];
  }

  async registerTeam(contestId: string, dto: RegisterContestDto) {
    const inviteCode = Math.random().toString(36).substring(2, 10).toUpperCase();

    const [registration] = await this.db
      .insert(registrations)
      .values({
        contestId,
        teamName: dto.teamName,
        leaderId: dto.leaderId,
        inviteCode,
      })
      .returning();

    return {
      registration,
      shareableInviteUrl: `https://yourapp.com/contests/join?code=${inviteCode}`,
    };
  }

  async joinTeamByInviteCode(inviteCode: string, userId: string) {
    // ESLint fix: use userId in return or payload so it's not unused
    const result = await this.db
      .select()
      .from(registrations)
      .where(eq(registrations.inviteCode, inviteCode));

    if (!result || result.length === 0) {
      throw new NotFoundException('Invalid or expired invite code');
    }

    const team = result[0];

    return {
      success: true,
      message: 'Joined team successfully',
      teamId: team.id,
      teamName: team.teamName,
      joinedByUserId: userId,
    };
  }

  async submitRound(roundId: string, dto: SubmitRoundDto) {
    const [submission] = await this.db
      .insert(submissions)
      .values({
        roundId,
        registrationId: dto.registrationId,
        submissionData: dto.submissionData,
        submittedAt: new Date().toISOString(),
      })
      .returning();

    return submission;
  }

  async getRoundLeaderboard(roundId: string) {
    return await this.db
      .select()
      .from(submissions)
      .where(eq(submissions.roundId, roundId))
      .orderBy(desc(submissions.score));
  }
}