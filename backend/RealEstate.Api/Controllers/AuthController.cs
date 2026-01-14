using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _svc;
    public AuthController(IAuthService svc) { _svc = svc; }

    [HttpPost("register")]
    public ActionResult<AuthResponseDto> Register([FromBody] RegisterDto dto)
        => new AuthResponseDto(_svc.Register(dto));

    [HttpPost("login")]
    public ActionResult<AuthResponseDto> Login([FromBody] LoginDto dto)
        => new AuthResponseDto(_svc.Login(dto));
}
