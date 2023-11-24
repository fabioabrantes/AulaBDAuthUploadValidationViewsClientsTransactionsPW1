/*
  Warnings:

  - You are about to alter the column `latitude` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `longitude` on the `clients` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "imagename" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "associationId" TEXT NOT NULL,
    CONSTRAINT "clients_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "associations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_clients" ("associationId", "cpf", "created_at", "id", "imagename", "latitude", "longitude", "name", "password", "updated_at", "username") SELECT "associationId", "cpf", "created_at", "id", "imagename", "latitude", "longitude", "name", "password", "updated_at", "username" FROM "clients";
DROP TABLE "clients";
ALTER TABLE "new_clients" RENAME TO "clients";
CREATE UNIQUE INDEX "clients_cpf_key" ON "clients"("cpf");
CREATE UNIQUE INDEX "clients_username_key" ON "clients"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
