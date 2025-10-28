import { useState, useEffect } from "react";
import { useCourseService } from "./useCourseService";
import type { EnrollmentReportSummaryDto } from "../types/EnrollmentReportSummaryDto";

export function useEnrollmentReport() {
  const { GetEnrollmentReport, SaveReportToS3 } = useCourseService();
  const [reportData, setReportData] = useState<EnrollmentReportSummaryDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await GetEnrollmentReport();
      setReportData(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch enrollment report");
    } finally {
      setLoading(false);
    }
  };

  const saveReport = async () => {
    if (!reportData) return;
    
    setSaving(true);
    setError(null);
    try {
      const url = await SaveReportToS3(reportData);
      return url;
    } catch (err: any) {
      setError(err.message || "Failed to save report");
      throw err;
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return {
    reportData,
    loading,
    error,
    saving,
    fetchReport,
    saveReport,
  };
}
