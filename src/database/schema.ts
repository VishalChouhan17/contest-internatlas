import { pgTable, uuid, text, timestamp, jsonb, numeric } from 'drizzle-orm/pg-core';

export const contests = pgTable('contests', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  status: text('status').default('UPCOMING'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const registrations = pgTable('registrations', {
  id: uuid('id').primaryKey().defaultRandom(),
  contestId: uuid('contest_id').references(() => contests.id).notNull(),
  teamName: text('team_name').notNull(),
  leaderId: uuid('leader_id').notNull(),
  inviteCode: text('invite_code').notNull().unique(),
});

// EXPORT REQUIRED HERE
export const submissions = pgTable('submissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  roundId: uuid('round_id').notNull(),
  registrationId: uuid('registration_id').references(() => registrations.id).notNull(),
  submissionData: jsonb('submission_data').notNull(),
  score: numeric('score'),
  submittedAt: timestamp('submitted_at').defaultNow(),
});