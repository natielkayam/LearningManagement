import { 
  Alert, 
  Box,
} from "@mui/material";
import { DataGridBase } from "../../../../shared/components/ui/Theme/DataGrid";
import { getEnrollmentReportColumns, getEnrollmentReportRows } from "./EnrollmentReportColumns";
import type { EnrollmentReportSummaryDto } from "../../types/EnrollmentReportSummaryDto";
import { ReportsStatsCards } from "./ReportsStatsCards";

interface ReportsProps {
  reportData: EnrollmentReportSummaryDto | null;
  error?: string | null;
}

export function Reports({ reportData, error }: ReportsProps) {

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      <ReportsStatsCards 
        reportData={reportData}
      />

      <DataGridBase
        columns={getEnrollmentReportColumns()}
        rows={getEnrollmentReportRows(reportData?.courseEnrollments || [])}
      />

      <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}></Box>
    </>
  );
}

