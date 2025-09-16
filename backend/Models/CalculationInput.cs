using System.ComponentModel.DataAnnotations;
using backend.Misc;

namespace backend.Models;

public class CalculationInput
{
    [Required, Range(0.01, double.MaxValue, ErrorMessage = "Value must be positive.")]
    public decimal Value { get; init; }

    [Required, Range(0, 120)]
    public int Age { get; init; }

    [Required]
    public Gender Gender { get; init; }

    [Required]
    [MethodExists]
    public string Method { get; init; } = "";
}
