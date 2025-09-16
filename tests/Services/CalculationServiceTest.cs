namespace tests.Services;

using backend.Models;
using backend.Services;
using backend.Services.CalculationMethods;
using Xunit;

public class CalculationServiceTest
{
    [Fact]
    public void Calculate_Uses_OneLifeMethod()
    {
        var methods = new List<ICalculationMethod> { new OneLife() };
        var service = new CalculationService(methods);

        var input = new CalculationInput
        {
            Method = "een_leven",
            Value = 100000m,
            Age = 30,
            Gender = Gender.M
        };

        var result = service.Calculate(input);

        Assert.Equal("een_leven", result.Method);
    }

    
    [Fact]
    public void Calculate_Throws_On_UnknownMethod()
    {
        var methods = new List<ICalculationMethod> { new OneLife() };
        var service = new CalculationService(methods);

        var input = new CalculationInput
        {
            Method = "onbekend",
            Value = 100000m,
            Age = 30,
            Gender = Gender.M
        };

        var ex = Assert.Throws<ArgumentException>(() => service.Calculate(input));
        Assert.Contains("Unknown calculation method", ex.Message);
    }
    
    [Fact]
    public void GetMethods_Returns_MethodOptions()
    {
        var methods = new List<ICalculationMethod> { new OneLife() };
        var service = new CalculationService(methods);

        var options = service.GetMethods();

        var option = Assert.Single(options);
        Assert.Equal("een_leven", option.Value);
        Assert.Equal("Één leven", option.Label);
    }
}
