import type { StudentDto } from "./StudentDto";

export interface EnrollmentDto {
  id: string;
  courseId: string;
  studentId: string;
  student: StudentDto;
  enrolledOn: string; // DateTime from server will be serialized as string
}