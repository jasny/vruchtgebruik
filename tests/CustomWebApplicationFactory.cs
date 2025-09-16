using backend.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Moq;

public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    public Mock<ICalculationService> ServiceMock { get; } = new();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
        
        builder.ConfigureServices(services =>
        {
            var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(ICalculationService));
            if (descriptor != null)
            {
                services.Remove(descriptor);
            }

            services.AddSingleton(ServiceMock.Object);
        });
    }
}
