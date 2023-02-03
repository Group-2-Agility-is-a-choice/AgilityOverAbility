var displayList = [];

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
            // display ingredients
            let num = 0;
            data.ingredients.forEach((item) => {
                ingredientsList += `<li>${item.Quantity} ${item.Unit} - ${item.Name}</li>`;
                let ingredient = {
                    "num": num,
                    "name": item.Name,
                    "amount": item.Quantity,
                    "unit": item.Unit
                  };
                  num+=1;
                displayList.push(ingredient);
            });
            ingredientsList += "</ul>";
            stringd = JSON.stringify(displayList);
            //console.log(stringd);
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
            displayList = [];
            let num = 0;
            data.ingredients.forEach((item)=>{
                ingredientsList += `<li>${(item.Quantity / data.recipeDetails[0].ServingAmount) * servesVal} ${item.Unit} - ${item.Name}</li>`;
                let ingredient = {
                  "num": num,
                  "name": item.Name,
                  "amount": (item.Quantity / data.recipeDetails[0].ServingAmount) * servesVal,
                  "unit": item.Unit
                };
                num += 1;
                displayList.push(ingredient);
            });
            stringd = JSON.stringify(displayList);
            //console.log(stringd);
            ingredientsList += "</ul>";
            document.getElementById("ingredients").innerHTML = ingredientsList;
        })
    });
}

function addList() {
    if (localStorage.length != 0) {
      try{
        let storage = localStorage.getItem('storage');
        let obj = JSON.parse(storage);
        let ingObj = JSON.parse(stringd); //updated ingredient list
        let num = obj.length;

        ingObj.forEach((item)=>{
          //tempList+=`"`+number+`":["${itemName}",${amount+listedAmount},"${unit}"],`;

          let found = false;
          obj.forEach((loop)=>{ //look if current item is in basket
            if (item.name==loop.name) {
              loop.amount += item.amount;
              //console.log(item.name);
              found = true;
            }
          })

          if (!found) {
            //not in list, so add to end
            let toAdd = {
              "num": num,
              "name": item.name,
              "amount": item.amount,
              "unit": item.unit
            };
            num+=1;
            obj.push(toAdd);
          }
        }) //so far only items that are the same are added
    alert("Items added to cart.");//change to modal display
    tempList = JSON.stringify(obj);
    localStorage.setItem('storage', tempList);
    //console.log("Temp "+tempList);
  } catch {
    //error somewhere
    alert("Error adding items to cart.");
    localStorage.clear();
  }
  } else {
      localStorage.setItem('storage', stringd); //list is empty so add just this
      alert("Items added to cart.");
      //console.log("Display "+stringd);
  }
}

function closeButton(){
    document.getElementById("myModal").style.display = "none";
}

function submitReview(){
    review = "backend/?addReview" + `&RecipeID=${chosenRecipe}&Title=`+ document.getElementById("rev-title").value + `&Content=`+ document.getElementById("description").value + `&Rating=` + document.getElementById('star').value + `&Email=` + document.getElementById('email').value;
    var data = new FormData()
    data.append('image', document.getElementById('image').files[0])
    fetch(review, {
        "method":"POST",
        "body":data,
        // headers:{'Content-Type':"application/x-www-form-urlencoded; charset=UTF-8"}
    })
}

function starInput() {
    document.getElementById('starReview').innerHTML = `<b class="text-warning">${'⭐'.repeat(document.getElementById("spice").value)}</b><b>${'⭐'.repeat((document.getElementById("star").value))}</b>`;
}

// var data = new FormData()
//         data.append('file', document.getElementById('imageUpload').files[0])
//         fetch(url, {
//             "method":"POST",
//             "body":data,
//             headers:{'Content-Type':"application/x-www-form-urlencoded; charset=UTF-8"}
//         });