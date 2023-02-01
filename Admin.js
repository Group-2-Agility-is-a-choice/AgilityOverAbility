function showAllRecipes(){
    fetch("backend/?searchRecipes&key=" + getCookie('jack')).then((rtn)=>{
        rtn.json().then((data)=>{
            let adminRecipeList = "<table style='list-style:none;'><tr><th>Title</th><th>Edit</th><th>Delete</th></tr>";
            data.seachRecipes.foreach((item)=>{
                adminRecipeList += `<tr><td>${item.Name}</td><td><button onclick='editbutton()'  class = "btn btn-primary" id = "${item.RecipeID}"> Edit </button> </td><td><button onclick='deleteButton()' class = "btn btn-primary" id = "${item.RecipeID}"> Delete</button></td> </tr>`;
            }); 
            adminRecipeList += `</table>`;  
            document.getElementById("editRecipes").innerHTML = recipeList; 
        })

    });
}

function editbutton(){
    var modal = document.getElementById("myModal");

    modal.style.display = "block";

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

function getCookie(){
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
    if (c.indexOf(name) == 0) {
        return;
        }
    }
    return "SOME ERROR FROM BACKEND";
}
