namespace LearningManagement.Services.CoursesAPI.Exceptions
{
    public class CourseAlreadyExistsException : Exception
    {
        public CourseAlreadyExistsException() 
            : base("Course already exsist")
        {
        }
    }
}
