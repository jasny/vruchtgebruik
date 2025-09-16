using backend.Services;
using backend.Services.CalculationMethods;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<ICalculationMethod, OneLife>();
builder.Services.AddSingleton<CalculationService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.RoutePrefix = string.Empty;
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Backend API v1");
    });
}

// app.UseHttpsRedirection();

app.MapControllers();
app.Run();
