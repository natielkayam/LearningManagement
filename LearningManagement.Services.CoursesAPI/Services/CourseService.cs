using AutoMapper;
using LearningManagement.Services.CoursesAPI.Exceptions;
using LearningManagement.Services.CoursesAPI.Models;
using LearningManagement.Services.CoursesAPI.Models.Dto;
using LearningManagement.Services.CoursesAPI.Repositories;
using LearningManagement.Services.CoursesAPI.Services.IServices;

namespace LearningManagement.Services.CoursesAPI.Services
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _courseRepository;
        private readonly ICourseEnrollmentRepository _courseEnrollmentRepository;
        private readonly IMapper _mapper;
        private readonly CourseService _courseService;


        public CourseService(ICourseRepository courseRepository,
            ICourseEnrollmentRepository courseEnrollmentRepository,
            IMapper mapper)
        {
            _courseRepository = courseRepository;
            _courseEnrollmentRepository = courseEnrollmentRepository;
            _mapper = mapper;
        }

        public async Task<CourseDto> GetCourseByIdAsync(int id)
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

        public async Task UpdateCourseAsync(CourseDto courseDto, int courseId)
        {
            var courseExists = await _courseRepository.GetByIdAsync(courseId);

            if (courseExists == null)
            {
                throw new CourseNotFoundException();
            }

            var course = _mapper.Map<Course>(courseDto);

            course.Id = courseId;

            await _courseRepository.UpdateAsync(course);
        }

        public async Task RemoveCourseAsync(int courseId)
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
    
        public async Task<List<StudentDto>> GetEnrolledStudentsAsync(int courseId)
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

        public async Task EnrollStudentAsync(int courseId, StudentDto studentDto)
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

            var courseEnrollment = new CourseEnrollment
            {
                CourseId = courseId,
                Student = student,
                EnrolledOn = DateTime.UtcNow
            };

            await _courseEnrollmentRepository.EnrollStudentAsync(courseEnrollment);
        }

        public async Task RemoveStudentEnrollmentAsync(int courseId, int studentId)
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

            var report = new List<EnrollmentReportDto>();

            int totalEnrollments = 0;

            foreach (var course in courses)
            {
                var students = await _courseEnrollmentRepository.GetEnrolledStudentsAsync(course.Id);
                
                totalEnrollments += students.Count;

                report.Add(new EnrollmentReportDto
                {
                    CourseTitle = course.Title,
                    StudentCount = students.Count,
                    Students = students.Select(s => _mapper.Map<StudentDto>(s)).ToList()
                });
            }

            // Sort courses by number of students descending
            var sortedReport = report.OrderByDescending(r => r.StudentCount).ToList();

            return new EnrollmentReportSummaryDto
            {
                TotalCourses = courses.Count(),
                TotalEnrollments = totalEnrollments,
                CourseEnrollments = sortedReport
            };
        }
    }
}
