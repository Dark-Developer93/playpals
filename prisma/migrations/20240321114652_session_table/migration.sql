/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `LeaderboardEntry` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resetPasswordToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `color` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[User] ALTER COLUMN [color] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[User] ALTER COLUMN [password] VARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[User] ADD [resetPasswordToken] NVARCHAR(1000),
[resetPasswordTokenExpiry] DATETIME2;

-- CreateTable
CREATE TABLE [dbo].[Session] (
    [id] NVARCHAR(1000) NOT NULL,
    [sessionToken] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [expires] DATETIME2 NOT NULL,
    CONSTRAINT [Session_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Session_sessionToken_key] UNIQUE NONCLUSTERED ([sessionToken])
);

-- CreateIndex
ALTER TABLE [dbo].[LeaderboardEntry] ADD CONSTRAINT [LeaderboardEntry_id_key] UNIQUE NONCLUSTERED ([id]);

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_id_key] UNIQUE NONCLUSTERED ([id]);

-- CreateIndex
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_resetPasswordToken_key] UNIQUE NONCLUSTERED ([resetPasswordToken]);

-- AddForeignKey
ALTER TABLE [dbo].[Session] ADD CONSTRAINT [Session_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
