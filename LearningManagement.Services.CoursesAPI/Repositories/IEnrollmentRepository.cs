using LearningManagement.Services.CoursesAPI.Models;

namespace LearningManagement.Services.CoursesAPI.Repositories
{
    public interface IEnrollmentRepository
    {
        Task<List<Student>> GetEnrolledStudentsAsync(string courseId);
        Task<List<Enrollment>> GetEnrollmentsAsync();
        Task EnrollStudentAsync(Enrollment courseEnrollment);
        Task RemoveStudentAsync(Enrollment courseEnrollment);
        Task<Enrollment?> GetEnrollmentAsync(string courseId, string studentId);
    }
}
