namespace LearningManagement.Services.CoursesAPI.Exceptions
{
    public class CoursesNotFoundException : Exception
    {
        public CoursesNotFoundException() 
            : base("courses not found")
        {
        }
    }
}
