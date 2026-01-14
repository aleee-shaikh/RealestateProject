using Microsoft.EntityFrameworkCore;
using RealEstate.Api.Data;
using RealEstate.Api.Models;

public class FavoriteService : IFavoriteService
{
    private readonly AppDbContext _db;
    public FavoriteService(AppDbContext db) { _db = db; }

    public void Toggle(string email, int propertyId)
    {
        var user = _db.Users.First(u => u.Email == email);
        if (user == null) throw new Exception("User not found");

        var favorite = _db.Favorites
            .FirstOrDefault(f => f.UserId == user.Id && f.PropertyId == propertyId);

        if (favorite != null)
        {
            _db.Favorites.Remove(favorite); // already favorited, remove
        }
        else
        {
            _db.Favorites.Add(new Favorite
            {
                UserId = user.Id,
                PropertyId = propertyId
            });
        }

        _db.SaveChanges();

    }

    public IEnumerable<PropertyDto> MyFavorites(string email) =>
        _db.Favorites.Include(f => f.Property)
        .Where(f => f.User.Email == email)
        .Select(f => new PropertyDto(
            f.Property.Id, f.Property.Title, f.Property.Address, f.Property.Price,
            f.Property.ListingType, f.Property.Bedrooms, f.Property.Bathrooms,
            f.Property.CarSpots, f.Property.Description, f.Property.ImageUrls));
}