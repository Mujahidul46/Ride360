using Ride360API.Data;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Ride360API.Dtos;
using Ride360API.Models;

namespace ExpenseTrackerAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class RidesController : ControllerBase
    {
        public readonly Ride360Context _dbContext;
        private readonly IMapper _mapper;


        public RidesController(Ride360Context dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        //GET /api/rides/users/1?date=2026-03-05
        [HttpGet("users/{userId}")]
        public ActionResult<List<RideDto>> GetRides(int userId, [FromQuery] DateTime? date = null)
        {
            var filterDate = (date ?? DateTime.Today).Date; // Extract just the date part

            // add validation for userId
            var rides = _dbContext.Rides
                .Where(rides => rides.UserId == userId)
                .Where(rides => rides.CreatedAt.Date == filterDate)
                .ToList();

            var rideDtos = _mapper.Map<List<RideDto>>(rides);

            return Ok(rideDtos);
        }

        [HttpGet("{id}")]
        public ActionResult<RideDto> GetRideById(int id)
        {
            var ride = _dbContext.Rides.Find(id);
            if (ride == null)
            {
                return NotFound();
            }
            var rideDto = _mapper.Map<RideDto>(ride);
            return rideDto;
        }

        [HttpPost]
        public ActionResult<RideDto> CreateRide(CreateRideDto ride)
        {
            var newRide = new Ride
            {
                Name = ride.Name,
                UserId = ride.UserId
            };
            
            _dbContext.Rides.Add(newRide);
            _dbContext.SaveChanges();

            var rideDto = _mapper.Map<RideDto>(newRide);

            return CreatedAtAction(nameof(GetRideById), // Tells ASP.NET to use the GetExpenseById method to generate the URL
                new { id = rideDto.Id }, // Supplies the new expense's Id to GetExpenseById method
                rideDto); // The newly created expense object's data so we can see it in the response body
        }


        [HttpDelete("{id}")]
        public ActionResult DeleteRide(int id)
        {
            var ride = _dbContext.Rides.Find(id);
            if (ride == null)
            {
                return NotFound(); 
            }
            _dbContext.Rides.Remove(ride);
            _dbContext.SaveChanges();
            return NoContent();
        }
    }
}
