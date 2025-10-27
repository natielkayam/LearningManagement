using LearningManagement.Services.CoursesAPI.Models;

namespace LearningManagement.Services.CoursesAPI.Data
{
    public class InMemoryDbContext
    {
        public List<Course> Courses { get; }
        public List<CourseEnrollment> CourseEnrollments { get; }

        private int _courseId = 1;
        private int _courseEnrollmentId = 1;

        public InMemoryDbContext()
        {
            Courses = new List<Course>();

            CourseEnrollments = new List<CourseEnrollment>();
        }

        public int GenerateCourseId() => _courseId++;
        public int GenerateCourseEnrollmentId() => _courseEnrollmentId++;
    }
}
