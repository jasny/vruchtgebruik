namespace backend.Models;

public record AgeGroup(int From, int To)
{
    public bool InRange(int age) =>
        age >= From && age <= To;
}
