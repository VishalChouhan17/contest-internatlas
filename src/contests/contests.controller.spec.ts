import { Test, TestingModule } from '@nestjs/testing';
import { describe, beforeEach, it, expect } from 'vitest';
import { ContestsController } from './contests.controller.js';
import { ContestsService } from './contests.service.js';

describe('ContestsController', () => {
  let controller: ContestsController;
  let service: ContestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContestsController],
      providers: [
        {
          provide: ContestsService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ContestsController>(ContestsController);
    service = module.get<ContestsService>(ContestsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});