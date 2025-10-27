using LearningManagement.Services.CoursesAPI.Models;

namespace LearningManagement.Services.CoursesAPI.Repositories
{
    public interface ICourseEnrollmentRepository
    {
        Task<List<Student>> GetEnrolledStudentsAsync(int courseId);
        Task EnrollStudentAsync(CourseEnrollment courseEnrollment);
        Task RemoveStudentAsync(CourseEnrollment courseEnrollment);
        Task<CourseEnrollment?> GetEnrollmentAsync(int courseId, int studentId);
    }
}
