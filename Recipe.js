let displayList = "";

function getRecipe(id) {
    fetch("backend/?getFullRecipe&RecipeID=" + id).then((rtn) => {
        rtn.json().then((data) => {
            // display the recipe name
            document.getElementById("title").innerHTML = data.recipeDetails[0].Name;
            // display spice level
            document.getElementById("spice").innerHTML = `Spice : <b class="text-danger">${"🌶".repeat(data.recipeDetails[0].SpiceLevel)}</b><b>${"🌶".repeat(3 - (data.recipeDetails[0].SpiceLevel))}</b>`;
            // display method
            document.getElementById("method").innerHTML = marked.parse(data.recipeDetails[0].Instructions);
            // display serves
            document.getElementById("serves").setAttribute("value", data.recipeDetails[0].ServingAmount);
            // display image
            document.getElementById("img").src = data.recipeDetails[0].Image;
            let ingredientsList = "<ul>";
            displayList = `{`;
            // display ingredients
            let number = 0;
            data.ingredients.forEach((item) => {
                number += 1;
                ingredientsList += `<li>${item.Quantity} ${item.Unit} - ${item.Name}</li>`;
                displayList += `"` + number + `":["${item.Name}",${item.Quantity},"${item.Unit}"],`;
            });
            displayList = displayList.slice(0, -1);
            displayList += `}`; //need to save this and to be returned by getList()
            ingredientsList += "</ul>";
            document.getElementById("ingredients").innerHTML = ingredientsList;
        })

    });
}

// Funtion to update the ingredients for when the serving amout changes
function updatePage(id)
{
    fetch("backend/?getFullRecipe&RecipeID=" + id).then((rtn)=>{
        rtn.json().then((data)=>{

            var servesField = document.getElementById("serves");//gets serves html input
            var servesVal = servesField.value;// gets value for serves
            let ingredientsList = "<ul>";
            let number = 0;
            displayList = "{"; //resets list to add
            data.ingredients.forEach((item)=>{
                number += 1;
                ingredientsList += `<li>${(item.Quantity / data.recipeDetails[0].ServingAmount) * servesVal} ${item.Unit} - ${item.Name}</li>`;
                displayList+=`"`+number+`":["${item.Name}",${(item.Quantity / data.recipeDetails[0].ServingAmount) * servesVal},"${item.Unit}"]`;
                displayList+=`,`;
            });
            displayList = displayList.slice(0, -1);
            displayList +=`}`; //need to save this and to be returned by getList()
            ingredientsList += "</ul>";
            document.getElementById("ingredients").innerHTML = ingredientsList;
            console.log(displayList);
        })

    });
}

function addList() {
      if (localStorage.length != 0) {
          let storage = localStorage.getItem('storage');
          const obj = JSON.parse(storage);
          const ingObj = JSON.parse(displayList); //updated ingredient list
          const keys = Object.keys(obj);
          const ingKeys = Object.keys(ingObj);
          // print all keys
          let tempList = "{";
          let number = 0;
          ingKeys.forEach((x)=>{
            let listedAmount = ingObj[x][1];
            let listedUnit = ingObj[x][2];
            let listedItemName = ingObj[x][0];
            keys.forEach((key)=>{
              let amount = obj[key][1];
              let unit = obj[key][2]; //not used but probs should implement
              let itemName = obj[key][0];

              if (itemName==listedItemName) {
                //in list so add to new list
                number += 1;
                tempList+=`"`+number+`":["${itemName}",${amount+listedAmount},"${unit}"],`;
              }
            })
          }) //so far only items that are the same are added


    tempList = tempList.slice(0, -1);
    tempList +=`}`;
    localStorage.setItem('storage', tempList);
    console.log("Temp "+tempList);
  } else {
      localStorage.setItem('storage', displayList); //list is empty so add just this
      console.log("Display "+displayList);
  }
}
