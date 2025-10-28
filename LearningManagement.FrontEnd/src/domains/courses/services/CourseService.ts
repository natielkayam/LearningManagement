import axios from "axios";
import courseAxios from "../http/courseAxiosInstanse";
import type { CourseDto } from "../types/CourseDto";
import type { ICourseService } from "./iservices/ICourseService";
import type { EnrollmentDto } from "../types/EnrollmentDto";
import type { StudentDto } from "../types/StudentDto";
import type { EnrollmentReportSummaryDto } from "../types/EnrollmentReportSummaryDto";

export class CourseService implements ICourseService {
  private static instance: CourseService;

  private constructor() {}

  public static getInstance(): CourseService {
    if (!CourseService.instance) {
      CourseService.instance = new CourseService();
    }
    return CourseService.instance;
  }

    async GetAllCourses(): Promise<CourseDto[]> {
      try {
        const response = await courseAxios.get<CourseDto[]>("/get-all");
        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error('API Error:', error);
          throw new Error(error.response?.data || "An unknown error occurred");
        }
        throw new Error("An unknown error occurred");
      }
    }

    async GetAllEnrollments(): Promise<EnrollmentDto[]> {
      try {
        const response = await courseAxios.get<EnrollmentDto[]>("/enrollment/get-all");
        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error('API Error:', error);
          throw new Error(error.response?.data || "An unknown error occurred");
        }
        throw new Error("An unknown error occurred");
      }
    }

    async CreateCourse(course: CourseDto): Promise<CourseDto> {
      try {
        const response = await courseAxios.post<CourseDto>("/create", course);
        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error('API Error:', error);
          throw new Error(error.response?.data || "An unknown error occurred");
        }
        throw new Error("An unknown error occurred");
      }
    }

    async UpdateCourse(course: CourseDto): Promise<CourseDto> {
      try {
        const response = await courseAxios.put<CourseDto>("/update", course);
        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error('API Error:', error);
          throw new Error(error.response?.data || "An unknown error occurred");
        }
        throw new Error("An unknown error occurred");
      }
    }

    async RemoveCourse(courseId: string): Promise<void> {
      try {
        await courseAxios.delete(`/remove?courseId=${courseId}`);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error('API Error:', error);
          throw new Error(error.response?.data || "An unknown error occurred");
        }
        throw new Error("An unknown error occurred");
      }
    }

    async AssignStudentToCourse(courseId: string, student: StudentDto): Promise<void> {
      try {
        await courseAxios.post(`/enrollment/assign?courseId=${courseId}`, student);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error('API Error:', error);
          throw new Error(error.response?.data || "An unknown error occurred");
        }
        throw new Error("An unknown error occurred");
      }
    }

    async UnassignStudentFromCourse(courseId: string, studentId: string): Promise<void> {
      try {
        await courseAxios.delete(`/enrollment/unassign?courseId=${courseId}&studentId=${studentId}`);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error('API Error:', error);
          throw new Error(error.response?.data || "An unknown error occurred");
        }
        throw new Error("An unknown error occurred");
      }
    }

    async GetEnrollmentReport(): Promise<EnrollmentReportSummaryDto> {
      try {
        const response = await courseAxios.get<EnrollmentReportSummaryDto>("enrollment/report");
        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error('API Error:', error);
          throw new Error(error.response?.data || "An unknown error occurred");
        }
        throw new Error("An unknown error occurred");
      }
    }

    async SaveReportToS3(reportData: EnrollmentReportSummaryDto): Promise<string> {
      try {
        const response = await courseAxios.post<{ url: string }>("/reports/save-to-s3", reportData);
        return response.data.url;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error('API Error:', error);
          throw new Error(error.response?.data || "An unknown error occurred");
        }
        throw new Error("An unknown error occurred");
      }
    }
}