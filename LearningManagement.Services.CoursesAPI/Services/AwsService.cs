using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using LearningManagement.Services.CoursesAPI.Models;
using LearningManagement.Services.CoursesAPI.Services.IServices;
using Microsoft.Extensions.Options;
using System.Text;
using System.Text.Json;

namespace LearningManagement.Services.CoursesAPI.Services
{
    public class AwsService : IAwsService
    {
        private readonly AwsSettings _awsSettings;
        private readonly IAmazonS3 _s3Client;

        public AwsService(IOptions<AwsSettings> awsOptions)
        {
            _awsSettings = awsOptions.Value;
            _s3Client = new AmazonS3Client(
                _awsSettings.AccessKey,
                _awsSettings.SecretKey,
                RegionEndpoint.GetBySystemName(_awsSettings.Region)
            );
        }

        public async Task<string> UploadJsonAsync<T>(string key, T data)
        {
            var json = JsonSerializer.Serialize(data, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            using var stream = new MemoryStream(Encoding.UTF8.GetBytes(json));

            var request = new PutObjectRequest
            {
                BucketName = _awsSettings.BucketName,
                Key = key,
                InputStream = stream,
                ContentType = "application/json",
                CannedACL = S3CannedACL.PublicRead // or private
            };

            await _s3Client.PutObjectAsync(request);

            return $"https://{_awsSettings.BucketName}.s3.{_awsSettings.Region}.amazonaws.com/{key}";
        }

        public async Task<string> UploadFileAsync(IFormFile file, string key)
        {
            using var stream = file.OpenReadStream();

            var request = new PutObjectRequest
            {
                BucketName = _awsSettings.BucketName,
                Key = key,
                InputStream = stream,
                ContentType = file.ContentType,
                CannedACL = S3CannedACL.PublicRead
            };

            await _s3Client.PutObjectAsync(request);

            return $"https://{_awsSettings.BucketName}.s3.{_awsSettings.Region}.amazonaws.com/{key}";
        }

        public async Task<bool> DeleteFileAsync(string key)
        {
            var response = await _s3Client.DeleteObjectAsync(_awsSettings.BucketName, key);
            
            return response.HttpStatusCode == System.Net.HttpStatusCode.NoContent;
        }

        public async Task<Stream?> GetFileAsync(string key)
        {
            try
            {
                var response = await _s3Client.GetObjectAsync(_awsSettings.BucketName, key);
                
                return response.ResponseStream;
            }
            catch (AmazonS3Exception e) when (e.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }
        }
    }
}
