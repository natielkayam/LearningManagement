using AutoMapper;
using LearningManagement.Services.CoursesAPI.Exceptions;
using LearningManagement.Services.CoursesAPI.Models;
using LearningManagement.Services.CoursesAPI.Models.Dto;
using LearningManagement.Services.CoursesAPI.Repositories;
using LearningManagement.Services.CoursesAPI.Services.IServices;
using Microsoft.Extensions.Options;

namespace LearningManagement.Services.CoursesAPI.Services
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IEnrollmentRepository _courseEnrollmentRepository;
        private readonly IMapper _mapper;
        private readonly IAwsService _awsService;

        public CourseService(ICourseRepository courseRepository,
            IEnrollmentRepository courseEnrollmentRepository,
            IMapper mapper, IAwsService awsService)
        {
            _courseRepository = courseRepository;
            _courseEnrollmentRepository = courseEnrollmentRepository;
            _mapper = mapper;
            _awsService = awsService;
        }

        public async Task<CourseDto> GetCourseByIdAsync(string id)
        {
            var course = await _courseRepository.GetByIdAsync(id);
            
            if (course == null)
            {                
                throw new CourseNotFoundException();
            }

            var courseDto = _mapper.Map<CourseDto>(course);

            return courseDto;
        }

        public async Task AddCourseAsync(CourseDto courseDto)
        {
            var courseExists = await _courseRepository.GetByTitleAsync(courseDto.Title);
            
            if (courseExists != null)
            {
                throw new CourseTitleAlreadyExistsException();
            }

            var course = _mapper.Map<Course>(courseDto);

            await _courseRepository.AddAsync(course);
        }

        public async Task UpdateCourseAsync(CourseDto courseDto)
        {
            var courseExists = await _courseRepository.GetByIdAsync(courseDto.Id);

            if (courseExists == null)
            {
                throw new CourseNotFoundException();
            }

            var course = _mapper.Map<Course>(courseDto);

            course.Id = courseDto.Id;

            await _courseRepository.UpdateAsync(course);
        }

        public async Task RemoveCourseAsync(string courseId)
        {
            var course = await _courseRepository.GetByIdAsync(courseId);

            if (course == null)
            {
                throw new CourseNotFoundException();
            }

            await _courseRepository.RemoveAsync(courseId);
        }

        public async Task<List<CourseDto>> GetCoursesAsync()
        {
            var courses = await _courseRepository.GetAllAsync();

            if (courses == null)
            {
                throw new CoursesNotFoundException();
            }

            var courseDtos = _mapper.Map<List<CourseDto>>(courses);

            return courseDtos;
        }
    
        public async Task<List<StudentDto>> GetEnrolledStudentsAsync(string courseId)
        {
            var course = await _courseRepository.GetByIdAsync(courseId);

            if (course == null)
            {
                throw new CourseNotFoundException();
            }

            var students = await _courseEnrollmentRepository.GetEnrolledStudentsAsync(courseId);

            var studentsDto = _mapper.Map<List<StudentDto>>(students);

            return studentsDto;
        }

        public async Task EnrollStudentAsync(string courseId, StudentDto studentDto)
        {
            var course = await _courseRepository.GetByIdAsync(courseId);

            if (course == null)
            {
                throw new CourseNotFoundException();
            }

            var enrolledStudents = await _courseEnrollmentRepository.GetEnrolledStudentsAsync(courseId);

            if (enrolledStudents.Any(s => s.Id == studentDto.Id))
            {
                throw new StudentEnrollmentAlreadyExist();
            }

            var student = _mapper.Map<Student>(studentDto);
            
            student.Id = studentDto.Id;

            var courseEnrollment = new Enrollment
            {
                CourseId = courseId,
                StudentId = student.Id,
                Student = student,
                EnrolledOn = DateTime.UtcNow
            };

            await _courseEnrollmentRepository.EnrollStudentAsync(courseEnrollment);
        }

        public async Task RemoveStudentEnrollmentAsync(string courseId, string studentId)
        {
            var course = await _courseRepository.GetByIdAsync(courseId);

            if (course == null)
            {
                throw new CourseNotFoundException();
            }

            var courseEnrollment = await _courseEnrollmentRepository.GetEnrollmentAsync(courseId, studentId);
            
            if (courseEnrollment == null)
            {
                throw new CourseEnrollmentNotFoundException();
            }

            await _courseEnrollmentRepository.RemoveStudentAsync(courseEnrollment);
        }

        public async Task<EnrollmentReportSummaryDto> GenerateEnrollmentReportWithSummaryAsync()
        {
            var courses = await _courseRepository.GetAllAsync();
            if (courses == null || !courses.Any())
            {
                return new EnrollmentReportSummaryDto
                {
                    TotalCourses = 0,
                    TotalEnrollments = 0,
                    CourseEnrollments = new List<EnrollmentReportDto>()
                };
            }

            // Get all enrollments at once (if your repository supports it, better than querying per course)
            var allEnrollments = await _courseEnrollmentRepository.GetEnrollmentsAsync();

            // Group enrollments by course
            var report = courses
                .Select(course =>
                {
                    var courseEnrollments = allEnrollments
                        .Where(e => e.CourseId == course.Id)
                        .Select(e => _mapper.Map<EnrollmentDto>(e))
                        .ToList();

                    return new EnrollmentReportDto
                    {
                        CourseId = course.Id,
                        CourseTitle = course.Title,
                        StudentCount = courseEnrollments.Count,
                        Students = courseEnrollments
                    };
                })
                .OrderByDescending(r => r.StudentCount)  // Sort by number of students
                .ToList();

            return new EnrollmentReportSummaryDto
            {
                TotalCourses = courses.Count(),
                TotalEnrollments = report.Sum(r => r.StudentCount),
                CourseEnrollments = report
            };
        }

        public async Task<List<EnrollmentDto>> GetEnrollmentsAsync()
        {
            var enrollments = await _courseEnrollmentRepository.GetEnrollmentsAsync();

            if (enrollments == null)
            {
                throw new CourseEnrollmentNotFoundException();
            }

            var enrollmentsDtos = _mapper.Map<List<EnrollmentDto>>(enrollments);

            return enrollmentsDtos;
        }

        public async Task<string> SaveEnrollmentReportAsync(EnrollmentReportSummaryDto report)
        {
            string key = $"reports/enrollment-report-{DateTime.UtcNow:yyyyMMddHHmmss}.json";
            
            var url = await _awsService.UploadJsonAsync(key, report);

            return url;
        }
    }
}
