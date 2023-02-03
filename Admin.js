function showAllRecipes(){
    fetch("backend/?searchRecipes&key=" + getCookie('jack')).then((rtn)=>{
        rtn.json().then((data)=>{
            let adminRecipeList = "<table style='list-style:none; width: 100%'><tr><th>Title</th><th>Edit</th><th>Delete</th></tr>";
            data?.forEach((item)=>{
                adminRecipeList += `<tr><td>${item.Name}</td><td><button id="editBtn" onclick='editbutton(${item.RecipeID})'  data-id = "${item.RecipeID}"> Edit </button> </td><td><button  id="deleteBtn" onclick='deleteButton(this)' data-id = "${item.RecipeID}">Delete</button></td> </tr>`;
            });
            adminRecipeList += `</table>`;
            document.getElementById("getRecipes").innerHTML = adminRecipeList;
        })

    });
}

let jsond_ingredients = [];
let current_ingredients= [];
let num = 0;

function editbutton(id){
    document.getElementById('editModal').style.display= "block";
    current_ingredients = [];

    fetch("backend/?getFullRecipe&RecipeID=" + id).then((rtn) => {
        rtn.json().then((data) => {
          document.getElementById("etitle").value = data.recipeDetails[0].Name;
          document.getElementById("espice").value = data.recipeDetails[0].SpiceLevel;
          document.getElementById("eserve").value = data.recipeDetails[0].ServingAmount;
          document.getElementById("emethod").value = data.recipeDetails[0].Instructions;

          //image uploader?
          document.getElementById("eimg").src = data.recipeDetails[0].Image;

          document.getElementById("etitle").placeholder = data.recipeDetails[0].Name;
          document.getElementById("espice").placeholder = data.recipeDetails[0].SpiceLevel;
          document.getElementById("eserve").placeholder = data.recipeDetails[0].ServingAmount;
          document.getElementById("emethod").placeholder = data.recipeDetails[0].Instructions;
          let ingredientHTML = "";
          num = 0;
          data.ingredients.forEach((item) => {
              ingredientHTML += "<input type='number' class='input-quantity' data-id='"+num+"' min='0' style='width:50px;' value='"+item.Quantity+"' placeholder='"+item.Quantity+"'>";
              ingredientHTML += "<input type='text' class='input-unit' data-id='"+num+"' style='width:50px;' value='"+item.Unit+"' placeholder='"+item.Unit+"'>";
              ingredientHTML += "<input type='text' class='input-ingredient' data-id='"+num+"' style='width:200px;' value='"+item.Name+"' placeholder='"+item.Name+"'>";
              ingredientHTML += "<button onclick='removeEdit("+num+")' type='button' class='button bg-danger text-light'>Remove</button><br>";
              let ingredient = {
                "num": num,
                "ID": item.IngredientID,
                "Name": item.Name,
                "Quantity": item.Quantity,
                "Unit": item.Unit
              }
              num+=1;
              current_ingredients.push(ingredient);
          });
          document.getElementById("eingredients").innerHTML = ingredientHTML;
          jsond_ingredients = JSON.stringify(current_ingredients);
        })
      });
}

function removeEdit(id){
  let parsed_ingredients = JSON.parse(jsond_ingredients); //save everything else first or else new fields deleted
  let ingredientHTML = "";
  current_ingredients = [];
  num = 0;
  parsed_ingredients.forEach((item) => {
      if (id!=item.num) {
        ingredientHTML += "<input type='number' id='"+num+"Amount' min='0' style='width:50px;' value='"+item.Quantity+"' placeholder='"+item.Quantity+"'>";
        ingredientHTML += "<input type='text' id='"+num+"Unit' style='width:50px;' value='"+item.Unit+"' placeholder='"+item.Unit+"'>";
        ingredientHTML += "<input type='text' id='"+num+"Name' style='width:200px;' value='"+item.Name+"' placeholder='"+item.Name+"'>";
        ingredientHTML += "<button onclick='removeEdit("+num+")' type='button' class='button bg-danger text-light'>Remove</button><br>";
        let ingredient = {
          "num": num,
          "ID": item.IngredientID,
          "Name": item.Name,
          "Quantity": item.Quantity,
          "Unit": item.Unit
        }
        num+=1;
        current_ingredients.push(ingredient);
      }
  });
  jsond_ingredients = JSON.stringify(current_ingredients);
  document.getElementById("eingredients").innerHTML = ingredientHTML;
}

