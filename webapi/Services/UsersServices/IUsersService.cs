using webapi.Models;

namespace webapi.Services.UsersServices
{
    public interface IUsersService
    {
        public int UserExists(string username, string password);
        public Task<IEnumerable<User>?> Get();
        public Task<User?> Get(long id);
        public Task<bool> Put(long id, User note);
        public Task<User?> Post(User note);
        public Task<bool> Delete(long id);
    }
}
