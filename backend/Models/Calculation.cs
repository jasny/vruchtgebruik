namespace backend.Models;

public class Calculation
{
    public string Method { get; set; } = string.Empty;
    public decimal Value { get; set; }
    public AgeGroup AgeGroup { get; set; } = new ();
    public string Gender { get; set; } = string.Empty;
    public int Factor { get; set; }
    public decimal UsageValue { get; set; }
}
