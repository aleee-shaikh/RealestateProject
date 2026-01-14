using Microsoft.EntityFrameworkCore;
using RealEstate.Api.Models;

namespace RealEstate.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Property> Properties => Set<Property>();
        public DbSet<Favorite> Favorites => Set<Favorite>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Property>(entity =>
            {
                entity.Property(p => p.Price)
                      .HasPrecision(18, 2); // 18 digits total, 2 decimal places
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
