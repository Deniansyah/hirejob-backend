-- CREATE DATABASE peworld_app;

CREATE TABLE "users" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "picture"       VARCHAR(255),
    "name"          VARCHAR(255) NOT NULL,
    "phoneNumber"   VARCHAR(255),
    "email"         VARCHAR(255) NOT NULL,
    "password"      VARCHAR(255) NOT NULL,
    "address"       VARCHAR(255),
    "bio"           TEXT,
    "jobDesk"       VARCHAR(255),
    "instagram"     VARCHAR(255),
    "github"        VARCHAR(255),
    "gitlab"        VARCHAR(255),
    "status"        VARCHAR(255),
    "role"          VARCHAR(255) NOT NULL,
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "company" (
    "id"            INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name"          VARCHAR(255) NOT NULL,
    "field"         VARCHAR(255) NOT NULL,
    "email"         VARCHAR(255),
    "phoneNumber"   VARCHAR(255),
    "address"       VARCHAR(255),
    "bio"           TEXT,
    "instagram"     VARCHAR(255),
    "linkedin"      VARCHAR(255),
    "userId"        INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt"     TIMESTAMPTZ DEFAULT now(),
    "updatedAt"     TIMESTAMPTZ
);

CREATE TABLE "skills" (
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(225) NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ 
);

CREATE TABLE "userSkills"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "skillId" INT NOT NULL REFERENCES skills(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ 
);
CREATE TABLE "resetPassword"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "code" VARCHAR(225) NOT NULL,
    "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ
);

CREATE TABLE "portofolio"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "link" VARCHAR(225) NOT NULL,
    "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "name" VARCHAR(225) NOT NULL,
    "picture" VARCHAR(225) NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ 
);

CREATE TABLE "experiences"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "companyName" VARCHAR(225) NOT NULL,
    "position" VARCHAR(225) NOT NULL,
    "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "joinDate" TIMESTAMP NOT NULL,
    "outDate" TIMESTAMP NOT NULL,
    "description" VARCHAR(225) NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ 
);

CREATE TABLE "purpose"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ 
);

CREATE TABLE "contact"(
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "userId" INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "purposeId" INT NOT NULL REFERENCES purpose(id) ON DELETE CASCADE ON UPDATE CASCADE,
    "message" VARCHAR(255) NOT NULL,
    "file" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ DEFAULT now(),
    "updatedAt" TIMESTAMPTZ 
);

ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE (email);

ALTER TABLE users ADD CONSTRAINT users_phoneNumber_unique UNIQUE ("phoneNumber");

ALTER TABLE "resetPassword" ADD COLUMN email VARCHAR(255) NOT NULL;