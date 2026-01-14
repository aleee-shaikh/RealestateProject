using System.Collections.Generic;

namespace RealEstate.Api.Models
{
    public class Property
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string ListingType { get; set; } = null!;
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        public int CarSpots { get; set; } 
        public string ImageUrls { get; set; } = null!;

        public string Description { get; set; } = null!;
        public string City { get; set; } = null!;
        public decimal Price { get; set; }
        public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
    }
}
