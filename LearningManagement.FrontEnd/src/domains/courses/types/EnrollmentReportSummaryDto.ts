import type { EnrollmentReportDto } from "./EnrollmentReportDto";

export interface EnrollmentReportSummaryDto {
  totalCourses: number;
  totalEnrollments: number;
  courseEnrollments: EnrollmentReportDto[];
}