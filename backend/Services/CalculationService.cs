namespace backend.Services;

using Models;

public class CalculationService
{
    private readonly Dictionary<string, ICalculationMethod> _methodsByName;

    public CalculationService(IEnumerable<ICalculationMethod> methods)
    {
        _methodsByName = methods.ToDictionary(m => m.Name, StringComparer.OrdinalIgnoreCase);
    }

    public Calculation Calculate(CalculationInput input)
    {
        var methodName = input.Method;
        var method = _methodsByName.GetValueOrDefault(methodName);

        if (method is null)
        {
            throw new ArgumentException($"Unknown calculation method '{methodName}'.", nameof(input));
        }

        return method.Calculate(input);
    }

    public IReadOnlyList<MethodOption> GetMethods()
    {
        return _methodsByName.Values
            .Select(m => new MethodOption(m.Name, m.Label))
            .OrderBy(m => m.Label)
            .ToList();
    }
}
