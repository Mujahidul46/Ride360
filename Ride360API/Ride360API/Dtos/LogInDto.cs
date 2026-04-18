using System.ComponentModel.DataAnnotations;

namespace Ride360API.Dtos
{
    public class LogInDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
