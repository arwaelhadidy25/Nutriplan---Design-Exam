"use strict"
// ----------------- Meals
import { getFoodLog, removeFromFoodLog, clearFoodLog } from "../state/appState.js";
import { loadMealNutrition } from "../api/nutrition.js";
export function renderCategories(categories) {
  let cartona = "";
  
  for (let i = 0; i < 12; i++) {
    cartona += `
      <div
              class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${categories[i].name}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid fa-drumstick-bite"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${categories[i].name}</h3>
                </div>
              </div>
            </div>`

  }
      document.getElementById("categories-grid").innerHTML = cartona;

}
    
export function renderMeals(meals){
    //no recipes found
    let cartona="";
    if (!meals || meals.length === 0) {
    cartona = `
    
      <div class="flex flex-col items-center justify-center py-12 text-center col-span-full">
        <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
        </div>
        <p class="text-gray-500 text-lg">No recipes found</p>
        <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
      </div>
    `;
    document.getElementById("recipes-grid").innerHTML = cartona;
    document.getElementById("recipes-grid").classList.remove("grid-cols-4")
    document.getElementById("recipes-grid").classList.add("grid-cols-12")
    return;
  }
  for (let i = 0; i < meals.length; i++) {
     cartona += `
      <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${meals[i].id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${meals[i].thumbnail}"
                  alt="${meals[i].name}"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${meals[i].category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${meals[i].area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${meals[i].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${meals[i].instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${meals[i].category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meals[i].area}
                  </span>
                </div>
              </div>
            </div>
    `;
    
}
    document.getElementById("recipes-grid").classList.add("grid-cols-4")
    document.getElementById("recipes-grid").classList.remove("grid-cols-12")
document.getElementById("recipes-grid").innerHTML = cartona;
}
export function renderAreas(areas) {
  let cartona = "";
  for (let i = 0; i < areas.length; i++) {
    cartona += `<button
              class="area-card px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
            >
              ${areas[i].name}
            </button>`

  }
      document.getElementById("areas-grid").innerHTML += cartona;

}
export function showMealsLoading() {
    document.getElementById("recipes-grid").classList.remove("grid-cols-4")
    document.getElementById("recipes-grid").classList.add("grid-cols-12")
  document.getElementById("recipes-grid").innerHTML = `
    <div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
  `;
}
// Details
export async function renderMealDetails(meal) {
  let cartona="";

  cartona=` <div class="max-w-7xl mx-auto">
          <!-- Back Button -->
          <button
            id="back-to-meals-btn"
            class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
          >
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back to Recipes</span>
          </button>

          <!-- Hero Section -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
            <div class="relative h-80 md:h-96">
              <img
                src="${meal.thumbnail}"
                alt="${meal.name}"
                class="w-full h-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <div class="absolute bottom-0 left-0 right-0 p-8">
                <div class="flex items-center gap-3 mb-3">
                  <span
                    class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full"
                    >${meal.category}</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full"
                    >${meal.area}</span
                  >
                  <span
                    class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full"
                    >Casserole</span
                  >
                </div>
                <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
                  ${meal.name}
                </h1>
                <div class="flex items-center gap-6 text-white/90">
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-clock"></i>
                    <span>30 min</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-utensils"></i>
                    <span id="hero-servings">4 servings</span>
                  </span>
                  <span class="flex items-center gap-2">
                    <i class="fa-solid fa-fire"></i>
                    <span id="hero-calories">485 cal/serving</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap gap-3 mb-8">
            <button
              id="log-meal-btn"
              class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
              data-meal-id="${meal.id}"
            >
              <i class="fa-solid fa-clipboard-list"></i>
              <span>Log This Meal</span>
            </button>
          </div>

          <!-- Main Content Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Ingredients & Instructions -->
            <div class="lg:col-span-2 space-y-8">
              <!-- Ingredients -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-list-check text-emerald-600"></i>
                  Ingredients
                  <span class="text-sm font-normal text-gray-500 ml-auto"
                    >${meal.ingredients.length} items</span
                  >
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  
                  
                  
                  
                 ${renderIngredients(meal.ingredients)}
                 
                
                
                </div>
              </div>

              <!-- Instructions -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                  Instructions
                </h2>
                <div class="space-y-4">
                  
                 

                     ${renderInstructions(meal.instructions)}





                </div>
              </div>

              <!-- Video Section -->
              <div class="bg-white rounded-2xl shadow-lg p-6">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-video text-red-500"></i>
                  Video Tutorial
                </h2>
                <div
                  class="relative aspect-video rounded-xl overflow-hidden bg-gray-100"
                >
                  <iframe
                    src="${getYoutubeEmbedUrl(meal.youtube)}"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  >
                  </iframe>
                </div>
              </div>
            </div>

            <!-- Right Column - Nutrition -->
            <div class="space-y-6">
              <!-- Nutrition Facts -->
              <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2
                  class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
                >
                  <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                  Nutrition Facts
                </h2>
                <div id="nutrition-facts-container">
     
                  ${ await renderNutritionContainer()}
                </div>
              </div>
            </div>
          </div>
        </div>`
  document.getElementById("meal-details").innerHTML=cartona;
  await renderNutritionFacts( await loadMealNutrition(meal));
}
function renderInstructions(instructions) {
  let cartona = "";

  for (let i = 0; i < instructions.length; i++) {
    cartona += `
      <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
        <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
          ${i + 1}
        </div>
        <p class="text-gray-700 leading-relaxed pt-2">
          ${instructions[i]}
        </p>
      </div>
    `;
  
  }

  return cartona;
}

