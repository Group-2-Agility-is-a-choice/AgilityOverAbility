function getRecipe(id) {
    fetch("backend?getFullRecipe&RecipeID=" + id).then((rtn)=>{
        rtn.json().then((data)=>{
            // display the recipe name
            document.getElementById("title").innerHTML = data.Name;
            // display spice level
            document.getElementById("spice").innerHTML = `Spice : ${data.SpiceLevel}`;
            // display method
            document.getElementById("method").innerHTML = data.Instructions;
            // display serves
            document.getElementById("serves").innerHTML = `Serves : ${data.ServingAmount}`;
            // display image
            document.getElementById("img").src = data.Image;
            let ingredientsList = "<ul>";
            // display ingredients
            data.ingredients.foreach((item)=>{
                ingredientsList += `<li>${item.Name} - ${item.Quantity} ${item.Unit}</li>`;
            });
            ingredientsList += "</ul>";
            document.getElementById("ingredients").innerHTML = ingredientsList;
        })
    });
}
