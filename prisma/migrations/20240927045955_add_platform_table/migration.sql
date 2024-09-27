/*
  Warnings:

  - Added the required column `icon` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permission` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platformId` to the `Page` table without a default value. This is not possible if the table is not empty.
  - Added the required column `route` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "permission" "Role" NOT NULL,
ADD COLUMN     "platformId" INTEGER NOT NULL,
ADD COLUMN     "route" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Platform" (
    "id" SERIAL NOT NULL,
    "logo" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
