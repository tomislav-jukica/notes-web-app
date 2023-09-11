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

        #region Note
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

        private bool NoteExists(long id)
        {
            return (_context.Notes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
        #endregion

        #region Checklist
        public async Task<IEnumerable<Checklist>?> GetChecklists()
        {
            if (_context.Checklists == null)
            {
                return null;
            }

            return await _context.Checklists.ToListAsync();
        }
        public async Task<Checklist?> GetChecklist(long id)
        {
            if (_context.Checklists == null)
            {
                return null;
            }

            Checklist? checklist = await _context.Checklists.FindAsync(id);

            if (checklist == null)
            {
                return null;
            }

            return checklist;
        }
        public async Task<bool> PutChecklist(long id, Checklist checklist)
        {
            if (id != checklist.Id)
            {
                return false;
            }

            _context.Entry(checklist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChecklistExists(id))
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
        public async Task<Checklist?> PostChecklist(ChecklistDto checklistDto)
        {
            if (_context.Checklists == null)
            {
                return null;
            }

            Checklist checklist = new()
            {
                Title = checklistDto.Title,
                CreatedAt = checklistDto.CreatedAt,
                IsPinned = checklistDto.IsPinned,
                Color = checklistDto.Color,
                Tags = checklistDto.Tags
            };

            _context.Checklists.Add(checklist);
            await _context.SaveChangesAsync();

            foreach (var elementDto in checklistDto.Elements)
            {
                var element = new ChecklistElement
                {
                    Title = elementDto.Title,
                    IsChecked = elementDto.IsChecked,
                    ChecklistId = checklist.Id 
                };

                _context.ChecklistElements.Add(element);
            }

            await _context.SaveChangesAsync();

            return checklist;
        }
        public async Task<bool> DeleteChecklist(long id)
        {
            //TODO delete all checklist elements as well
            if (_context.Checklists == null)
            {
                return false;
            }

            var checklist = await _context.Checklists.FindAsync(id);

            if (checklist == null)
            {
                return false;
            }

            _context.Checklists.Remove(checklist);
            await _context.SaveChangesAsync();
            return true;
        }

        private bool ChecklistExists(long id)
        {
            return (_context.Checklists?.Any(e => e.Id == id)).GetValueOrDefault();
        }
        #endregion
    }
}
