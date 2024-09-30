/*
  Warnings:

  - You are about to drop the `Chart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dashboard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Page` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sensor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SensorData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('BASIC', 'ADMIN', 'SUPERADMIN');

-- DropForeignKey
ALTER TABLE "Chart" DROP CONSTRAINT "Chart_dashboardId_fkey";

-- DropForeignKey
ALTER TABLE "Dashboard" DROP CONSTRAINT "Dashboard_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Dashboard" DROP CONSTRAINT "Dashboard_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_userId_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_platformId_fkey";

-- DropForeignKey
ALTER TABLE "Sensor" DROP CONSTRAINT "Sensor_groupId_fkey";

-- DropForeignKey
ALTER TABLE "SensorData" DROP CONSTRAINT "SensorData_sensorId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_groupId_fkey";

-- DropTable
DROP TABLE "Chart";

-- DropTable
DROP TABLE "Dashboard";

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "Log";

-- DropTable
DROP TABLE "Page";

-- DropTable
DROP TABLE "Sensor";

-- DropTable
DROP TABLE "SensorData";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "role" NOT NULL DEFAULT 'BASIC',
    "groupId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dashboard" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dashboard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chart" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "dataSource" TEXT NOT NULL,
    "dashboardId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sensor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sensorData" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sensorId" INTEGER NOT NULL,

    CONSTRAINT "sensorData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "permission" "role" NOT NULL,
    "platformId" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log" (
    "id" SERIAL NOT NULL,
    "action" TEXT NOT NULL,
    "details" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dashboard" ADD CONSTRAINT "dashboard_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dashboard" ADD CONSTRAINT "dashboard_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chart" ADD CONSTRAINT "chart_dashboardId_fkey" FOREIGN KEY ("dashboardId") REFERENCES "dashboard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sensor" ADD CONSTRAINT "sensor_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sensorData" ADD CONSTRAINT "sensorData_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "sensor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page" ADD CONSTRAINT "page_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "page" ADD CONSTRAINT "page_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
