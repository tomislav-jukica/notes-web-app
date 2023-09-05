using Microsoft.EntityFrameworkCore;

namespace webapi.Models
{
    public class NotesDb : DbContext
    {
        public NotesDb(DbContextOptions options) : base(options) { }
        public DbSet<Note> Notes { get; set; } = null!;
    }
}
