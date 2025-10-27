using LearningManagement.Services.CoursesAPI.Models.Dto;
using LearningManagement.Services.CoursesAPI.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace LearningManagement.Services.CoursesAPI.Controllers
{
    [Route("api/courses")]
    [ApiController]
    public class CoursesApiController : ControllerBase
    {
        private readonly ICourseService _courseService;
        private readonly ILogger<CoursesApiController> _logger;

        public CoursesApiController(ILogger<CoursesApiController> logger,
            ICourseService courseService)
        {

            _logger = logger;
            _courseService = courseService;
        }

        [HttpGet("get")]
        public async Task<IActionResult> GetCourseById([FromQuery] int courseId)
        {
            try
            {
                var course = await _courseService.GetCourseByIdAsync(courseId);

                return Ok(course);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving course {id}", courseId);

                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet("get-all")]
        public async Task<IActionResult> GetCourses()
        {
            try
            {
                var courses = await _courseService.GetCoursesAsync();

                return Ok(courses);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving courses");

                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddCourse([FromBody] CourseDto courseDto)
        {
            try
            {
                await _courseService.AddCourseAsync(courseDto);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding course : {@courseDto}", courseDto);

                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateCourse([FromBody] CourseDto courseDto, int courseId)
        {
            try
            {
                await _courseService.UpdateCourseAsync(courseDto, courseId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating course : {@courseDto}", courseDto);

                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpDelete("remove")]
        public async Task<IActionResult> RemoveCourse([FromQuery] int courseId)
        {
            try
            {
                await _courseService.RemoveCourseAsync(courseId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error removing course {id}", courseId);

                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpPost("assign")]
        public async Task<IActionResult> EnrollStudent([FromQuery] int courseId, StudentDto studentDto)
        {
            try
            {
                await _courseService.EnrollStudentAsync(courseId, studentDto);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error enrolling student : {@studentDto} to course : {@courseId}", studentDto, courseId);

                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpDelete("remove-enrollment")]
        public async Task<IActionResult> RemoveStudentEnrollment([FromQuery] int courseId, [FromQuery] int studentId)
        {
            try
            {
                await _courseService.RemoveStudentEnrollmentAsync(courseId, studentId);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error removing student {studentId} enrollment for course {courseId}", studentId, courseId);

                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet("enrolled-students")]
        public async Task<IActionResult> GetEnrolledStudents([FromQuery] int courseId)
        {
            try
            {
                var students = await _courseService.GetEnrolledStudentsAsync(courseId);

                return Ok(students);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving enrolled students for course {courseId}", courseId);

                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet("enrollment-report-summary")]
        public async Task<IActionResult> GetEnrollmentReportSummary()
        {
            try
            {
                var report = await _courseService.GenerateEnrollmentReportWithSummaryAsync();
                
                return Ok(report);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating enrollment report summary");
                
                return BadRequest(ex.Message);
            }
        }

    }
}
