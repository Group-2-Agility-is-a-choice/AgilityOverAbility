function showAllRecipes(){
    fetch("backend/?searchRecipes&key=" + getCookie('jack')).then((rtn)=>{
        rtn.json().then((data)=>{
            let adminRecipeList = "<table style='list-style:none; width: 100%'><tr><th>Title</th><th>Edit</th><th>Delete</th></tr>";
            data?.forEach((item)=>{
                adminRecipeList += `<tr><td>${item.Name}</td><td><button id="editBtn" onclick='editbutton()'  data-id = "${item.RecipeID}"> Edit </button> </td><td><button  id="deleteBtn" onclick='deleteButton(this)' data-id = "${item.RecipeID}">Delete</button></td> </tr>`;
            }); 
            adminRecipeList += `</table>`;  
            document.getElementById("getRecipes").innerHTML = adminRecipeList; 
        })

    });
}

function editbutton(){
    var modal = document.getElementById("editModal");
    modal.style.display = "block";
    //modal.innerHTML = ;
}


function passEdit(RecipeID){
    let edit = "&content=";
        edit += encodeURIComponent(document.getElementById("editRecipes").innerHTML);
        edit += "&recipeEdit=" + RecipeID;
    fetch("backend/?editRecipe" +edit).then((rtn)=>{
    })
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

