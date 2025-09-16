namespace backend.Models;
using System.Text.Json.Serialization;

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Gender
{
    M, // Man
    V, // Vrouw
    X  // Onbepaald
}
