using AutoMapper;
using FluentAssertions;
using LearningManagement.Services.CoursesAPI.Exceptions;
using LearningManagement.Services.CoursesAPI.Models;
using LearningManagement.Services.CoursesAPI.Models.Dto;
using LearningManagement.Services.CoursesAPI.Repositories;
using LearningManagement.Services.CoursesAPI.Services;
using Moq;
using Xunit;

namespace LearningManagement.Services.CoursesAPI.Tests
{
    public class CourseServiceTests
    {
        private readonly Mock<ICourseRepository> _courseRepoMock;
        private readonly Mock<ICourseEnrollmentRepository> _enrollmentRepoMock;
        private readonly Mock<IMapper> _mapperMock;
        private readonly CourseService _courseService;

        public CourseServiceTests()
        {
            _courseRepoMock = new Mock<ICourseRepository>();
            _enrollmentRepoMock = new Mock<ICourseEnrollmentRepository>();
            _mapperMock = new Mock<IMapper>();

            _courseService = new CourseService(
                _courseRepoMock.Object,
                _enrollmentRepoMock.Object,
                _mapperMock.Object);
        }

        [Fact]
        public async Task GetCourseByIdAsync_ShouldReturnCourseDto_WhenCourseExists()
        {
            // Arrange
            var course = new Course { Id = 1, Title = "Test", Description = "Desc" };
            var courseDto = new CourseDto { Id = 1, Title = "Test", Description = "Desc" };

            _courseRepoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync(course);
            _mapperMock.Setup(m => m.Map<CourseDto>(course)).Returns(courseDto);

            // Act
            var result = await _courseService.GetCourseByIdAsync(1);

            // Assert
            result.Should().BeEquivalentTo(courseDto);
        }

        [Fact]
        public async Task GetCourseByIdAsync_ShouldThrow_WhenCourseNotFound()
        {
            _courseRepoMock.Setup(r => r.GetByIdAsync(1)).ReturnsAsync((Course)null);

            Func<Task> act = async () => await _courseService.GetCourseByIdAsync(1);

            await act.Should().ThrowAsync<CourseNotFoundException>();
        }

        [Fact]
        public async Task AddCourseAsync_ShouldThrow_WhenTitleAlreadyExists()
        {
            var dto = new CourseDto { Title = "Existing", Description = "Desc" };
            _courseRepoMock.Setup(r => r.GetByTitleAsync(dto.Title)).ReturnsAsync(new Course { Id = 1 });

            Func<Task> act = async () => await _courseService.AddCourseAsync(dto);

            await act.Should().ThrowAsync<CourseTitleAlreadyExistsException>();
        }

        [Fact]
        public async Task AddCourseAsync_ShouldCallAddAsync_WhenTitleNotExists()
        {
            var dto = new CourseDto { Title = "New Course", Description = "Desc" };
            var course = new Course();

            _courseRepoMock.Setup(r => r.GetByTitleAsync(dto.Title)).ReturnsAsync((Course)null);
            _mapperMock.Setup(m => m.Map<Course>(dto)).Returns(course);

            await _courseService.AddCourseAsync(dto);

            _courseRepoMock.Verify(r => r.AddAsync(course), Times.Once);
        }

        [Fact]
        public async Task EnrollStudentAsync_ShouldThrow_WhenStudentAlreadyEnrolled()
        {
            int courseId = 1;
            var studentDto = new StudentDto { Id = 1, Name = "John" };
            _courseRepoMock.Setup(r => r.GetByIdAsync(courseId)).ReturnsAsync(new Course());
            _enrollmentRepoMock.Setup(r => r.GetEnrolledStudentsAsync(courseId))
                .ReturnsAsync(new List<Student> { new Student { Id = 1, Name = "John" } });

            Func<Task> act = async () => await _courseService.EnrollStudentAsync(courseId, studentDto);

            await act.Should().ThrowAsync<StudentEnrollmentAlreadyExist>();
        }

        [Fact]
        public async Task GenerateEnrollmentReportWithSummaryAsync_ShouldReturnSummary()
        {
            var courses = new List<Course>
        {
            new Course { Id = 1, Title = "Course 1" },
            new Course { Id = 2, Title = "Course 2" }
        };

            _courseRepoMock.Setup(r => r.GetAllAsync()).ReturnsAsync(courses);
            _enrollmentRepoMock.Setup(r => r.GetEnrolledStudentsAsync(It.IsAny<int>()))
                .ReturnsAsync(new List<Student>());

            _mapperMock.Setup(m => m.Map<StudentDto>(It.IsAny<Student>()))
                .Returns((Student s) => new StudentDto { Id = s.Id, Name = s.Name });

            var result = await _courseService.GenerateEnrollmentReportWithSummaryAsync();

            result.TotalCourses.Should().Be(2);
            result.TotalEnrollments.Should().Be(0);
            result.CourseEnrollments.Count.Should().Be(2);
        }
    }
}
