/*
  Warnings:

  - Added the required column `associationId` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Made the column `clientId` on table `transctions` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "ImageAssociation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "associationId" TEXT,
    CONSTRAINT "ImageAssociation_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "associations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "associations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,
    "imagename" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "associationId" TEXT NOT NULL,
    CONSTRAINT "clients_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "associations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_clients" ("cpf", "id", "imagename", "latitude", "longitude", "name", "password", "username") SELECT "cpf", "id", "imagename", "latitude", "longitude", "name", "password", "username" FROM "clients";
DROP TABLE "clients";
ALTER TABLE "new_clients" RENAME TO "clients";
CREATE UNIQUE INDEX "clients_cpf_key" ON "clients"("cpf");
CREATE UNIQUE INDEX "clients_username_key" ON "clients"("username");
CREATE TABLE "new_transctions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT NOT NULL,
    CONSTRAINT "transctions_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transctions" ("amount", "clientId", "createdAt", "id", "type") SELECT "amount", "clientId", "createdAt", "id", "type" FROM "transctions";
DROP TABLE "transctions";
ALTER TABLE "new_transctions" RENAME TO "transctions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
