function showAllRecipes(){
    fetch("backend/?searchRecipes&key=" + getCookie('jack')).then((rtn)=>{
        rtn.json().then((data)=>{
            let adminRecipeList = "<table style='list-style:none;'><tr><th>Title</th><th>Edit</th><th>Delete</th></tr>";
            data.seachRecipes.foreach((item)=>{
                adminRecipeList += `<tr><td>${item.Name}</td><td><button onclick='editbutton()'  data-id = "${item.RecipeID}"> Edit </button> </td><td><button onclick='deleteButton()' class = "btn btn-primary" data-id = "${item.RecipeID}"> Delete</button></td> </tr>`;
            }); 
            adminRecipeList += `</table>`;  
            document.getElementById("editRecipes").innerHTML = recipeList; 
        })

    });
}

function editbutton(){
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}


function passEdit(RecipeID){
    let edit = "&content=";
        edit += encodeURIComponent(document.getElementById("editRecipes").innerHTML);
        edit += "&recipeEdit=" + RecipeID;
    fetch("backend/?editRecipe" +edit).then((rtn)=>{
    })
}

function deleteButton(){
    var modal = document.getElementById(" MODAL NAME ");
    modal.style.display = "block";
}

function passDelete(RecipeID){
    let recipeDelete = "";
    recipeDelete += "&recipeDelete=" + RecipeID;
    fetch("backend/?deleteRecipe" + recipeDelete).then((rtn)=>{
    })
}

function addRecipe(){
    var model = document.getElementById(" MODAL NAME ");
    modal.style.display = "block";
}

function passRecipe(){
    let addRecipe = "";
    addRecipe += encodeURIComponent(document.getElementById("addRecipe").innerHTML);
    addRecipe += "&addRecipe=";
    fetch("backend/?deleteRecipe").then((rtn)=>{
    })
}

function getCookie(cookie){
    let name = "Jeffery =";
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
// https://www.w3schools.com/js/js_cookies.asp

