namespace LearningManagement.Services.CoursesAPI.Models.Dto
{
    public class EnrollmentReportSummaryDto
    {
        public int TotalCourses { get; set; }
        public int TotalEnrollments { get; set; }
        public List<EnrollmentReportDto> CourseEnrollments { get; set; } = new();
    }
}
