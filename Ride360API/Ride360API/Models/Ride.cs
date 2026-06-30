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
        // Why startTime is not nullable, but endTime is::
        // The ride is created once user clicks 'Start Ride'.
        // This differs to previous implementation where ride was created when user clicks 'Stop Ride'.
        //  Current way is better as backend is more accurate for calculating times, and frontend start
        //  time may be lost (would have to store in localstorage etc)
        // Also we need endTime to be nullable in order to check if active ride exists, so that we can
        // show duration of ride correctly, even after user closes/hides app for a while.
        public DateTime StartTime { get; set; } = DateTime.UtcNow;
        public DateTime? EndTime { get; set; }
    }
}
