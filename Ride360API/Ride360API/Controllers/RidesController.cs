using Ride360API.Data;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Ride360API.Dtos;
using Ride360API.Models;
using System.Security.Claims;

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
        public ActionResult<List<RideDto>> GetRides(int userId, [FromQuery] DateOnly? date = null)
        {
            // add validation for userId
            var rides = _dbContext.Rides
                .Where(r => r.UserId == userId);

            if (date.HasValue)
            {
                rides = rides.Where(r => r.StartTime.HasValue && DateOnly.FromDateTime(r.StartTime.Value) == date);
            }
                    
            var rideList = rides.ToList();

            var rideDtos = _mapper.Map<List<RideDto>>(rideList);

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
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdString) || !int.TryParse(userIdString, out int userId))
            {
                return Unauthorized("User ID not found or invalid in authentication claims.");
            }

            // !!!!!Update this to calculate duration!!!!!!
            var newRide = new Ride
            {
                Name = ride.Name,
                CategoryId = ride.CategoryId,
                Rating = ride.Rating,
                Description = ride.Description,
                StartTime = ride.StartTime,
                EndTime = ride.EndTime,
                UserId = userId
            };

            if (newRide.StartTime.HasValue)
            {
                newRide.Duration = ride.EndTime - ride.StartTime;
            }
            else
            {
                newRide.Duration = null;
            }
            
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
