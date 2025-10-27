namespace LearningManagement.Services.CoursesAPI.Exceptions
{
    public class CourseTitleAlreadyExistsException : Exception
    {
        public CourseTitleAlreadyExistsException() 
            : base("Course with this title already exsist")
        {
        }
    }
}
