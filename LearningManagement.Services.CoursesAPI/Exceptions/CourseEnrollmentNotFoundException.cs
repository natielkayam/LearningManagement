namespace LearningManagement.Services.CoursesAPI.Exceptions
{
    public class CourseEnrollmentNotFoundException : Exception
    {
        public CourseEnrollmentNotFoundException()
            : base("Course enrollment not found.")
        {
        }
    }
}
