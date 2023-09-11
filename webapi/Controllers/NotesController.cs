using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services.NotesServices;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : Controller
    {
        private readonly INotesService _notesService;

        public NotesController(INotesService notesService)
        {
            _notesService = notesService;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> Get()
        {
            var result = await _notesService.Get();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Note>> GetNote(long id)
        {
            var result = await _notesService.GetNote(id);
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, Note note)
        {
            bool result = await _notesService.Put(id, note);
            return result ? Ok() : BadRequest();
        }

        [HttpPost]
        public async Task<ActionResult<Note>> Post(Note note)
        {
            var result = await _notesService.Post(note);
            if (result == null)
            {
                return NotFound();                
            }

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            bool result = await _notesService.Delete(id);
            return result ? Ok() : NotFound();
        }


        [HttpGet("/notes/checklist")]
        public async Task<ActionResult<IEnumerable<Checklist>>> GetChecklists()
        {
            var result = await _notesService.GetChecklists();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("/notes/checklist/elements/{id}")]
        public async Task<ActionResult<IEnumerable<Checklist>>> GetChecklistElements(long id)
        {
            var result = await _notesService.GetChecklistElements(id);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("/notes/checklist/{id}")]
        public async Task<ActionResult<Checklist>> GetChecklist(long id)
        {
            var result = await _notesService.GetChecklist(id);
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPut("/notes/checklist/{id}")]
        public async Task<IActionResult> PutChecklist(long id, ChecklistDto checklistDto)
        {
            bool result = await _notesService.PutChecklist(id, checklistDto);
            return result ? Ok() : BadRequest();
        }

        [HttpPost("/notes/checklist")]
        public async Task<ActionResult<Checklist>> PostChecklist(ChecklistDto checklistDto)
        {
            var result = await _notesService.PostChecklist(checklistDto);
            if(result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpDelete("/notes/checklist/{id}")]
        public async Task<IActionResult> DeleteChecklist(long id)
        {
            bool result = await _notesService.DeleteChecklist(id);
            return result ? Ok() : NotFound();
        }
    }
}

