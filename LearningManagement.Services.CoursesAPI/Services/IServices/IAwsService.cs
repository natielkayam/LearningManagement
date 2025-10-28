namespace LearningManagement.Services.CoursesAPI.Services.IServices
{
    public interface IAwsService
    {
        Task<string> UploadJsonAsync<T>(string key, T data);
        Task<string> UploadFileAsync(IFormFile file, string key);
        Task<bool> DeleteFileAsync(string key);
        Task<Stream?> GetFileAsync(string key);
    }
}
