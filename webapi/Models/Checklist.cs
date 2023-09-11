using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
    public class Checklist
    {
        public long Id { get; set; }
        [Required(ErrorMessage = "Title can't be empty.")]
        public required string Title { get; set; }
        public required string CreatedAt { get; set; }
        public bool IsPinned { get; set; }
        public string? Color { get; set; }
        public string? Tags { get; set; }
    }
}