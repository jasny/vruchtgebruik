namespace backend.Models;

public class CalculationInput
{
    public string Method { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public int Age { get; set; }
    public Gender Gender { get; set; } = new ();
}
