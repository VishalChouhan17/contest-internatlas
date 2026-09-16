// src/contests/contests.module.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { ContestsModule } from './contests.module.js';
import { ContestsService } from './contests.service.js';
import { ContestsController } from './contests.controller.js';

describe('ContestsModule Integration', () => {
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [ContestsModule],
    })
      // Override the DRIZZLE_CONNECTION provider with a dummy mock
      .overrideProvider('DRIZZLE_CONNECTION')
      .useValue({
        select: vi.fn(),
        insert: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      })
      .compile();
  });

  it('should compile the module and resolve providers correctly', () => {
    const service = moduleRef.get<ContestsService>(ContestsService);
    const controller = moduleRef.get<ContestsController>(ContestsController);

    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });
});