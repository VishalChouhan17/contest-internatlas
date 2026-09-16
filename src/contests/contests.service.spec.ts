import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ContestsService } from './contests.service.js';
import { ParticipationType } from './dto/create-contest.dto.js';

describe('ContestsService', () => {
  let service: ContestsService;
  
let dbMock: Record<string, ReturnType<typeof vi.fn>>;

  beforeEach(async () => {
    dbMock = {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      orderBy: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      values: vi.fn().mockReturnThis(),
      returning: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContestsService,
        {
          provide: 'DRIZZLE_CONNECTION',
          useValue: dbMock,
        },
      ],
    }).compile();

    service = module.get<ContestsService>(ContestsService);
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createContest', () => {
    it('should insert a new contest with a generated slug and return it', async () => {
      const dto = {
        title: 'Cyber AI Challenge 2026',
        description: 'AI model design contest',
        participationType: ParticipationType.TEAM,
        minTeamSize: 2,
        maxTeamSize: 4,
        startTime: '2026-10-01T00:00:00Z',
        endTime: '2026-10-05T00:00:00Z',
      };

      const mockCreatedContest = {
        id: 'c1234567-89ab-cdef-0123-456789abcdef',
        slug: 'cyber-ai-challenge-2026-a1b2',
        ...dto,
      };

      dbMock.returning.mockResolvedValueOnce([mockCreatedContest]);

      const result = await service.createContest(dto);

      expect(dbMock.insert).toHaveBeenCalled();
      expect(result).toEqual(mockCreatedContest);
    });
  });

  describe('getContestBySlug', () => {
    it('should retrieve a single contest matching the slug', async () => {
      const mockContest = {
        id: 'c1234567-89ab-cdef-0123-456789abcdef',
        slug: 'cyber-ai-challenge-2026',
        title: 'Cyber AI Challenge 2026',
      };

      // Service checks result.length directly on where() output
      dbMock.where.mockResolvedValueOnce([mockContest]);

      const result = await service.getContestBySlug('cyber-ai-challenge-2026');

      expect(dbMock.select).toHaveBeenCalled();
      expect(result).toEqual(mockContest);
    });
  });

  describe('registerTeam', () => {
    it('should register a team and generate a unique join invite code', async () => {
      const contestId = 'c1234567-89ab-cdef-0123-456789abcdef';
      const dto = {
        leaderId: 'u9876543-21ba-fedc-3210-9876543210fe',
        teamName: 'Code Samurai',
      };

      const mockRegistration = {
        id: 'r1111111-2222-3333-4444-555555555555',
        contestId,
        teamName: dto.teamName,
        inviteCode: 'UISA4JCG',
      };

      dbMock.returning.mockResolvedValueOnce([mockRegistration]);

      const result = await service.registerTeam(contestId, dto);

      expect(dbMock.insert).toHaveBeenCalled();
      expect(result).toEqual({
        registration: mockRegistration,
        shareableInviteUrl: expect.stringContaining('https://yourapp.com/contests/join?code='),
      });
    });
  });

  describe('submitRound', () => {
    it('should create a round submission entry for a registered team', async () => {
      const roundId = 'r9999999-8888-7777-6666-555555555555';
      const dto = {
        registrationId: 'r1111111-2222-3333-4444-555555555555',
        submissionData: { repositoryUrl: 'https://github.com/org/repo' },
      };

      const mockSubmission = {
        id: 'sub-0001',
        roundId,
        registrationId: dto.registrationId,
        submissionData: dto.submissionData,
        submittedAt: new Date().toISOString(),
      };

      dbMock.returning.mockResolvedValueOnce([mockSubmission]);

      const result = await service.submitRound(roundId, dto);

      expect(dbMock.insert).toHaveBeenCalled();
      expect(result).toEqual(mockSubmission);
    });
  });

  describe('getRoundLeaderboard', () => {
    it('should return leaderboard entries ordered by highest score', async () => {
      const roundId = 'r9999999-8888-7777-6666-555555555555';
      const mockLeaderboard = [
        { teamName: 'Code Samurai', score: 98.5 },
        { teamName: 'Cyber Knights', score: 92.0 },
      ];

      dbMock.orderBy.mockResolvedValueOnce(mockLeaderboard);

      const result = await service.getRoundLeaderboard(roundId);

      expect(dbMock.select).toHaveBeenCalled();
      expect(result).toEqual(mockLeaderboard);
    });
  });
});