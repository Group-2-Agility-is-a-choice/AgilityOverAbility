function showAllRecipes(){
    fetch("backend/?searchRecipes").then((rtn)=>{
        rtn.json().then((data)=>{
            let adminRecipeList = "<table style='list-style:none;'><tr><th>Title</th><th>Edit</th><th>Delete</th></tr>";
            data.seachRecipes.foreach((item)=>{
                adminRecipeList += `<tr><td>${item.Name}</td><td><button onclick='editbutton()'  class = "btn btn-primary" id = "${item.RecipeID}"> Edit </button></td><td><button onclick='deleteButton()' class = "btn btn-primary" id = "${item.RecipeID}"> Delete</button></td> </tr>`;
            }); 
            adminRecipeList += `</table>`;  
            document.getElementById("seachRecipes").innerHTML = recipeList; 
        })

    });
}

function editbutton(){
    let edit = "";
    edit += document.getElementById("editRecipes").innerHTML;
    edit += "&recipeEdit=" + item.RecipeID;
}

function deleteButton(){
    let recipeDelete = "";
    recipeDelete += "&recipeDelete=";
}

function addRecipe(){
    let addRecipe = "";
    addRecipe += "&addRecipe=";
}