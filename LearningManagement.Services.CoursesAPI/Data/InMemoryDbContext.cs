using LearningManagement.Services.CoursesAPI.Models;

namespace LearningManagement.Services.CoursesAPI.Data
{
    public class InMemoryDbContext
    {
        public List<Course> Courses { get; }
        public List<Enrollment> Enrollments { get; }

        private int _courseId = 1;
        private int _enrollmentId = 1;

        public InMemoryDbContext()
        {
            Courses = new List<Course>();

            Enrollments = new List<Enrollment>();
        }

        public string GenerateCourseId() => _courseId++.ToString();
        public string GenerateCourseEnrollmentId() => _enrollmentId++.ToString();
    }
}
