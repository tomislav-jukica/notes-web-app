namespace webapi.Models
{
    public class ChecklistElement
    {
        public long Id { get; set; }
        public long ChecklistId { get; set; }
        public string? Title { get; set; }
        public bool IsChecked { get; set; }
    }
}
