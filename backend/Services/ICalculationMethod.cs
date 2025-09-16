using backend.Models;

namespace backend.Services;

public interface ICalculationMethod
{
    public string Name { get; }
    public string Label { get; }
    
    public Calculation Calculate(CalculationInput input);
}
