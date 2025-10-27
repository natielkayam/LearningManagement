using LearningManagement.Services.CoursesAPI.Data;
using LearningManagement.Services.CoursesAPI.Models;

namespace LearningManagement.Services.CoursesAPI.Repositories
{
    public class CourseRepository : ICourseRepository
    {
        private readonly InMemoryDbContext _context;

        public CourseRepository(InMemoryDbContext context)
        {
            _context = context;
        }

        public Task<IEnumerable<Course>> GetAllAsync()
        {
            var courses = _context.Courses;
            
            return Task.FromResult<IEnumerable<Course>>(courses);
        }

        public Task<Course?> GetByIdAsync(int id)
        {
            var course = _context.Courses.FirstOrDefault(c => c.Id == id);

            return Task.FromResult(course);
        }

        public Task<Course?> GetByTitleAsync(string title)
        {
            var course = _context.Courses.FirstOrDefault(c => c.Title == title);

            return Task.FromResult(course);
        }

        public Task AddAsync(Course course)
        {
            course.Id = _context.GenerateCourseId();

            course.CreatedAt = DateTime.UtcNow;

            course.UpdatedAt = DateTime.UtcNow;

            _context.Courses.Add(course);

            return Task.CompletedTask;
        }

        public Task UpdateAsync(Course course)
        {
            var index = _context.Courses.FindIndex(c => c.Id == course.Id);

            course.UpdatedAt = DateTime.Now;

            _context.Courses[index] = course;

            return Task.CompletedTask;
        }

        public Task RemoveAsync(int id)
        {
            var course = _context.Courses.FirstOrDefault(c => c.Id == id);

            _context.Courses.Remove(course);
            
            _context.CourseEnrollments.RemoveAll(e => e.CourseId == id);

            return Task.CompletedTask;
        }
    }
}
