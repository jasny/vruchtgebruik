using backend.Models;

namespace backend.Services;

public interface ICalculationService
{
    Calculation Calculate(CalculationInput input);
    IReadOnlyList<MethodOption> GetMethods();    
}
