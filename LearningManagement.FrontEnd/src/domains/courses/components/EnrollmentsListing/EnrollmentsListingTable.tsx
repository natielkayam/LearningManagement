import { Alert } from "@mui/material";
import { DataGridBase } from "../../../../shared/components/ui/Theme/DataGrid";
import type { EnrollmentDto } from "../../types/EnrollmentDto";
import { getEnrollmentsColumns } from "./EnrollmentsColumns";

interface EnrollmentsListingTableProps {
  enrollments: EnrollmentDto[] | null;
  error: string | null;
}

export function EnrollmentsListingTable({ enrollments, error }: EnrollmentsListingTableProps) {
  
  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  // Transform the data to include studentName field for searching
  const transformedRows = (enrollments || []).map(enrollment => ({
    ...enrollment,
    studentName: enrollment.student?.name || 'N/A'
  }));

  return (
    <>
      <DataGridBase
        columns={getEnrollmentsColumns()}
        rows={transformedRows}
      />
    </>
  );
}

