namespace Ride360API.Models
// category (e.g., "Commute", "Leisure", "Work", "Errand", "Travel", "Motorway", "Twisty Roads", "Urban", "Off-road/Trail", "Scenic Route"),
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Colour { get; set; }
        public string? Keywords { get; set; }

        // One Category can have many rides (inverse navigation property)
        public ICollection<Ride> Rides { get; set; } = new List<Ride>();
    }
}
