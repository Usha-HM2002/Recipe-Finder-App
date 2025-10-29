import { useState } from "react";
import "./styles.css";

export default function App() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecipes = async () => {
    if (!ingredient) {
      setError("⚠️ Please enter an ingredient!");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      const data = await res.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError("❌ No recipes found for that ingredient.");
      }
    } catch {
      setError("🚫 Something went wrong. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="title">🍲 Recipe Finder</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter ingredient (e.g., chicken)"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <button onClick={fetchRecipes}>Search</button>
      </div>

      {loading && <p>Loading recipes...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {recipes.map((meal) => (
          <div key={meal.idMeal} className="card">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h3>{meal.strMeal}</h3>
            <a
              href={`https://www.themealdb.com/meal/${meal.idMeal}`}
              target="_blank"
              rel="noreferrer"
            >
              View Recipe →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
