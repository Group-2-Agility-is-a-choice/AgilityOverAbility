let shoppingList = "";

function getRecipe(id) {
    fetch("backend/?getFullRecipe&RecipeID=" + id).then((rtn) => {
        rtn.json().then((data) => {
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
            shoppingList = `{`;
            // display ingredients
            let number = 0;
            data.ingredients.forEach((item) => {
                number += 1;
                ingredientsList += `<li>${item.Quantity} ${item.Unit} - ${item.Name}</li>`;
                shoppingList += `"` + number + `":["${item.Name}",${item.Quantity},"${item.Unit}"],`;
            });
            shoppingList = shoppingList.slice(0, -1);
            shoppingList += `}`; //need to save this and to be returned by getList()
            ingredientsList += "</ul>";
            document.getElementById("ingredients").innerHTML = ingredientsList;
        })

    });
}

function addList(id) {
    fetch("backend/?getFullRecipe&RecipeID=" + id).then((rtn) => {
        rtn.json().then((data) => {
            if (localStorage.length !== 0) {
                let storage = localStorage.getItem('storage');
                try {
                    const obj = JSON.parse(storage);
                    const keys = Object.keys(obj);
                    // print all keys
                    let tempList = "{";
                    //skimmed items from list into order
                    let amount = obj[key][1];
                    let unit = obj[key][2];
                    let itemName = obj[key][0];

                    data.ingredients.forEach((item) => {
                        if (itemName === item.Name) {
                            let tempAmount = amount + item.Quantity; //will only work if same unit
                            tempList += `"` + key + `":["${itemName}",${item.Quantity},"${tempAmount}"],`;
                        } else {
                            tempList += `"` + key + `":["${itemName}",${amount},"${unit}"],`;
                        }
                    })//gone through all items in basket, now add extra ingredients
                    data.ingredients.forEach((item) => {
                        keys.forEach((key) => {
                            itemName = obj[key][0];
                            if (itemName !== item.Name) { //if new ingredient not in list add it
                                tempList += `"` + key + `":["${itemName}",${item.Quantity},"${item.Amount}"],`;
                            }
                        })
                    })
                    tempList = tempList.slice(0, -1);
                    tempList += `}`;

                } catch {//error somewhere;
                }
            } else {
                localStorage.setItem('storage', shoppingList); //list is empty so add just this
            }
        })
    });
}
