namespace LearningManagement.Services.CoursesAPI.Models.Dto
{
    public class EnrollmentDto
    {
        public string Id { get; set; }
        public string CourseId { get; set; }
        public string StudentId { get; set; }
        public StudentDto Student { get; set; }
        public DateTime EnrolledOn { get; set; }
    }
}
