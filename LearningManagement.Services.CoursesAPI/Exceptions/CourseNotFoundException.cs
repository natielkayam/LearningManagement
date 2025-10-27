namespace LearningManagement.Services.CoursesAPI.Exceptions
{
    public class CourseNotFoundException : Exception
    {
        public CourseNotFoundException() 
            : base("The requested course was not found")
        {
        }
    }
}
