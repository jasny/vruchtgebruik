namespace backend.Models;

public class Calculation
{
    public string Method { get; init; } = string.Empty;
    public decimal Value { get; init; }
    public AgeGroup AgeGroup { get; init; } = new (0, 999);
    public Gender Gender { get; init; }
    public int Factor { get; init; }
    public decimal UsageValue { get; init; }
}
