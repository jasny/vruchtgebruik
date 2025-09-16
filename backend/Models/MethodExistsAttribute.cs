using System.ComponentModel.DataAnnotations;
using backend.Services;

namespace backend.Models;

public sealed class MethodExistsAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext context)
    {
        var method = value as string;
        if (string.IsNullOrWhiteSpace(method))
        {
            return new ValidationResult("Method is required.");
        }

        var calcService = (CalculationService?)context.GetService(typeof(CalculationService));
        if (calcService is null)
        {
            throw new InvalidOperationException("CalculationService is not initialized.");
        }

        var known = calcService.GetMethods().Any(m => string.Equals(m.Value, method, StringComparison.OrdinalIgnoreCase));
        return known
            ? ValidationResult.Success
            : new ValidationResult($"Unknown calculation method '{method}'.");
    }
}
