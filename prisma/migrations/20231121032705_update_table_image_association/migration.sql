/*
  Warnings:

  - Made the column `associationId` on table `ImageAssociation` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ImageAssociation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "associationId" TEXT NOT NULL,
    CONSTRAINT "ImageAssociation_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "associations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ImageAssociation" ("associationId", "created_at", "id", "path", "updated_at") SELECT "associationId", "created_at", "id", "path", "updated_at" FROM "ImageAssociation";
DROP TABLE "ImageAssociation";
ALTER TABLE "new_ImageAssociation" RENAME TO "ImageAssociation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
