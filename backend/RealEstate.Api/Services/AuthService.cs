using Microsoft.IdentityModel.Tokens;
using RealEstate.Api.Data;
using RealEstate.Api.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _cfg;

    public AuthService(AppDbContext db, IConfiguration cfg)
    {
        _db = db;
        _cfg = cfg;
    }

    public string Register(RegisterDto dto)
    {
        var hash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        _db.Users.Add(new User { Email = dto.Email, PasswordHash = hash });
        _db.SaveChanges();
        return GenerateToken(dto.Email);
    }

    public string Login(LoginDto dto)
    {
        var user = _db.Users.FirstOrDefault(x => x.Email == dto.Email);
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid email or password");

        return GenerateToken(user.Email);
    }


    private string GenerateToken(string email)
    {
        var claims = new[]
        {
        new Claim(ClaimTypes.Name, email),
        new Claim(ClaimTypes.Email, email) // include email claim for FavoritesController
    };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_cfg["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _cfg["Jwt:Issuer"],         // must match backend
            audience: _cfg["Jwt:Audience"],     // must match backend
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(60),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

}