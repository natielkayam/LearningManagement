import * as yup from "yup";
import type { CourseDto } from "../types/CourseDto";
import type { StudentDto } from "../types/StudentDto";

export const getCreateCourseSchema = (): yup.ObjectSchema<CourseDto> =>
  yup.object({
    id: yup.string().optional(),
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  });

  export const getUpdateCourseSchema = (): yup.ObjectSchema<CourseDto> =>
    yup.object({
      id: yup.string().required("ID is required"),
      title: yup.string().optional(),
      description: yup.string().optional(),
    });

export const getRemoveCourseSchema = (): yup.ObjectSchema<{ courseId: string }> =>
  yup.object({
    courseId: yup.string().required("Course ID is required"),
  });

export const getAssignStudentToCourseSchema = (): yup.ObjectSchema<{ courseId: string, student: StudentDto }> =>
  yup.object({
    courseId: yup.string().required("Course ID is required"),
    student: yup.object({
      id: yup.string().required("Student ID is required"),
      name: yup.string().required("Name is required"),
    }),
  });

export const getUnassignStudentFromCourseSchema = (): yup.ObjectSchema<{ courseId: string, studentId: string }> =>
  yup.object({
    courseId: yup.string().required("Course ID is required"),
    studentId: yup.string().required("Student ID is required"),
  });