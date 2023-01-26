function getRecipe(id) {
    fetch("backend?getFullRecipe&RecipeID=" + id).then((rtn)=>{
        rtn.json().then((data)=>{
            // display the recipe name
            document.getElementById("title").innerHTML = data.recipeDetails[0].Name;
            // display spice level
            document.getElementById("spice").innerHTML = `Spice : ${data.recipeDetails[0].SpiceLevel}`;
            // display method
            document.getElementById("method").innerHTML = data.recipeDetails[0].Instructions;
            // display serves
            document.getElementById("serves").innerHTML = `Serves : ${data.recipeDetails[0].ServingAmount}`;
            // display image
            document.getElementById("img").src = data.recipeDetails[0].Image;
            let ingredientsList = "<ul>";
            // display ingredients
            data.ingredients.forEach((item)=>{
                ingredientsList += `<li>${item.Name} - ${item.Quantity} ${item.Unit}</li>`;
            });
            ingredientsList += "</ul>";
            document.getElementById("ingredients").innerHTML = ingredientsList;
        })

    });
}
