using backend.Misc;
using backend.Models;
using backend.Services;
using backend.Services.CalculationMethods;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<ICalculationMethod, OneLife>();
builder.Services.AddSingleton<CalculationService>();

builder.Services
    .AddControllers()
    .AddJsonOptions(o =>
    {
        o.JsonSerializerOptions.Converters.Add(new JsonEnumLowerCaseConverter<Gender>());
        o.JsonSerializerOptions.PropertyNamingPolicy = new JsonSnakeCasePolicy();
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy
            .WithOrigins(
                "http://localhost",
                "http://localhost:4200"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

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
app.UseCors("AllowLocalhost");

app.MapControllers();
app.Run();
