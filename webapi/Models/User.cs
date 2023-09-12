using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class User
    {
        public long Id { get; set; }

        [Required(ErrorMessage = "Username can't be empty.")]
        public required string Username { get; set; }
        [Required(ErrorMessage = "Password can't be empty.")]
        public required string Password { get; set; }

    }
}
