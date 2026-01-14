using RealEstate.Api.Data;

public class PropertyService : IPropertyService
{
    private readonly AppDbContext _db;
    public PropertyService(AppDbContext db) { _db = db; }

    public IEnumerable<PropertyDto> GetAll() =>
        _db.Properties.Select(p => new PropertyDto(
            p.Id, p.Title, p.Address, p.Price, p.ListingType,
            p.Bedrooms, p.Bathrooms, p.CarSpots, p.Description, p.ImageUrls));

    public PropertyDto Get(int id)
    {
        var p = _db.Properties.Find(id)!;
        return new PropertyDto(p.Id, p.Title, p.Address, p.Price, p.ListingType,
            p.Bedrooms, p.Bathrooms, p.CarSpots, p.Description, p.ImageUrls);
    }
}