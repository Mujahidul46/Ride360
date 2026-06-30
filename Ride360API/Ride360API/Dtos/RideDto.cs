using Ride360API.Dtos;

namespace Ride360API.Dtos
{
    public class RideDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CategoryDto Category { get; set; }
        public int? CategoryId { get; set; }
        public int? Rating { get; set; }
        public string? Description { get; set; }
        public TimeSpan? Duration { get; set; }
        public UserDto User { get; set; }
        public int UserId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime? EndTime { get; set; }

    }
}