using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("")]
public class CalculationController(ICalculationService service) : Controller
{
    [HttpPost("calculate")]
    [ProducesResponseType(typeof(Calculation), 200)]
    [ProducesResponseType(typeof(ValidationProblemDetails), 400)]
    public ActionResult<Calculation> Calculate([FromBody] CalculationInput input) => Ok(service.Calculate(input));

    [HttpGet("methods")]
    public ActionResult<IEnumerable<MethodOption>> GetMethods() => Ok(service.GetMethods());
}
