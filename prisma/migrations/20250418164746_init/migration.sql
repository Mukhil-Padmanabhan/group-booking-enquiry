-- Drop old table if exists
DROP TABLE IF EXISTS "GroupBooking";

-- Recreate new table
CREATE TABLE "GroupBooking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    "title" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    "bookingType" TEXT NOT NULL,
    "visitReason" TEXT NOT NULL,
    "isSchoolGroup" BOOLEAN NOT NULL,

    "package" TEXT NOT NULL,
    "checkInDate" DATETIME NOT NULL,
    "checkOutDate" DATETIME NOT NULL,

    "roomsSingle" INTEGER NOT NULL,
    "roomsDouble" INTEGER NOT NULL,
    "roomsTwin" INTEGER NOT NULL,

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
