using AutoMapper;
using LearningManagement.Services.CoursesAPI.Models;
using LearningManagement.Services.CoursesAPI.Models.Dto;

namespace LearningManagement.Services.CoursesAPI.Mapping.Profiles
{
    public class EnrollmentProfile : Profile
    {
        public EnrollmentProfile()
        {
            CreateMap<EnrollmentDto, Enrollment>().ReverseMap();
        }
    }
}
