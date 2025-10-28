using LearningManagement.Services.CoursesAPI.Models;

namespace LearningManagement.Services.CoursesAPI.Repositories
{
    public interface ICourseRepository
    {
        Task<IEnumerable<Course>> GetAllAsync();
        Task <Course> GetByIdAsync(string id);
        Task<Course?> GetByTitleAsync(string title);
        Task AddAsync(Course course);
        Task UpdateAsync(Course course);
        Task RemoveAsync(string id);
    }
}
