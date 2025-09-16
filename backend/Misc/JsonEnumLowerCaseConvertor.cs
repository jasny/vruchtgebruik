using System.Text.Json;
using System.Text.Json.Serialization;

namespace backend.Misc;

public class JsonEnumLowerCaseConverter<T> : JsonConverter<T> where T : struct, Enum
{
    public override T Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var value = reader.GetString();
        if (value == null) throw new JsonException();

        if (Enum.TryParse<T>(value, true, out var result))
            return result;

        throw new JsonException($"Unable to convert \"{value}\" to {typeof(T)}");
    }

    public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString().ToLowerInvariant());
    }
}
