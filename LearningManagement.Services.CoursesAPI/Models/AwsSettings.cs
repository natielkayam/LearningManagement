namespace LearningManagement.Services.CoursesAPI.Models
{
    public class AwsSettings
    {
        public string AccessKey { get; set; }
        public string SecretKey { get; set; }
        public string Region { get; set; }
        public string LogGroup { get; set; }
        public string LogStream { get; set; }
        public string BucketName { get; set; }
    }
}
