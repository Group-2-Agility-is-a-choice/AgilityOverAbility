var shoppingList = "";

function getRecipe(id) {
    fetch("backend/?getFullRecipe&RecipeID=" + id).then((rtn)=>{
        rtn.json().then((data)=>{
            // display the recipe name
            document.getElementById("title").innerHTML = data.recipeDetails[0].Name;
            // display spice level
            document.getElementById("spice").innerHTML = `Spice : <b class="text-danger">${'🌶'.repeat(data.recipeDetails[0].SpiceLevel)}</b><b>${'🌶'.repeat(3 - (data.recipeDetails[0].SpiceLevel))}</b>```;
            // display method
            document.getElementById("method").innerHTML = data.recipeDetails[0].Instructions;
            // display serves
            document.getElementById("serves").innerHTML = `Serves : ${data.recipeDetails[0].ServingAmount}`;
            // display image
            document.getElementById("img").src = data.recipeDetails[0].Image;
            let ingredientsList = "<ul>";
            shoppingList = `{`//`{"1":["bananas",5,"x"],"2":["flour",100,"mg"]}`;
            // display ingredients
            let number = 0;
            data.ingredients.forEach((item)=>{
                number += 1;
                ingredientsList += `<li>${item.Quantity} ${item.Unit} - ${item.Name}</li>`;
                shoppingList+=`"`+number+`":["${item.Name}",${item.Quantity},"${item.Unit}"]`;
                shoppingList+=`,`;
            });
            shoppingList = shoppingList.slice(0, -1);
            shoppingList +=`}`; //need to save this and to be returned by getList()
            ingredientsList += "</ul>";
            document.getElementById("ingredients").innerHTML = ingredientsList;
        })

    });
}

function getList() {
    return shoppingList;
}
