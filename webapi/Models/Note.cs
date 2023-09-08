using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class Note
    {
        public long Id { get; set; }

        [Required(ErrorMessage ="Title can't be empty.")]
        public required string Title { get; set; }

        public string? Content { get; set; }

        public required string CreatedAt { get; set; }
        public bool IsPinned { get; set; }
    }
}
