/*
  Warnings:

  - You are about to drop the column `bookingType` on the `GroupBooking` table. All the data in the column will be lost.
  - Added the required column `bookerType` to the `GroupBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasChildren` to the `GroupBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hotel` to the `GroupBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `needsAccessibleRoom` to the `GroupBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stayPurpose` to the `GroupBooking` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GroupBooking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "bookerType" TEXT NOT NULL,
    "stayPurpose" TEXT NOT NULL,
    "visitReason" TEXT NOT NULL,
    "hotel" TEXT NOT NULL,
    "isSchoolGroup" BOOLEAN NOT NULL,
    "package" TEXT NOT NULL,
    "checkInDate" DATETIME NOT NULL,
    "checkOutDate" DATETIME NOT NULL,
    "roomsSingle" INTEGER NOT NULL,
    "roomsDouble" INTEGER NOT NULL,
    "roomsTwin" INTEGER NOT NULL,
    "hasChildren" BOOLEAN NOT NULL,
    "needsAccessibleRoom" BOOLEAN NOT NULL,
    "family2" INTEGER NOT NULL,
    "family3A" INTEGER NOT NULL,
    "family3B" INTEGER NOT NULL,
    "family4" INTEGER NOT NULL,
    "accessibleSingle" INTEGER NOT NULL,
    "accessibleDouble" INTEGER NOT NULL,
    "accessibleTwin" INTEGER NOT NULL,
    "additionalInfo" TEXT,
    "locale" TEXT NOT NULL
);
INSERT INTO "new_GroupBooking" ("accessibleDouble", "accessibleSingle", "accessibleTwin", "additionalInfo", "checkInDate", "checkOutDate", "createdAt", "email", "family2", "family3A", "family3B", "family4", "firstName", "id", "isSchoolGroup", "lastName", "locale", "packageType", "phone", "roomsDouble", "roomsSingle", "roomsTwin", "title", "visitReason") SELECT "accessibleDouble", "accessibleSingle", "accessibleTwin", "additionalInfo", "checkInDate", "checkOutDate", "createdAt", "email", "family2", "family3A", "family3B", "family4", "firstName", "id", "isSchoolGroup", "lastName", "locale", "packageType", "phone", "roomsDouble", "roomsSingle", "roomsTwin", "title", "visitReason" FROM "GroupBooking";
DROP TABLE "GroupBooking";
ALTER TABLE "new_GroupBooking" RENAME TO "GroupBooking";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
