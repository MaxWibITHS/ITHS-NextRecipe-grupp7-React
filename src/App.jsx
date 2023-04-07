import React, {useState, useEffect} from 'react'
import './App.css'
import RecipeCard from './RecipeCard'


function App() {
  const [recipes, setRecipes]= useState([]);

  // Hämtar 8 stycken populära recepten via useEffect, så det laddas samtidigt som sidan laddas
  useEffect(()=> { 
    async function getPopularRecipes(){
       const responseComplexSearch = await fetch('https://api.spoonacular.com/recipes/complexSearch?sort=popularity&number=10', {
        headers: {
            'Content-Type' : 'application/json',
            'X-Api-key' : '80331e3c22274e92a45c54d8a33df906'
        }
    });
    const dataComplexSearch= await responseComplexSearch.json();
    const resultsComplexSearch= dataComplexSearch.results;

    // Fetchar mot en annan endpoint för att hämta relaterade information t.ex. servings och readyInMinutes
    // För att göra det måste man mappar igenom resultat av ComplexSearch och hämtar information respective varje recept i complexSearch-array av recepten
    // För att kunna hinna köra klart dem alla innan att rendera något, sparar jag alla fetchar som en array av promises
    // Så att jag kan kolla om alla promises är med response senare 
    const promises = resultsComplexSearch.map(async (recipe)=>{
      const responseBulkInfo= await fetch('https://api.spoonacular.com/recipes/716429/information?includeNutrition=false', {
        headers: {
          'Content-Type' : 'application/json',
          'X-Api-key' : '80331e3c22274e92a45c54d8a33df906'
      }
    });

  const dataBulkInfo= await responseBulkInfo.json();
  return dataBulkInfo;
  });

  // När alla promises är klara, så passar vi in data som vi hämtade från vår andra fetch som en parameter
  // Sedan mappar vi igenom array resultComplexSearch och lägger till nya information till varje recept, dvs servings och readyinminutes
  // Vi använder index för att kunna matchar rätt info (från det andra fetch ) till rätt data (från det första fetch) 
  // och sparar allt i en array variable vilket används senare att ändra recept status.
  Promise.all(promises).then((dataBulkInfo)=> {
    const recipesWithInfo = resultsComplexSearch.map((recipe, index)=> {
      return {...recipe, servings: dataBulkInfo[index].servings, readyInMinutes: dataBulkInfo[index].readyInMinutes}
    })
    setRecipes(recipesWithInfo);
  });
}
    getPopularRecipes();
  }, []);

  

  return (
    <div className="App">
      <h1>Popular Recipes</h1>
      <div className='recipeRepresentation'>
      {recipes.map(popularRecipe=> 
      <RecipeCard {...popularRecipe} key={popularRecipe.id}/>)}
      </div>
    </div>
  )
}

export default App
