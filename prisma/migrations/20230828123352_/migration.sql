-- CreateTable
CREATE TABLE "Contractor" (
    "email" TEXT NOT NULL,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "dayrate" REAL NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "color" TEXT
);

-- CreateTable
CREATE TABLE "Specialities" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contractorId" INTEGER,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    CONSTRAINT "Specialities_contractorId_fkey" FOREIGN KEY ("contractorId") REFERENCES "Contractor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Contractor_email_key" ON "Contractor"("email");
