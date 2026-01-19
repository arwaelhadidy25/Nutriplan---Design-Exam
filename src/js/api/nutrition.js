export async function loadMealNutrition(meal) {
  const ingredients = meal.ingredients.map(
    item => `${item.measure} ${item.ingredient}`
  );

  const response = await fetch(
    "https://nutriplan-api.vercel.app/api/nutrition/analyze",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "dbMXzJhzXe8X29tDpIPm7bbiGEvJtSnKoarPTaQ8"
      },
      body: JSON.stringify({ ingredients })
    }
  );

  const data = await response.json();

  if (!data.success) {
    throw new Error("Nutrition analysis failed");
  }
  console.log(data.data.perServing)
  return data.data.perServing;
}