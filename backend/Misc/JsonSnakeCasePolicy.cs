namespace backend.Misc;

using System.Text.Json;

public class JsonSnakeCasePolicy : JsonNamingPolicy
{
    public override string ConvertName(string name)
    {
        if (string.IsNullOrEmpty(name)) return name;

        var buffer = new System.Text.StringBuilder(name.Length + 10);
        for (int i = 0; i < name.Length; i++)
        {
            char c = name[i];
            if (char.IsUpper(c) && i > 0)
            {
                buffer.Append('_');
                buffer.Append(char.ToLowerInvariant(c));
            }
            else
            {
                buffer.Append(char.ToLowerInvariant(c));
            }
        }
        return buffer.ToString();
    }
}
