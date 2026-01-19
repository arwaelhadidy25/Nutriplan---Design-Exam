"use strict"
import { MealDB } from "./api/mealdb.js";
import { renderCategories } from "./ui/components.js";
import { renderMeals } from "./ui/components.js";
import { renderAreas } from "./ui/components.js";
import { showMealsLoading } from "./ui/components.js";
import { renderMealDetails } from "./ui/components.js";
import { addToFoodLog, getFoodLog } from "./state/appState.js";
import {renderFoodLog} from "./ui/components.js"
import { clearFoodLog } from "./state/appState.js";
import { removeFromFoodLog } from "./state/appState.js";
import {loadMealNutrition} from "./api/nutrition.js";
import { showSection } from "./navigation.js";
import { renderWeeklyOverview } from "./ui/components.js";
let currentMeal ="";
// loading
function showLoading() {
  document.getElementById("app-loading-overlay").style.display = "flex";
}

function hideLoading() {
  document.getElementById("app-loading-overlay").style.display = "none";
}
const searchInput = document.getElementById("search-input");
const api = new MealDB();
showLoading();

// get meals
const meals = await api.getRandomMeals();
renderMeals(meals);

// get categories
const categories = await api.getCategories();
renderCategories(categories);

// get areas
const areas = await api.getAreas();
renderAreas(areas);

hideLoading();
 //search meal
  searchInput.addEventListener("input", async function () {
    showMealsLoading();
  const query = searchInput.value.trim();

  if (query === "") {
    const meals = await api.getRandomMeals();
    renderMeals(meals);
  } else {
    const meals = await api.searchMeals(query);
    renderMeals(meals);
  }
});
// filter by category with getMeals function and searchMeal for filter 
document.getElementById("categories-grid").addEventListener("click", async function (e) {
    
    console.log(e)
    const card = e.target.closest(".category-card");
    console.log(card)
    if (!card) return;
    showMealsLoading();
    const categoryName =  card.querySelector("h3").textContent;
    const meals = await api.searchMeals(categoryName);
    console.log(meals)
    renderMeals(meals);
  });
//display meals by area
  document.getElementById("areas-grid").addEventListener("click", async function (e) {
  const card = e.target.closest(".area-card");
    if (!card) return;

    const areaButtons = document.querySelectorAll(".area-card");

for (let i = 0; i < areaButtons.length; i++) {
  areaButtons[i].classList.remove("bg-emerald-600", "text-white");
  areaButtons[i].classList.add("bg-gray-100", "text-gray-700");
}
    card.classList.add("bg-emerald-600", "text-white");
    card.classList.remove("bg-gray-100", "text-gray-700");

   const areaName = card.textContent.trim();
   showMealsLoading();
    if (areaName === "All Recipes") {
      const meals = await api.getRandomMeals();
      renderMeals(meals);
      return;
    }

    const meals = await api.searchMeals(areaName);
    renderMeals(meals);
  });
//display details

document.getElementById("recipes-grid").addEventListener("click", async function (e) {

    const card = e.target.closest(".recipe-card");
    if (!card) return;

    const mealId = card.dataset.mealId;

    const meal = await api.getMealById(mealId);
    currentMeal =meal;
    renderMealDetails(meal);
    
    
 showSection("meal-details")
  });

  //back to meals
document.getElementById("meal-details").addEventListener("click", function (e) {

    if (e.target.closest("#back-to-meals-btn")) {
showSection("home")
    }
  });

document.getElementById("home").addEventListener("click", function (e) {
showSection("home")

  });
  document.getElementById("product-show").addEventListener("click", function (e) {
showSection("products-section")

  });


  //---------- food log



document.addEventListener("click", async function (e) {
  if (!e.target.closest("#log-meal-btn")) return;
    openServingsModal();
    
    
});

// food log show
document.getElementById("foodlog-section").addEventListener("click", function () {
  showSection("foodlog-section");
  renderFoodLog(getFoodLog());
  renderWeeklyOverview()
});
//clear food log
document.getElementById("clear-foodlog").addEventListener("click", function () {
  clearFoodLog();
  renderFoodLog([]);
});
    document.getElementById("foodlog-show").addEventListener("click", function (e) {
showSection("foodlog-section")
renderFoodLog(getFoodLog());
renderWeeklyOverview()

  });


document.addEventListener("click", function (e) {
  if (e.target.closest(".delete-log")) {
    const id = e.target.closest(".delete-log").dataset.id;
    removeFromFoodLog(id);
    renderFoodLog();
  }})
//////model serving
let selectedServings = 1;

const modal = document.getElementById("servings-modal");
const servingsCount = document.getElementById("servings-count");

function openServingsModal() {
  selectedServings = 1;
  servingsCount.textContent = selectedServings;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeServingsModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

document.getElementById("plus-serving").addEventListener("click", () => {
  selectedServings++;
  servingsCount.textContent = selectedServings;
});

document.getElementById("minus-serving").addEventListener("click", () => {
  if (selectedServings > 1) {
    selectedServings--;
    servingsCount.textContent = selectedServings;
  }
});

document.getElementById("close-serving").addEventListener("click", closeServingsModal);
document.getElementById("confirm-serving").addEventListener("click", async () => {
  const nutrition = await loadMealNutrition(currentMeal);

  const logItem = {
    id: currentMeal.id + "-" + Date.now(),
    name: currentMeal.name,
    image: currentMeal.thumbnail,
    servings: selectedServings,
    type: "meal",
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    }),
    date: new Date().toISOString().split("T")[0],

    calories: nutrition.calories * selectedServings,
    protein: nutrition.protein * selectedServings,
    carbs: nutrition.carbs * selectedServings,
    fat: nutrition.fat * selectedServings,
    fiber: nutrition.fiber * selectedServings
  };

  addToFoodLog(logItem);
renderWeeklyOverview();
closeServingsModal();

});


