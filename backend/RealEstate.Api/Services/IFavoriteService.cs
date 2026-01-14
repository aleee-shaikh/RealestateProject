public interface IFavoriteService
{
    void Toggle(string email, int propertyId);
    IEnumerable<PropertyDto> MyFavorites(string email);
}