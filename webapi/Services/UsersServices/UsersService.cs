using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Services.UsersServices
{
    public class UsersService : IUsersService
    {
        private readonly NotesDb _context;

        public UsersService(NotesDb context)
        {
            _context = context;
        }

        public int UserExists(string username, string password)
        {
            var user =  _context.Users.Where(x => x.Username == username && x.Password == password).FirstOrDefault();
            if(user != null)
            {
                return user.Role;
            }

            return -1;
        }


        public async Task<IEnumerable<User>?> Get()
        {
            if (_context.Users == null)
            {
                return null;
            }

            return await _context.Users.ToListAsync();
        }

        public async Task<User?> Get(long id)
        {
            if (_context.Users == null)
            {
                return null;
            }

            User? user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return null;
            }

            return user;
        }

        public async Task<bool> Put(long id, User user)
        {
            if (id != user.Id)
            {
                return false;
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        public async Task<User?> Post(User user)
        {
            if (_context.Users == null)
            {
                return null;
            }
            //TODO hash and salt the password
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<bool> Delete(long id)
        {
            if (_context.Users == null)
            {
                return false;
            }

            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return false;
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
       
        private bool UserExists(long id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
