using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Net;
using System.Net.Http.Json;
using backend.Models;

namespace tests.Controllers;

public class CalculationTest : IClassFixture<CustomWebApplicationFactory>
{
    private readonly CustomWebApplicationFactory _factory;

    public CalculationTest(CustomWebApplicationFactory factory)
    {
        _factory = factory;
    }

    [Fact]
    public async Task Calculate_Returns400_WhenValueIsNonPositive()
    {
        var invalid = new CalculationInput
        {
            Value = 0m,
            Age = 30,
            Gender = Gender.M,
            Method = "een_leven"
        };

        var client = _factory.CreateClient();

        var resp = await client.PostAsJsonAsync("/calculate", invalid);

        Assert.Equal(HttpStatusCode.BadRequest, resp.StatusCode);

        var problem = await resp.Content.ReadFromJsonAsync<ValidationProblemDetails>();
        Assert.NotNull(problem);
        Assert.True(problem!.Errors.ContainsKey(nameof(CalculationInput.Value)));
        
        Assert.Contains(problem.Errors[nameof(CalculationInput.Value)],
            msg => msg.Contains("Value must be positive."));
    }

    [Fact]
    public async Task Calculate_Returns400_WhenMethodUnknown()
    {
        var invalid = new CalculationInput
        {
            Value = 100m,
            Age = 50,
            Gender = Gender.V,
            Method = "foo_bar"
        };

        var client = _factory.CreateClient();

        var resp = await client.PostAsJsonAsync("/calculate", invalid);

        Assert.Equal(HttpStatusCode.BadRequest, resp.StatusCode);

        var problem = await resp.Content.ReadFromJsonAsync<ValidationProblemDetails>();
        Assert.NotNull(problem);
        Assert.True(problem!.Errors.ContainsKey(nameof(CalculationInput.Method)));
    }

    [Fact]
    public async Task Calculate_Returns200_WithBody_WhenValid()
    {
        var valid = new CalculationInput
        {
            Value = 250m,
            Age = 60,
            Gender = Gender.M,
            Method = "een_leven"
        };

        var expected = new Calculation
        {
            Value = valid.Value,
            AgeGroup = new AgeGroup(60, 999),
            Gender = valid.Gender,
            Method = valid.Method,
            Factor = 20,
            UsageValue = 200m
        };

        _factory.ServiceMock
            .Setup(s => s.Calculate(It.IsAny<CalculationInput>()))
            .Returns(expected);

        var client = _factory.CreateClient();

        var resp = await client.PostAsJsonAsync("/calculate", valid);

        resp.EnsureSuccessStatusCode();

        var payload = await resp.Content.ReadFromJsonAsync<Calculation>();
        Assert.NotNull(payload);
        Assert.Equivalent(expected, payload, strict: true);
    }

    [Fact]
    public async Task GetMethods_Returns200_WithBody()
    {
        var expected = new List<MethodOption>
        {
            new ("een_leven", "Één leven"),
            new ("foo_bar", "Foo bar")
        };

        _factory.ServiceMock
            .Setup(s => s.GetMethods())
            .Returns(expected);

        var client = _factory.CreateClient();

        var resp = await client.GetAsync("/methods");
        
        resp.EnsureSuccessStatusCode();

        var payload = await resp.Content.ReadFromJsonAsync<List<MethodOption>>();
        Assert.NotNull(payload);
        Assert.Equivalent(expected, payload, strict: true);
    }
}
