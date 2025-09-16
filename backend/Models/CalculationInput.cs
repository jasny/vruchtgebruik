namespace backend.Models;

public class CalculationInput
{
    public string Method { get; init; } = string.Empty;
    public decimal Value { get; init; }
    public int Age { get; init; }
    public Gender Gender { get; init; }
}
