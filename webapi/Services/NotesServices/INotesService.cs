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


        //public Task<IEnumerable<Checklist>?> GetChecklists();
        //public Task<Checklist?> GetChecklist(long id);
        //public Task<bool> PutChecklist(long id, Checklist checklist);
        public Task<Checklist?> PostChecklist(ChecklistDto checklist);
        //public Task<bool> DeleteChecklist(long id);
    }
}
