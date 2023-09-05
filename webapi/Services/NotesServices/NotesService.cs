using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Services.NotesServices
{
    public class NotesService : INotesService
    {
        private readonly NotesDb _context;

        public NotesService(NotesDb context)
        {
            _context = context;
        }

        public async Task<bool> Delete(long id)
        {
            if (_context.Notes == null)
            {
                return false;
            }

            var note = await _context.Notes.FindAsync(id);

            if (note == null)
            {
                return false;
            }

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Note>?> Get()
        {
            if (_context.Notes == null)
            {
                return null;
            }

            return await _context.Notes.ToListAsync();
        }

        public async Task<Note?> GetNote(long id)
        {
            if (_context.Notes == null)
            {
                return null;
            }

            Note? note = await _context.Notes.FindAsync(id);

            if (note == null)
            {
                return null;
            }

            return note;
        }

        public async Task<Note?> Post(Note note)
        {
            if (_context.Notes == null)
            {
                return null;
            }

            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return note;
        }

        public async Task<bool> Put(long id, Note note)
        {
            if (id != note.Id)
            {
                return false;
            }

            _context.Entry(note).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }

            return true;
        }

        private bool NoteExists(long id)
        {
            return (_context.Notes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
