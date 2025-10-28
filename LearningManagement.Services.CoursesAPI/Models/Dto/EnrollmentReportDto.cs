namespace LearningManagement.Services.CoursesAPI.Models.Dto
{
    public class EnrollmentReportDto
    {
        public string CourseId { get; set; }
        public string CourseTitle { get; set; } = string.Empty;
        public int StudentCount { get; set; }
        public List<EnrollmentDto> Students { get; set; } = new();
    }
}
