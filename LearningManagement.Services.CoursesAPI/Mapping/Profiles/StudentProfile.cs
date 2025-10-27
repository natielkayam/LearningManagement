using AutoMapper;
using LearningManagement.Services.CoursesAPI.Models;
using LearningManagement.Services.CoursesAPI.Models.Dto;

namespace LearningManagement.Services.CoursesAPI.Mapping.Profiles
{
    public class StudentProfile : Profile
    {
        public StudentProfile()
        {
            CreateMap<StudentDto, Student>().ReverseMap();
        }
    }
}
