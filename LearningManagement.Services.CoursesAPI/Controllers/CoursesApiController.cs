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
        public async Task<IActionResult> GetCourseById([FromQuery] string courseId)
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

        [HttpPost("create")]
        public async Task<IActionResult> CreateCourse([FromBody] CourseDto courseDto)
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
        public async Task<IActionResult> UpdateCourse([FromBody] CourseDto courseDto)
        {
            try
            {
                await _courseService.UpdateCourseAsync(courseDto);

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating course : {@courseDto}", courseDto);

                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpDelete("remove")]
        public async Task<IActionResult> RemoveCourse([FromQuery] string courseId)
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

        [HttpPost("enrollment/assign")]
        public async Task<IActionResult> EnrollStudent([FromQuery] string courseId, StudentDto studentDto)
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

        [HttpDelete("enrollment/unassign")]
        public async Task<IActionResult> UnassignStudentEnrollment([FromQuery] string courseId, [FromQuery] string studentId)
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

        [HttpGet("enrollment/students")]
        public async Task<IActionResult> GetEnrolledStudents([FromQuery] string courseId)
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

        [HttpGet("enrollment/get-all")]
        public async Task<IActionResult> GetEnrollements()
        {
            try
            {
                var enrollments = await _courseService.GetEnrollmentsAsync();

                return Ok(enrollments);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving enrollments");

                return BadRequest(ex.Message.ToString());
            }
        }

        [HttpGet("enrollment/report")]
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

        [HttpPost("reports/save-to-s3")]
        public async Task<IActionResult> SaveEnrollmentReportToS3([FromBody] EnrollmentReportSummaryDto enrollmentReportSummaryDto)
        {
            try
            {
                var url = await _courseService.SaveEnrollmentReportAsync(enrollmentReportSummaryDto);

                return Ok(url);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving enrollment report to S3");

                return BadRequest(ex.Message);
            }
        }
    }
}
