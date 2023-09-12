using webapi.Dto;
using webapi.Models;

namespace webapi.Services.NotesServices
{
    public interface INotesService
    {
        public Task<IEnumerable<Note>?> Get();
        
        public Task<Note?> GetNote(long id);
        public Task<bool> Put(long id, Note note);
        public Task<Note?> Post(Note note);
        public Task<bool> Delete(long id);


        public Task<IEnumerable<Checklist>?> GetChecklists();
        public Task<IEnumerable<ChecklistElement>?> GetChecklistElements(long id);
        public Task<ChecklistDto?> GetChecklist(long id);
        public Task<bool> PutChecklist(long id, ChecklistDto checklist);
        public Task<Checklist?> PostChecklist(ChecklistDto checklist);
        public Task<bool> DeleteChecklist(long id);
    }
}
