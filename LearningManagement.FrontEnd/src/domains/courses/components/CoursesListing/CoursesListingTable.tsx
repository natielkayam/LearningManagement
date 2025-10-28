import type { CourseDto } from "../../types/CourseDto";
import { Alert } from "@mui/material";
import { DataGridBase } from "../../../../shared/components/ui/Theme/DataGrid";
import { getCoursesColumns } from "./CoursesColumns";

interface CoursesListingTableProps {
  courses: CourseDto[] | null;
  error: string | null;
}

export function CoursesListingTable({ courses, error }: CoursesListingTableProps) {
  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      <DataGridBase
        columns={getCoursesColumns()}
        rows={courses || []}
      />
    </>
  );
}

