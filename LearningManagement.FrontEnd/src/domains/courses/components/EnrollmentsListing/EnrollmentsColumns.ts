import type { GridColDef } from "@mui/x-data-grid";

export const getEnrollmentsColumns = (): GridColDef[] => [
  { field: "id", headerName: "ID", flex: 1 },
  { field: "courseId", headerName: "Course ID", flex: 1 },
  { field: "studentId", headerName: "Student ID", flex: 1 },
  {
    field: "studentName",
    headerName: "Student Name",
    flex: 1,
  },
  {
    field: "enrolledOn",
    headerName: "Enrollment Date",
    flex: 1,
    valueFormatter: (params: any) => {
      if (!params) return "N/A";
      const date = new Date(params as string);
      return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
    },
  },
];
