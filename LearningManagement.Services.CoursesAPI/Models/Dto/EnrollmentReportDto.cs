namespace LearningManagement.Services.CoursesAPI.Models.Dto
{
    public class EnrollmentReportDto
    {
        public string CourseTitle { get; set; } = string.Empty;
        public int StudentCount { get; set; }
        public List<StudentDto> Students { get; set; } = new();
    }
}
