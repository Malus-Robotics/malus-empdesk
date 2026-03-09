-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "projectCode" TEXT,
ADD COLUMN     "projectName" TEXT;

-- CreateIndex
CREATE INDEX "Attendance_employeeId_idx" ON "Attendance"("employeeId");
