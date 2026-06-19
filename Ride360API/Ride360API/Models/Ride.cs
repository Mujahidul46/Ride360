using System.ComponentModel;

namespace Ride360API.Models
{
    public class Ride
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Category Category { get; set; }
        public int? CategoryId { get; set; }
        public int? Rating { get; set; }
        public string? Description { get; set; }
        public TimeSpan? Duration { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime EndTime { get; set; } = DateTime.UtcNow;
    }
}
