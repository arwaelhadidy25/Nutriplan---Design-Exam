
"use strict";
// get items from local storage
const logKey = "foodLog";
export function getFoodLog() {
  return JSON.parse(localStorage.getItem(logKey)) || [];
  
}
// add item
export function addToFoodLog(item) {
  const log = getFoodLog();
  log.push(item);
  localStorage.setItem(logKey, JSON.stringify(log));
}

// clear item
export function removeFromFoodLog(id) {
  const log = getFoodLog().filter(item => item.id !== id);
  localStorage.setItem(logKey, JSON.stringify(log));
}

// clear all
export function clearFoodLog() {
  localStorage.removeItem(logKey);
}
