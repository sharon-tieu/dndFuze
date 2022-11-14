set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";

CREATE TABLE "public"."users" (
  "userId" serial NOT NULL,
  "username" text NOT NULL,
  "hashedPassword" TEXT NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."charactersCreated" (
  "characterId" serial NOT NULL,
  "userId" integer NOT NULL,
  "characterName" TEXT NOT NULL,
  "characterRace" TEXT NOT NULL,
  "characterClass" TEXT NOT NULL,
  "characterStartingWeapon" TEXT NOT NULL,
  "characterPersonality" TEXT NOT NULL,
  "level" integer NOT NULL,
  "strength" integer NOT NULL,
  "wisdom" integer NOT NULL,
  "speed" integer NOT NULL,
  "charisma" integer NOT NULL,
  "currentHealthPoints" integer NOT NULL,
  "currentMaxHealthPoints" integer NOT NULL,
  CONSTRAINT "charactersCreated_pk" PRIMARY KEY ("characterId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."notesEntries" (
  "notesId" serial NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL default now(),
  "characterId" integer NOT NULL,
  CONSTRAINT "notesEntries_pk" PRIMARY KEY ("notesId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."partyMembers" (
  "partyMemberId" serial NOT NULL,
  "characterId" integer NOT NULL,
  "partyMemberCharacterId" integer NOT NULL,
  CONSTRAINT "partyMembers_pk" PRIMARY KEY ("partyMemberId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "public"."equipment" (
  "equipmentId" serial NOT NULL,
  "characterId" integer NOT NULL,
  "type" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "level" integer NOT NULL,
  CONSTRAINT "equipment_pk" PRIMARY KEY ("equipmentId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "public"."skills" (
  "skillId" serial NOT NULL,
  "characterId" integer NOT NULL,
  "type" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "level" integer NOT NULL,
  CONSTRAINT "skills_pk" PRIMARY KEY ("skillId")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "charactersCreated" ADD CONSTRAINT "charactersCreated_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "notesEntries" ADD CONSTRAINT "notesEntries_fk0" FOREIGN KEY ("characterId") REFERENCES "charactersCreated"("characterId");
ALTER TABLE "partyMembers" ADD CONSTRAINT "partyMembers_fk0" FOREIGN KEY ("characterId") REFERENCES "charactersCreated"("characterId");
ALTER TABLE "partyMembers" ADD CONSTRAINT "partyMembers_fk1" FOREIGN KEY ("partyMemberCharacterId") REFERENCES "charactersCreated"("characterId");
ALTER TABLE "equipment" ADD CONSTRAINT "equipment_fk0" FOREIGN KEY ("characterId") REFERENCES "charactersCreated"("characterId");
ALTER TABLE "skills" ADD CONSTRAINT "skills_fk0" FOREIGN KEY ("characterId") REFERENCES "charactersCreated"("characterId");
