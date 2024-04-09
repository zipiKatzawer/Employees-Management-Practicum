using AutoMapper;
using EmployeeManagement.API.Models;
using EmployeeManagement.Core.Entities;

namespace EmployeeManagement.API.Mapping
{
    public class PostModelMappingProfile:Profile
    {
        public PostModelMappingProfile()
        {
            CreateMap<EmployeePositionsPostModel, EmployeePositions>();
            CreateMap<EmployeePostModel, Employee>();
        }
    }
}
