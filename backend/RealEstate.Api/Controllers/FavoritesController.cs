using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RealEstate.Api.Models;
using RealEstate.Api.Data;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class FavoritesController : ControllerBase
{
    private readonly IFavoriteService _favoriteService;
    private readonly AppDbContext _db;

    public FavoritesController(IFavoriteService favoriteService, AppDbContext db)
    {
        _favoriteService = favoriteService;
        _db = db;
    }

    [HttpPost]
    [Authorize] // must be logged in
    public IActionResult Add([FromBody] AddFavoriteDto dto)
    {
        var userEmail = User.Identity.Name; // or get from JWT claims
        _favoriteService.Toggle(userEmail, dto.PropertyId);
        return Ok();
    }

    // GET: /api/favorites
    [HttpGet]
    public IActionResult GetFavorites()
    {
        var userEmail = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;
        if (userEmail == null) return Unauthorized();

        var user = _db.Users.FirstOrDefault(u => u.Email == userEmail);
        if (user == null) return Unauthorized();

        // Include property details
        var favoriteProperties = _db.Favorites
            .Where(f => f.UserId == user.Id)
            .Include(f => f.Property) // load property navigation
            .Select(f => new
            {
                id = f.Property.Id,
                title = f.Property.Title,
                location = f.Property.Address,
                price = f.Property.Price
            })
            .ToList();

        return Ok(favoriteProperties);
    }

    // DELETE: /api/favorites/{propertyId}
    [HttpDelete("{propertyId}")]
    public IActionResult Remove(int propertyId)
    {
        var userEmail = User.FindFirst(System.Security.Claims.ClaimTypes.Email)?.Value;
        if (userEmail == null) return Unauthorized();

        var user = _db.Users.FirstOrDefault(u => u.Email == userEmail);
        if (user == null) return Unauthorized();

        var favorite = _db.Favorites
            .FirstOrDefault(f => f.UserId == user.Id && f.PropertyId == propertyId);

        if (favorite != null)
        {
            _db.Favorites.Remove(favorite);
            _db.SaveChanges();
            return Ok();
        }

        return NotFound();
    }
}