function renderIngredients(ingredients) {
  let cartona = "";

  for (let i = 0; i < ingredients.length; i++) {
    cartona += `
      <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
        <input
          type="checkbox"
          class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
        />
        <span class="text-gray-700">
          <span class="font-medium text-gray-900">
            ${ingredients[i].measure}
          </span>
          ${ingredients[i].ingredient}
        </span>
      </div>
    `;
  }

  return cartona;
}
function getYoutubeEmbedUrl(youtubeUrl) {
    //=v هنا هقسم الكود اللي جاي نصين قبل 
    //  وبعدها وهاخد الجزء التاني فقط
  const videoId = youtubeUrl.split("v=")[1];
  return `https://www.youtube.com/embed/${videoId}`;
}


// ----------------- food log
export function renderFoodLog() {
  const list = document.getElementById("logged-items-list");
  const items = getFoodLog();

  // counter
  document.querySelector("h4").textContent = `Logged Items (${items.length})`;
  if (items.length === 0) {
    list.innerHTML = `
      <div class="text-center py-8 text-gray-500">
        <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
        <p class="font-medium">No meals logged today</p>
      </div>
    `;
    return;
  }

  let cartona = "";

  for (let i = 0; i < items.length; i++) {
    cartona += `
      <div class="flex items-center justify-between bg-gray-50 rounded-xl p-4">
        <div class="flex items-center gap-4">
          <img src="${items[i].image}" class="w-14 h-14 rounded-lg object-cover"/>
          <div>
            <p class="font-semibold">${items[i].name}</p>
            <p class="text-xs text-gray-500">
              ${items[i].servings} serving • ${items[i].type} <br/>
              ${items[i].time}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-4 text-sm">
          <span class="font-bold text-emerald-600">${items[i].calories} kcal</span>
          <span>${items[i].protein}g P</span>
          <span>${items[i].carbs}g C</span>
          <span>${items[i].fat}g F</span>
          <button data-id="${items[i].id}" class="delete-log text-red-500">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  }

  list.innerHTML = cartona;
  getFoodLog()
}




// --------------Nutrition

//render data from api nutrition
//load data from api


async function  renderNutritionContainer(){
    

    let cartona=""
    cartona=`<p class="text-sm text-gray-500 mb-4">Per serving</p>

                  <div
                    class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl"
                  >
                    <p class="text-sm text-gray-600">Calories per serving</p>
                    <p class="text-4xl font-bold text-emerald-600"><span id="nutrition-calories">--</span></p>
                    <p class="text-xs text-gray-500 mt-1">Total: 1940 cal</p>
                  </div>

                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span class="text-gray-700">Protein</span>
                      </div>
                      <span class="font-bold text-gray-900"><span id="nutrition-protein">--</span>g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div id="protein-bar"
                        class="bg-emerald-500 h-2 rounded-full"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">Carbs</span>
                      </div>
                      <span class="font-bold text-gray-900"><span id="nutrition-carbs">--</span>g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                      id="carbs-bar"
                        class="bg-blue-500 h-2 rounded-full"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                        <span class="text-gray-700">Fat</span>
                      </div>
                      <span class="font-bold text-gray-900"><span id="nutrition-fat">--</span>g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                      id="fat-bar"
                        class="bg-purple-500 h-2 rounded-full"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                        <span class="text-gray-700">Fiber</span>
                      </div>
                      <span class="font-bold text-gray-900"><span id="nutrition-fiber">--</span>g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                      id="fiber-bar"
                        class="bg-orange-500 h-2 rounded-full"
                      ></div>
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                        <span class="text-gray-700">Sugar</span>
                      </div>
                      <span class="font-bold text-gray-900"><span id="nutrition-sugar">--</span>g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                      id="sugar-bar"
                        class="bg-pink-500 h-2 rounded-full"
                      ></div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span class="text-gray-700">saturated fat</span>
                      </div>
                      <span class="font-bold text-gray-900"><span id="nutrition-saturatedFat">--</span>g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                      id="saturatedFat-bar"
                        class="bg-yellow-500 h-2 rounded-full"
                      ></div>
                    </div>
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">cholesterol</span>
                      </div>
                      <span class="font-bold text-gray-900"><span id="nutrition-cholesterol">--</span>g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                      id="cholesterol-bar"
                        class="bg-blue-500 h-2 rounded-full"
                        style="width: 24%"
                      ></div>
                    </div>
                       <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-gray-700">sodium</span>
                      </div>
                      <span class="font-bold text-gray-900"><span id="nutrition-sodium">--</span>g</span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-2">
                      <div
                      id="sodium-bar"
                        class="bg-blue-500 h-2 rounded-full"
                      ></div>
                    </div>
                  </div>`
        return cartona;
        
}

function calcPercentage(value, max) {
  return Math.min(Math.round((value / max) * 100), 100);
}


 function renderNutritionFacts(nutrition) {
  const proteinPct  = calcPercentage(nutrition.protein, 60);
  const carbsPct    = calcPercentage(nutrition.carbs, 275);
  const fatPct      = calcPercentage(nutrition.fat, 70);
  const sugarPct      = calcPercentage(nutrition.sugar, 50);
  const saturatedFatPct      = calcPercentage(nutrition.saturatedFat, 20);
  const cholesterolPct      = calcPercentage(nutrition.cholesterol, 300);
  const sodiumPct      = calcPercentage(nutrition.sodium, 2300);
  const fiberPct      = calcPercentage(nutrition.fiber, 25);


  document.getElementById("nutrition-calories").textContent =nutrition.calories;

  document.getElementById("nutrition-protein").textContent =nutrition.protein;

  document.getElementById("nutrition-carbs").textContent =nutrition.carbs;

  document.getElementById("nutrition-fat").textContent =nutrition.fat;
   document.getElementById("nutrition-sugar").textContent =nutrition.sugar;
    document.getElementById("nutrition-saturatedFat").textContent =nutrition.saturatedFat;
     document.getElementById("nutrition-cholesterol").textContent =nutrition.cholesterol;
      document.getElementById("nutrition-sodium").textContent =nutrition.sodium;
      document.getElementById("nutrition-fiber").textContent =nutrition.fiber;

  document.getElementById("protein-bar").style.width = `${proteinPct}%`;
  document.getElementById("carbs-bar").style.width = `${carbsPct}%`;
  document.getElementById("fat-bar").style.width = `${fatPct}%`;
    document.getElementById("sugar-bar").style.width = `${sugarPct}%`;
      document.getElementById("saturatedFat-bar").style.width = `${saturatedFatPct}%`;
        document.getElementById("cholesterol-bar").style.width = `${cholesterolPct}%`;
          document.getElementById("sodium-bar").style.width = `${sodiumPct}%`;
    document.getElementById("fiber-bar").style.width = `${fiberPct}%`;
}
// food log get date
function getCurrentWeek() {
  const today = new Date();
  const week = [];

  const start = new Date(today);
  start.setDate(today.getDate() - today.getDay() + 1); // Monday

  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);

    week.push({
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.toISOString().split("T")[0],
      day: d.getDate()
    });
  }

  return week;
}
// calculate all calories


function getWeeklyCalories() {
  const log = getFoodLog();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days.map(day => {
    const mealsOfDay = log.filter(item => item.day === day);

    const calories = mealsOfDay.reduce(
      (sum, item) => sum + Number(item.calories || 0),
      0
    );

    return {
      day,
      calories,
      items: mealsOfDay.length
    };
  });
}

//ui weekly overview
export function renderWeeklyOverview() {
  const data = getWeeklyCalories();
  const container = document.getElementById("weekly-overview");

  container.innerHTML = "";

  for (let day of data) {
    container.innerHTML += `
      <div class="text-center px-6 py-3 rounded-xl ${
        day.calories ? "bg-emerald-50" : "bg-gray-50"
      }">
        <p class="text-sm text-gray-500">${day.day}</p>

        <p class="mt-2 font-bold ${
          day.calories ? "text-emerald-600" : "text-gray-300"
        }">
          ${day.calories}
        </p>

        <p class="text-xs text-gray-400">kcal</p>

        ${
          day.items
            ? `<p class="text-xs text-emerald-600">${day.items} meals</p>`
            : ""
        }
      </div>
    `;
  }
}

