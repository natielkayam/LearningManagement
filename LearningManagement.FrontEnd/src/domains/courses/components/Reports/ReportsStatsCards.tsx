import { Card, CardContent, Grid, Typography } from "@mui/material";
import type { EnrollmentReportSummaryDto } from "../../types/EnrollmentReportSummaryDto";
import { S3CloudCard } from "./S3CloudCard";

interface ReportsStatsCardsProps {
  reportData: EnrollmentReportSummaryDto | null;
}

export function ReportsStatsCards({ 
  reportData,
}: ReportsStatsCardsProps) {

  return (
    <>
      {reportData && (
        <Grid container spacing={2} sx={{ mb: 3 }} columns={{ xs: 1, sm: 5, md: 5 }}>
          <Grid item xs={1} sm={1} md={1}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Courses
                </Typography>
                <Typography variant="h4">
                  {reportData.totalCourses}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1} sm={1} md={1}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Enrollments
                </Typography>
                <Typography variant="h4">
                  {reportData.totalEnrollments}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1} sm={1} md={1}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Average per Course
                </Typography>
                <Typography variant="h4">
                  {reportData.totalCourses > 0 
                    ? Math.round(reportData.totalEnrollments / reportData.totalCourses)
                    : 0
                  }
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1} sm={1} md={1}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Unique Course Enrollments
                </Typography>
                <Typography variant="h4">
                  {reportData.courseEnrollments.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={1} sm={1} md={1}>
            <S3CloudCard reportData={reportData}/>
          </Grid>
        </Grid>
      )}
    </>
  );
}