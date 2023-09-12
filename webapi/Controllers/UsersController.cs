using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Services.UsersServices;

namespace webapi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            var result = await _usersService.Get();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetNote(long id)
        {
            var result = await _usersService.Get(id);
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(long id, User user)
        {
            bool result = await _usersService.Put(id, user);
            return result ? Ok() : BadRequest();
        }

        [HttpPost]
        public async Task<ActionResult<User>> Post(User user)
        {
            var result = await _usersService.Post(user);
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            bool result = await _usersService.Delete(id);
            return result ? Ok() : NotFound();
        }
    }
}

