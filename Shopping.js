let list = [];

function allIngredients(){
    fetch("backend?getIngredients").then((rtn)=>{
        rtn.json().then((data)=>{
            let ingredientsList = "<ul style='list-style:none;'>";
            data.forEach((item)=>{
                ingredientsList += `<li> <input onclick='displayRecipes()' class="check-ingredients" type = "checkbox" value="${item.IngredientID}" id = "${item.IngredientID}"> <label for = "${item.IngredientID}"> ${item.Name}</label><br></li>`;
            });
            ingredientsList += `</ul>`;
            document.getElementById("getIngredients").innerHTML = ingredientsList;
            displayRecipes();
        })
    });
}

load();

function load() {
  if(localStorage.length!=0) {

    let storage = localStorage.getItem('storage'); //{1:['bananas',5,'x'],2:['flour',100,'mg']}
    const obj = JSON.parse(storage);
    //console.log(obj['1'][1]+obj['1'][2]+" "+obj['1'][0]);
    //5x bananas
    let finalList = "";
    let finalForm = "";

    const keys = Object.keys(obj);
    // print all keys
    console.log(keys); //0:1,1:2
    // iterate over object
    keys.forEach((key) => {
      //console.log(`${key}: ${obj[0][0]}`);
    //});

    let amount = obj[key][1];
    let unit = obj[key][2];
    let item = obj[key][0];
    let ingredientsList = "<div class='form-check m-3' onclick='checkedBox(this)'><input class='form-check-input' type='checkbox' id='ingredient1'><label class='form-check-label' for='ingredient1'>"
    let formList = ingredientsList+"<input type='number' style='width:75px;' value='"+amount+"' placeholder='"+amount+"'>";
    ingredientsList += amount+unit+" "+item;
    formList += unit+" "+item+"</label></div>"
    ingredientsList += "</label></div>";

    finalList += ingredientsList;
    finalForm += formList;
    });

    document.getElementById("shopping").innerHTML = finalList;
    document.getElementById("form").innerHTML = finalForm;
  } else {
    let empty = "<p>Your shopping cart is empty.</p>"
    document.getElementById("shopping").innerHTML = empty;
    document.getElementById("form").innerHTML = empty;
  }
}



function displayRecipes(){
    let relevantIngredients = "";

    let els = document.getElementsByClassName("check-ingredients");

    for(let i = 0; i < els.length ; i++){
        if (els[i].checked == false){
            relevantIngredients += "&ingredientsID[]=" + els[i].id;
        }
    };




    // BACKEND NEEDS IMPLEMENTED SO RELEVANT PARAMETERS CAN BE PASSED IN
    fetch("backend?searchRecipes").then((rtn)=>{
        rtn.json().then((data)=>{
            let recipeList = "<ul>";
            data?.seachRecipes.forEach((item)=>{
                recipeList += `<li>${item.Name} ${item.Image} ${item.SpiceLevel} ${item.ServingAmount}</li>`;
            });
            recipeList += `</ul>`;
            document.getElementById("seachRecipes").innerHTML = recipeList;
        })
    });
}
