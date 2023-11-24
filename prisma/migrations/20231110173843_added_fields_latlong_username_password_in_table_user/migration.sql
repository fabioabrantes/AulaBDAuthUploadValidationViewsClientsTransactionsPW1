/*
  Warnings:

  - Added the required column `latitude` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL
);
INSERT INTO "new_clients" ("cpf", "id", "name") SELECT "cpf", "id", "name" FROM "clients";
DROP TABLE "clients";
ALTER TABLE "new_clients" RENAME TO "clients";
CREATE UNIQUE INDEX "clients_cpf_key" ON "clients"("cpf");
CREATE UNIQUE INDEX "clients_username_key" ON "clients"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
