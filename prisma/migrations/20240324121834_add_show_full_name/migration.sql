/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Session] DROP CONSTRAINT [Session_userId_fkey];

-- AlterTable
ALTER TABLE [dbo].[User] ADD [showFullName] BIT NOT NULL CONSTRAINT [User_showFullName_df] DEFAULT 0;

-- DropTable
DROP TABLE [dbo].[Session];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
