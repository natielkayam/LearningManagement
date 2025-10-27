using LearningManagement.Services.CoursesAPI.Data;
using LearningManagement.Services.CoursesAPI.Extensions;
using LearningManagement.Services.CoursesAPI.Models;
using LearningManagement.Services.CoursesAPI.Repositories;
using LearningManagement.Services.CoursesAPI.Services;
using LearningManagement.Services.CoursesAPI.Services.IServices;
using Serilog;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddSingleton<InMemoryDbContext>();

builder.Services.AddScoped<ICourseService, CourseService>();

builder.Services.AddScoped<ICourseRepository , CourseRepository>();

builder.Services.AddScoped<ICourseEnrollmentRepository, CourseEnrollmentRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS configuration without specifying an origin
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin",
        builder => builder.AllowAnyOrigin()  // Allows all origins
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

var awsSettings = builder.Configuration.GetSection("AWS").Get<AwsSettings>();

LoggingExtensions.ConfigureSerilog(awsSettings);

builder.Host.UseSerilog();

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
