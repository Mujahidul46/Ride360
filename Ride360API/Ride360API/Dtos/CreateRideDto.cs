using System.ComponentModel.DataAnnotations;

namespace Ride360API.Dtos
{
    public class CreateRideDto
    {
        [Required]
        [StringLength(maximumLength: 100, MinimumLength = 1, ErrorMessage = "Ride name must be between 1 and 100 characters.")]
        public string Name { get; set; }

        [StringLength(maximumLength: 200, ErrorMessage = "Ride description must be less than 200 characters.")]
        public string? Description { get; set; }

        [Range(0, 5)]
        public int? Rating { get; set; }

        public int? CategoryId { get; set; }

        public DateTime StartTime { get; set; }

        public DateTime? EndTime { get; set; }
    }
}