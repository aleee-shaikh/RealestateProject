using System.Collections.Generic;

namespace RealEstate.Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; } = null!;
        public string? Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
    }
}
