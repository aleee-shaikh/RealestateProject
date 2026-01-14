using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class PropertiesController : ControllerBase
{
    private readonly IPropertyService _service;

    public PropertiesController(IPropertyService service)
    {
        _service = service;
    }

    [HttpGet] // GET api/properties
    public IActionResult GetAll()
    {
        var properties = _service.GetAll();
        return Ok(properties);
    }
}
