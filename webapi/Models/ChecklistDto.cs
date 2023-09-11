namespace webapi.Models
{
    public class ChecklistDto
    {
        public required string Title { get; set; }
        public required string CreatedAt { get; set; }
        public bool IsPinned { get; set; }
        public string? Color { get; set; }
        public string? Tags { get; set; }
        public List<ChecklistElementDto>? Elements { get; set; }
    }
}
