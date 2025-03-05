-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('Present', 'Absent', 'NoClass', 'Holiday');

-- CreateTable
CREATE TABLE "Attendance" (
    "studentRollNo" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "date_2025_03_04" "AttendanceStatus",
    "date_2025_03_05" "AttendanceStatus",
    "date_2025_03_06" "AttendanceStatus",
    "date_2025_03_11" "AttendanceStatus",
    "date_2025_03_12" "AttendanceStatus",
    "date_2025_03_13" "AttendanceStatus",
    "date_2025_03_18" "AttendanceStatus",
    "date_2025_03_19" "AttendanceStatus",
    "date_2025_03_20" "AttendanceStatus",
    "date_2025_03_25" "AttendanceStatus",
    "date_2025_03_26" "AttendanceStatus",
    "date_2025_03_27" "AttendanceStatus",
    "attendancePercentage" DOUBLE PRECISION,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("studentRollNo")
);