function confirmEdit() {
    if (document.getElementById('editModal').getAttribute("data-id") !== 'recipeID') {
        let url = "backend/?editRecipe";
        for (let inputField of document.getElementsByClassName("input-quantity")) {
            url += "&Quantity[]=" + encodeURIComponent(inputField.value);
        }
        for (let inputField of document.getElementsByClassName("input-unit")) {
            url += "&Unit[]=" + encodeURIComponent(inputField.value);
        }
        for (let inputField of document.getElementsByClassName("input-ingredient")) {
            url += "&Ingredient_Name[]=" + encodeURIComponent(inputField.value);
        }
        url += `&SpiceLevel=${encodeURIComponent(document.getElementById('espice').value)}`
        url += `&ServingAmount=${encodeURIComponent(document.getElementById('eserve').value)}`
        url += `&SweetOrSavoury=${encodeURIComponent(document.getElementById('esavor').checked ? 1 : 0)}`
        url += `&Name=${encodeURIComponent(document.getElementById('etitle').value)}`
        url += `&Instructions=${encodeURIComponent(document.getElementById('emethod').value)}`
        url += `&sessionToken=${encodeURIComponent(getCookie("Jeffery"))}`
        url += `&RecipeID=${encodeURIComponent(document.getElementById('editModal').getAttribute("data-id"))}`

        var data = new FormData()
        data.append('image', document.getElementById('imageUpload').files[0])
        fetch(url, {
            "method":"POST",
            "body":data,
        });
    }
    document.getElementById('editModal').style.display='none';
}

function removeAdd(id){
  
  let parsed_ingredients = JSON.parse(jsond_ingredients); //save everything else first or new fields deleted
  let ingredientHTML = "";
  current_ingredients = [];
  num = 0;
  parsed_ingredients.forEach((item) => {
      if (id!=item.num) {
        ingredientHTML += "<input type='number' id='"+num+"Amount' min='0' style='width:50px;' value='"+item.Quantity+"'>";
        ingredientHTML += "<input type='text' id='"+num+"Unit' style='width:50px;' value='"+item.Unit+"'>";
        ingredientHTML += "<input type='text' id='"+num+"Name' style='width:200px;' value='"+item.Name+"'>";
        ingredientHTML += "<button onclick='removeEdit("+num+")' type='button' class='button bg-danger text-light'>Remove</button><br>";
        let ingredient = {
          "num": num,
          "ID": item.IngredientID,
          "Name": item.Name,
          "Quantity": item.Quantity,
          "Unit": item.Unit
        }
        num+=1;
        current_ingredients.push(ingredient);
      }
  });
  jsond_ingredients = JSON.stringify(current_ingredients);
  document.getElementById("aingredients").innerHTML = ingredientHTML;
}

function addAdd() {
  let ingredientHTML = document.getElementById("aingredients").innerHTML;
  ingredientHTML += "<input type='number' id='"+num+"Amount' min='0' style='width:50px;' value='0' placeholder='0'>";
  ingredientHTML += "<input type='text' id='"+num+"Unit' style='width:50px;' value='' placeholder=''>";
  ingredientHTML += "<input type='text' id='"+num+"Name' style='width:200px;' value='' placeholder=''>";
  ingredientHTML += "<button onclick='removeEdit("+num+")' type='button' class='button bg-danger text-light'>Remove</button><br>";
  document.getElementById("aingredients").innerHTML = ingredientHTML;
}

function addEdit() {
  let ingredientHTML = document.getElementById("eingredients").innerHTML;
  ingredientHTML += "<input type='number' id='"+num+"Amount' min='0' style='width:50px;' value='0' placeholder='0'>";
  ingredientHTML += "<input type='text' id='"+num+"Unit' style='width:50px;' value='' placeholder=''>";
  ingredientHTML += "<input type='text' id='"+num+"Name' style='width:200px;' value='' placeholder=''>";
  ingredientHTML += "<button onclick='removeEdit("+num+")' type='button' class='button bg-danger text-light'>Remove</button><br>";
  document.getElementById("eingredients").innerHTML = ingredientHTML;
}

function deleteButton(id){
    var modal = document.getElementById("deleteModal");
    modal.style.display = "block";
    modal.setAttribute("data-id", id.getAttribute('data-id'));
}

function deleteRecipe(){
    let id = document.getElementById("deleteModal").getAttribute('data-id')
    fetch("backend/?deleteRecipe&RecipeID="+id).then((rtn)=>{
        rtn.text().then((data)=>{
            let id = document.getElementById("deleteModal").style.display = 'none';
            showAllRecipes();
        })
    })
}

function addRecipe(){
    document.getElementById("addModal").style.display = "block";
    current_ingredients = [];
}

function confirmAdd() {
  //add items to DB
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
// https://www.w3schools.com/js/js_cookies.asp
