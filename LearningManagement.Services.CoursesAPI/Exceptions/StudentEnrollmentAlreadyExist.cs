namespace LearningManagement.Services.CoursesAPI.Exceptions
{
    public class StudentEnrollmentAlreadyExist : Exception
    {
        public StudentEnrollmentAlreadyExist()
            : base("The student is already enrolled in this course.")
        {
        }
    }
}
