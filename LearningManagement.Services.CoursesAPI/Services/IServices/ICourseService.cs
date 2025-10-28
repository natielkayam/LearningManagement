using LearningManagement.Services.CoursesAPI.Models.Dto;

namespace LearningManagement.Services.CoursesAPI.Services.IServices
{
    public interface ICourseService
    {
        Task<List<CourseDto>> GetCoursesAsync();
        Task<CourseDto> GetCourseByIdAsync(string id);
        Task AddCourseAsync(CourseDto courseDto);
        Task UpdateCourseAsync(CourseDto courseDto);
        Task RemoveCourseAsync(string courseId);
        Task<List<StudentDto>> GetEnrolledStudentsAsync(string courseId);
        Task EnrollStudentAsync(string courseId, StudentDto studentDto);
        Task RemoveStudentEnrollmentAsync(string courseId, string studentId);
        Task<List<EnrollmentDto>> GetEnrollmentsAsync();
        Task<EnrollmentReportSummaryDto> GenerateEnrollmentReportWithSummaryAsync();
        Task<string> SaveEnrollmentReportAsync(EnrollmentReportSummaryDto report);
    }
}
