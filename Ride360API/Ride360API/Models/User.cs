namespace Ride360API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }
        public DateOnly? DateOfBirth { get; set; }
        public bool IsAdmin { get; set; }
        // One user can have many rides (inverse navigation property)
        public ICollection<Ride> Rides { get; set; } = new List<Ride>();
    }
}