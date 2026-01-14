public interface IPropertyService
{
    IEnumerable<PropertyDto> GetAll();
    PropertyDto Get(int id);
}