using backend.Models;

namespace backend.Services.CalculationMethods;

public class OneLife : ICalculationMethod
{
    public string Name => "een_leven";
    public string Label => "Één leven";
    
    private static readonly List<FactorRule> Rules = new()
    {
        new FactorRule(Gender.M, new AgeGroup(0, 24), 22),
        new FactorRule(Gender.M, new AgeGroup(25, 29), 21),
        new FactorRule(Gender.M, new AgeGroup(30, 999), 20),

        new FactorRule(Gender.V, new AgeGroup(0, 29), 22),
        new FactorRule(Gender.V, new AgeGroup(30, 34), 21),
        new FactorRule(Gender.V, new AgeGroup(35, 999), 20),

        new FactorRule(Gender.X, new AgeGroup(0, 29), 22),
        new FactorRule(Gender.X, new AgeGroup(30, 34), 21),
        new FactorRule(Gender.X, new AgeGroup(35, 999), 20),
    };
    
    public Calculation Calculate(CalculationInput input)
    {
        var rule = Rules.First(r => r.Gender == input.Gender && r.AgeGroup.InRange(input.Age));
        var usageValue = input.Value * 0.04m * rule.Factor;

        return new Calculation
        {
            Method = Name,
            Value = input.Value,
            Gender = input.Gender,
            AgeGroup = rule.AgeGroup,
            Factor = rule.Factor,
            UsageValue = usageValue
        };
    }
}
