namespace tests.Services.CalculationMethods;

using backend.Models;
using backend.Services.CalculationMethods;
using Xunit;

public class OneLifeTest
{
    [Fact]
    public void Should_Calculate_For_Man_Age30()
    {
        var method = new OneLife();
        var input = new CalculationInput
        {
            Method = "een_leven",
            Value = 100000m,
            Age = 30,
            Gender = Gender.M
        };

        var result = method.Calculate(input);

        Assert.Equal("een_leven", result.Method);
        Assert.Equal(100000m, result.Value);
        Assert.Equal(Gender.M, result.Gender);
        Assert.Equal(new AgeGroup(30, 999), result.AgeGroup);
        Assert.Equal(20, result.Factor);
        Assert.Equal(100000m * 0.04m * 20, result.UsageValue);
    }
    
    [Fact]
    public void Should_Calculate_For_Woman_Age32()
    {
        var method = new OneLife();
        var input = new CalculationInput
        {
            Method = "een_leven",
            Value = 60000m,
            Age = 32,
            Gender = Gender.V
        };

        var result = method.Calculate(input);

        Assert.Equal("een_leven", result.Method);
        Assert.Equal(60000m, result.Value);
        Assert.Equal(Gender.V, result.Gender);
        Assert.Equal(new AgeGroup(30, 34), result.AgeGroup);
        Assert.Equal(21, result.Factor);
        Assert.Equal(60000m * 0.04m * 21, result.UsageValue);
    }
}
