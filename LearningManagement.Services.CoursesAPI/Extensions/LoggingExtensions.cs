using LearningManagement.Services.CoursesAPI.Models;
using Amazon.CloudWatchLogs;
using Amazon;
using Serilog.Events;
using Serilog.Formatting.Compact;
using Serilog.Sinks.AwsCloudWatch;
using Serilog;

namespace LearningManagement.Services.CoursesAPI.Extensions
{
    public static class LoggingExtensions
    {
        public static void ConfigureSerilog(AwsSettings awsSettings)
        {
            var region = RegionEndpoint.GetBySystemName(awsSettings.Region);

            var cloudWatchClient = new AmazonCloudWatchLogsClient(region);

            var cloudWatchOptions = new CloudWatchSinkOptions
            {
                LogGroupName = awsSettings.LogGroup ?? "DefaultLogGroup",
                LogStreamNameProvider = new DefaultLogStreamProvider(),
                TextFormatter = new CompactJsonFormatter(),
                CreateLogGroup = true,
                MinimumLogEventLevel = LogEventLevel.Information
            };

            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .WriteTo.AmazonCloudWatch(cloudWatchOptions, cloudWatchClient)
                .CreateLogger();
        }
    }

}
