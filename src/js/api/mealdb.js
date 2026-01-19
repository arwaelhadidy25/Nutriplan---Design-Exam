// fetch data from api
// class of get meals

export class MealDB{
    constructor(){
    this.baseUrl="https://nutriplan-api.vercel.app/api/meals"
    }
    
    async getCategories() {
    let res;
    const response = await fetch(`${this.baseUrl}/categories`);
    if(response.ok){
    res= await response.json();
    return res.results;
    } 
    if(!response.ok){
        return false;
    }
  }
  
    async getRandomMeals(count = 25) {
        let res;
    const response = await fetch(
      `${this.baseUrl}/random?count=${count}`
    );
     if(response.ok){
    res= await response.json();
    return res.results;
    } 
    if(!response.ok){
        return [];
    }
  }
async getAreas() {
    let res;
  const response = await fetch(`${this.baseUrl}/areas`);

   if(response.ok){
    res= await response.json();
    return res.results;
    } 
    if(!response.ok){
        return [];
    }

}
async searchMeals(query = "", page = 1, limit = 25) {
    let res;
  const response = await fetch(
    `${this.baseUrl}/search?q=${query}&page=${page}&limit=${limit}`
  );

    if(response.ok){
    res= await response.json();
    return res.results;
    } 
    if(!response.ok){
        return [];
    }
}
async getMealById(id) {
  const response = await fetch(`${this.baseUrl}/${id}`);

  if (response.ok) {
    const res = await response.json();
    return res.result;
  }

  return null;
}

}

