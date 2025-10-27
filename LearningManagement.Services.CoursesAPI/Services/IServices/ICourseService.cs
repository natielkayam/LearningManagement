using LearningManagement.Services.CoursesAPI.Models.Dto;

namespace LearningManagement.Services.CoursesAPI.Services.IServices
{
    public interface ICourseService
    {
        Task<List<CourseDto>> GetCoursesAsync();
        Task<CourseDto> GetCourseByIdAsync(int id);
        Task AddCourseAsync(CourseDto courseDto);
        Task UpdateCourseAsync(CourseDto courseDto, int courseId);
        Task RemoveCourseAsync(int courseId);
        Task<List<StudentDto>> GetEnrolledStudentsAsync(int courseId);
        Task EnrollStudentAsync(int courseId, StudentDto studentDto);
        Task RemoveStudentEnrollmentAsync(int courseId, int studentId);
        Task<EnrollmentReportSummaryDto> GenerateEnrollmentReportWithSummaryAsync();
    }
}
