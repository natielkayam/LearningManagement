using LearningManagement.Services.CoursesAPI.Data;
using LearningManagement.Services.CoursesAPI.Models;

namespace LearningManagement.Services.CoursesAPI.Repositories
{
    public class CourseEnrollmentRepository : ICourseEnrollmentRepository
    {
        private readonly InMemoryDbContext _context;

        public CourseEnrollmentRepository(InMemoryDbContext context)
        {
            _context = context;
        }

        public Task<List<Student>> GetEnrolledStudentsAsync(int courseId)
        {
            var students = _context.CourseEnrollments
                .Where(e => e.CourseId == courseId)
                .Select(e => e.Student)
                .ToList();

            return Task.FromResult(students);
        }

        public Task EnrollStudentAsync(CourseEnrollment courseEnrollment)
        {
            _context.CourseEnrollments.Add(courseEnrollment);

            return Task.CompletedTask;
        }

        public Task RemoveStudentAsync(CourseEnrollment courseEnrollment)
        {
            _context.CourseEnrollments.Remove(courseEnrollment);

            return Task.CompletedTask;
        }

        public Task<CourseEnrollment?> GetEnrollmentAsync(int courseId, int studentId)
        {
            var enrollment = _context.CourseEnrollments
                .FirstOrDefault(e => e.CourseId == courseId && e.StudentId == studentId);
            
            return Task.FromResult(enrollment);
        }
    }
}
