import { useState, useEffect } from "react";
import type { CourseDto } from "../types/CourseDto";
import { useCourseService } from "./useCourseService";
import { useLoading } from "../../../app/providers/hooks";
import type { EnrollmentDto } from "../types/EnrollmentDto";
import type { EnrollmentReportSummaryDto } from "../types/EnrollmentReportSummaryDto";


export function useCourse() {
  const [courses, setCourses] = useState<CourseDto[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentDto[]>([]);
  const [reportData, setReportData] = useState<EnrollmentReportSummaryDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {showLoading, hideLoading} = useLoading();
  const {GetAllCourses, GetAllEnrollments, GetEnrollmentReport} = useCourseService();

  const fetchCourses = async () => {
    try {
      setError(null);
      const response = await GetAllCourses();
      setCourses(response);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch courses");
    }
  };

  const fetchEnrollments = async () => {
    try {
      setError(null);
      const response = await GetAllEnrollments();
      setEnrollments(response);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch enrollments");
    }
  };

  const fetchReport = async () => {
    try {
      setError(null);
      const response = await GetEnrollmentReport();
      setReportData(response);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch report");
    }
  };

  const refetchAll = async () => {
    showLoading();
    try {
      await Promise.all([fetchCourses(), fetchEnrollments()]);
      await fetchReport();
    } finally {
      hideLoading();
    }
  };

  
  useEffect(() => {
    refetchAll();
  }, []);

  return {
    courses,
    enrollments,
    error,
    refetch: refetchAll,
    reportData
  };
}
