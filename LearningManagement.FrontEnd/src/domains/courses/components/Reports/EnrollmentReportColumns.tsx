import type { GridColDef } from "@mui/x-data-grid";
import type { EnrollmentReportDto } from "../../types/EnrollmentReportDto";

export function getEnrollmentReportColumns(): GridColDef[] {
  return [
    {
      field: "courseId",
      headerName: "Course ID",
      flex: 1,
    },
    {
      field: "courseTitle",
      headerName: "Course Title",
      flex: 1,
    },
    {
      field: "studentCount",
      headerName: "Student Count",
      flex: 1,
    },
    {
      field: "students",
      headerName: "Students",
      flex: 1,
      renderCell: (params) => {
        const enrollments = params.value as Array<{
          id: string;
          studentId: string;
          student: { id: string; name: string };
          enrolledOn: string;
        }>;
        
        if (!enrollments || enrollments.length === 0) {
          return "";
        }
        
        const studentNames = enrollments.map(enrollment => enrollment.student.name).join(", ");
        return (
          <div style={{ 
            maxWidth: "280px", 
            overflow: "hidden", 
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            cursor: "help"
          }} title={studentNames}>
            {studentNames}
          </div>
        );
      },
    },
  ];
}

export function getEnrollmentReportRows(reportData: EnrollmentReportDto[]): any[] {
  return reportData.map((item, index) => ({
    id: index,
    courseId: item.courseId,
    courseTitle: item.courseTitle,
    studentCount: item.studentCount,
    students: item.students,
  }));
}
