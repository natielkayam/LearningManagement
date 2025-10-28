import type { EnrollmentDto } from "./EnrollmentDto";

export interface EnrollmentReportDto {
  courseId: string;
  courseTitle: string;
  studentCount: number;
  students: EnrollmentDto[];
}
