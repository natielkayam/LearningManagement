using LearningManagement.Services.CoursesAPI.Data;
using LearningManagement.Services.CoursesAPI.Models;

namespace LearningManagement.Services.CoursesAPI.Repositories
{
    public class EnrollmentRepository : IEnrollmentRepository
    {
        private readonly InMemoryDbContext _context;

        public EnrollmentRepository(InMemoryDbContext context)
        {
            _context = context;
        }

        public Task<List<Student>> GetEnrolledStudentsAsync(string courseId)
        {
            var students = _context.Enrollments
                .Where(e => e.CourseId == courseId)
                .Select(e => e.Student)
                .ToList();

            return Task.FromResult(students);
        }

        public Task<List<Enrollment>> GetEnrollmentsAsync()
        {
            var enrollments = _context.Enrollments.ToList();
        
            return Task.FromResult(enrollments);
        }

        public Task EnrollStudentAsync(Enrollment courseEnrollment)
        {
            courseEnrollment.Id = _context.GenerateCourseEnrollmentId();

            _context.Enrollments.Add(courseEnrollment);

            return Task.CompletedTask;
        }

        public Task RemoveStudentAsync(Enrollment courseEnrollment)
        {
            _context.Enrollments.Remove(courseEnrollment);

            return Task.CompletedTask;
        }

        public Task<Enrollment?> GetEnrollmentAsync(string courseId, string studentId)
        {
            var enrollment = _context.Enrollments
                .FirstOrDefault(e => e.CourseId == courseId && e.Student.Id == studentId);
            
            return Task.FromResult(enrollment);
        }
    }
}
