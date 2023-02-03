let shoppingList = "";
var recipeDeets

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
            // display reviews
            fetch("backend/?getReviews&RecipeID=" + id).then((rtn) => {
                rtn.json().then((data1) => {
                    let reviewList = "";
                    data1.forEach((review) => {
                        reviewList += `<div class="comment-card" data-review="${encodeURIComponent(JSON.stringify(review))}">
                    <div class="content">
                        <h5>${review.Title} - <b>${'⭐'.repeat(review.Rating)}</b></h5>
                        <sub>${review.Content}</sub>
                    </div>
                    <div>
                        <img src="${review.Image}" alt="${review.Title}">
                    </div>
                </div>`;
                    })
                    document.getElementById("reviews").innerHTML = reviewList;
                    for (let card of document.getElementsByClassName("comment-card")) {
                        card.onclick = ()=>{
                            let review = JSON.parse(decodeURIComponent(card.getAttribute("data-review")));
                            document.getElementById("modal_image").setAttribute("src", review.Image);
                            document.getElementById("modal_image").setAttribute("alt", review.Title);
                            document.getElementById("myModal").style.display = "block";
                        }
                    }
                })
            });
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

// Funtion to update the ingredients for when the serving amout changes
function updatePage(id)
{
    fetch("backend/?getFullRecipe&RecipeID=" + id).then((rtn)=>{
        rtn.json().then((data)=>{

            var servesField = document.getElementById("serves");//gets serves html input
            var servesVal = servesField.value;// gets value for serves
            let ingredientsList = "<ul>";
            let number = 0;
            data.ingredients.forEach((item)=>{
                number += 1;
                ingredientsList += `<li>${(item.Quantity / data.recipeDetails[0].ServingAmount) * servesVal} ${item.Unit} - ${item.Name}</li>`;
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

function addList(id) {
    fetch("backend/?getFullRecipe&RecipeID=" + id).then((rtn) => {
        rtn.json().then((data) => {
            if (localStorage.length !== 0) {
                let storage = localStorage.getItem('storage');
                const obj = JSON.parse(storage);
                const keys = Object.keys(obj);
                // print all keys
                let tempList = "{";
                keys.forEach((key)=>{
                //skimmed items from list into order
                let amount = obj[key][1];
                let unit = obj[key][2];
                let itemName = obj[key][0];

            data.ingredients.forEach((item) =>{
              if (itemName==item.Name) {
                let tempAmount = amount+item.Quantity; //will only work if same unit
                tempList+=`"`+key+`":["${itemName}",${item.Quantity},"${tempAmount}"],`;
              }else {
                tempList+=`"`+key+`":["${itemName}",${amount},"${unit}"],`;
              }
            })
          })//gone through all items in basket, now add extra ingredients
          data.ingredients.forEach((item)=>{
            keys.forEach((key) => {
              itemName = obj[key][0];
              if (itemName!==item.Name) { //if new ingredient not in list add it
                tempList+=`"`+key+`":["${itemName}",${item.Quantity},"${item.Amount}"],`;
              }
            })
          })
          tempList = tempList.slice(0, -1);
          tempList +=`}`;

            } else {
                localStorage.setItem('storage', shoppingList); //list is empty so add just this
            }
        })
    });
}

function closeButton(){
    document.getElementById("myModal").style.display = "none";
}