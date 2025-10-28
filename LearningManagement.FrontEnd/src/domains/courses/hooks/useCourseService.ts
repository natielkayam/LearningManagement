import { CourseService } from "../services/CourseService";
import type { CourseDto } from "../types/CourseDto";
import type { EnrollmentReportSummaryDto } from "../types/EnrollmentReportSummaryDto";
import type { StudentDto } from "../types/StudentDto";

export function useCourseService() {
  const courseService = CourseService.getInstance();

  const GetAllCourses = async () => {
    const response = await courseService.GetAllCourses();
    return response;
  };

  const GetAllEnrollments = async () => {
    const response = await courseService.GetAllEnrollments();
    return response;
  };

  const CreateCourse = async (course: CourseDto) => {
    const response = await courseService.CreateCourse(course);
    return response;
  };

  const UpdateCourse = async (course: CourseDto) => {
    const response = await courseService.UpdateCourse(course);
    return response;
  };

  const RemoveCourse = async (courseId: string) => {
    await courseService.RemoveCourse(courseId);
  };

  const AssignStudentToCourse = async (courseId: string, student: StudentDto) => {
    await courseService.AssignStudentToCourse(courseId, student);
  };

  const UnassignStudentFromCourse = async (courseId: string, studentId: string) => {
    await courseService.UnassignStudentFromCourse(courseId, studentId);
  };

  const GetEnrollmentReport = async () => {
    const response = await courseService.GetEnrollmentReport();
    return response;
  };

  const SaveReportToS3 = async (reportData: EnrollmentReportSummaryDto) => {
    const response = await courseService.SaveReportToS3(reportData);
    return response;
  };

  return {
    GetAllCourses,
    GetAllEnrollments,
    CreateCourse,
    UpdateCourse,
    RemoveCourse,
    AssignStudentToCourse,
    UnassignStudentFromCourse,
    GetEnrollmentReport,
    SaveReportToS3,
  };
}
