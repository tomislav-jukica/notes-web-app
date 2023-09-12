using Microsoft.EntityFrameworkCore;

namespace webapi.Models
{
    public class NotesDb : DbContext
    {
        public NotesDb(DbContextOptions options) : base(options) { }
        public DbSet<Note> Notes { get; set; } = null!;
        public DbSet<Checklist> Checklists { get; set; } = null!;
        public DbSet<ChecklistElement> ChecklistElements { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
