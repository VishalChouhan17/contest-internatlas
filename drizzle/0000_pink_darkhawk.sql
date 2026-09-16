CREATE TYPE "public"."contest_status" AS ENUM('DRAFT', 'UPCOMING', 'ONGOING', 'COMPLETED');--> statement-breakpoint
CREATE TYPE "public"."round_type" AS ENUM('MCQ', 'FILE_SUBMISSION', 'CODING');--> statement-breakpoint
CREATE TABLE "contest_rounds" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contest_id" uuid,
	"round_number" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"type" "round_type" NOT NULL,
	"config" jsonb DEFAULT '{}'::jsonb
);
--> statement-breakpoint
CREATE TABLE "contests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"status" "contest_status" DEFAULT 'DRAFT',
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "contests_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "registrations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contest_id" uuid,
	"team_name" varchar(100),
	"leader_id" uuid NOT NULL,
	"invite_code" varchar(10),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "registrations_invite_code_unique" UNIQUE("invite_code")
);
--> statement-breakpoint
ALTER TABLE "contest_rounds" ADD CONSTRAINT "contest_rounds_contest_id_contests_id_fk" FOREIGN KEY ("contest_id") REFERENCES "public"."contests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "registrations" ADD CONSTRAINT "registrations_contest_id_contests_id_fk" FOREIGN KEY ("contest_id") REFERENCES "public"."contests"("id") ON DELETE cascade ON UPDATE no action;