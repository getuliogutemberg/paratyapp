/*
  Warnings:

  - You are about to drop the `Platform` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Page" DROP CONSTRAINT "Page_platformId_fkey";

-- DropTable
DROP TABLE "Platform";

-- CreateTable
CREATE TABLE "platform" (
    "id" SERIAL NOT NULL,
    "logo" TEXT NOT NULL,
    "Background" TEXT DEFAULT '',
    "CssInit" TEXT DEFAULT '',
    "LogoInit" TEXT DEFAULT '',
    "Subtitle" TEXT DEFAULT '',
    "TitleInit" TEXT DEFAULT '',
    "name" TEXT NOT NULL,
    "primaryColor" TEXT DEFAULT '#e60000',
    "secondaryColor" TEXT DEFAULT '#e60000',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "platform_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
