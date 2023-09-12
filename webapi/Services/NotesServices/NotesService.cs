using Microsoft.EntityFrameworkCore;
using webapi.Dto;
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

        public async Task<IEnumerable<ChecklistElement>?> GetChecklistElements(long id)
        {
            if (_context.ChecklistElements == null)
            {
                return null;
            }

            var allElements = await _context.ChecklistElements.ToListAsync();
            var retVal = new List<ChecklistElement>();
            foreach (var element in allElements)
            {
                if (element.ChecklistId == id)
                {
                    retVal.Add(element);
                }
            }

            return retVal;
        }

        public async Task<ChecklistDto?> GetChecklist(long id)
        {
            if (_context.Checklists == null)
            {
                return null;
            }

            Checklist? checklist = await _context.Checklists.FindAsync(id);
            List<ChecklistElement> checklistElements = await _context.ChecklistElements.Where(e => e.ChecklistId == id).ToListAsync();
            List<ChecklistElementDto> checklistElementDto = new();
            if (checklist == null)
            {
                return null;
            }

            for (int i = 0; i < checklistElements.Count; i++)
            {
                ChecklistElementDto element = new();
                element.Title = checklistElements[i].Title;
                element.IsChecked = checklistElements[i].IsChecked;
                checklistElementDto.Add(element);
              } 

            ChecklistDto checklistDto = new()
            {
                Title = checklist.Title,
                CreatedAt = checklist.CreatedAt,
                Color = checklist.Color,
                IsPinned = checklist.IsPinned,
                Tags = checklist.Tags,
                Elements = checklistElementDto,
            };

            return checklistDto;
        }
        public async Task<bool> PutChecklist(long id, ChecklistDto checklistDto)
        {
            var checklist = await _context.Checklists.FirstOrDefaultAsync(c => c.Id == id);
            if (checklist == null)
            {
                return false;
            }

            checklist.Title = checklistDto.Title;
            checklist.CreatedAt = checklistDto.CreatedAt;
            checklist.IsPinned = checklistDto.IsPinned;
            checklist.Color = checklistDto.Color;
            checklist.Tags = checklistDto.Tags;

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

            var checklistElements = await _context.ChecklistElements.Where(e => e.ChecklistId == id).ToListAsync();

            for (int i = 0; i < checklistElements.Count; i++)
            {
                checklistElements[i].Title = checklistDto.Elements[i].Title;
                checklistElements[i].IsChecked = checklistDto.Elements[i].IsChecked;
                _context.Entry(checklistElements[i]).State = EntityState.Modified;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
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
            if (_context.Checklists == null)
            {
                return false;
            }

            var checklist = await _context.Checklists.FindAsync(id);
            if (checklist == null)
            {
                return false;
            }

            var checklistElements = await _context.ChecklistElements.Where(e => e.ChecklistId == checklist.Id).ToListAsync();

            for (int i = 0; i < checklistElements.Count; i++)
            {
                _context.ChecklistElements.Remove(checklistElements[i]);
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
