import { Button, Card, CardContent, Typography } from "@mui/material";
import { useCourseService } from "../../hooks/useCourseService";
import { useState } from "react";
import type { EnrollmentReportSummaryDto } from "../../types/EnrollmentReportSummaryDto";
import { useLoading, useToast } from "../../../../app/providers/hooks";


export function S3CloudCard({ reportData }: { reportData: EnrollmentReportSummaryDto | null }) {
  const [s3Url, setS3Url] = useState<string | null>(null);
  const { SaveReportToS3 } = useCourseService();
  const { showLoading, hideLoading } = useLoading();
  const { showSuccess, showError } = useToast();

  const handleSave = async () => {
    if (!reportData) return;
    showLoading();
    try {
      const url = await SaveReportToS3(reportData);
      setS3Url(url);
      showSuccess("Report saved to S3 successfully");
    } catch (err: any) {
      showError(err?.message || "Failed to save report");
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      <Card>
        <CardContent>
                <Typography color="textSecondary" gutterBottom>
                Save to Cloud (S3)
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleSave}
                  disabled={!reportData}
                  fullWidth
                >
                  Save to Cloud
                </Button>
              </CardContent>
            </Card>
            {s3Url && (
              <Card>
                <CardContent>
                  <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
                    {s3Url}
                  </Typography>
                </CardContent>
              </Card>
            )}
    </>
  );
}