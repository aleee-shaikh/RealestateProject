namespace RealEstate.Api.Models
{
    public class Favorite
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int PropertyId { get; set; }
        public User User { get; set; } = null!;
        public Property Property { get; set; } = null!;
    }
}
