using AutoMapper;
using LearningManagement.Services.CoursesAPI.Models;
using LearningManagement.Services.CoursesAPI.Models.Dto;

namespace LearningManagement.Services.CoursesAPI.Mapping.Profiles
{
    public class CourseProfile : Profile
    {
        public CourseProfile()
        {
            CreateMap<CourseDto, Course>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());

            CreateMap<Course, CourseDto>();
        }
    }
}
