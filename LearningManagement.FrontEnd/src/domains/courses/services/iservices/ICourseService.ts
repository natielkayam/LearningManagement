import type { CourseDto } from "../../types/CourseDto";
import type { EnrollmentDto } from "../../types/EnrollmentDto";
import type { EnrollmentReportSummaryDto } from "../../types/EnrollmentReportSummaryDto";
import type { StudentDto } from "../../types/StudentDto";

export interface ICourseService {
    GetAllCourses(): Promise<CourseDto[]>;
    GetAllEnrollments(): Promise<EnrollmentDto[]>;
    CreateCourse(course: CourseDto): Promise<CourseDto>;
    UpdateCourse(course: CourseDto): Promise<CourseDto>;
    RemoveCourse(courseId: string): Promise<void>;
    AssignStudentToCourse(courseId: string, student: StudentDto): Promise<void>;
    UnassignStudentFromCourse(courseId: string, studentId: string): Promise<void>;
    GetEnrollmentReport(): Promise<EnrollmentReportSummaryDto>;
    SaveReportToS3(reportData: EnrollmentReportSummaryDto): Promise<string>;
  }