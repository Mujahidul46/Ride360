using AutoMapper;
using Ride360API.Dtos;
using Ride360API.Models;

namespace Ride360API.Mappings {
    public class MappingProfile : Profile {
        
        public MappingProfile()
        {
            CreateMap<Ride, RideDto>();
        }
        
    }


}