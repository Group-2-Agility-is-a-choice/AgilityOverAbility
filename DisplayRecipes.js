function displayRecipes(){
    fetch("backend/?searchRecipes").then((rtn)=>{
        rtn.json().then((data)=>{
            let recipeList = "<ul>";
            data.seachRecipes.foreach((item)=>{
                recipeList += `<li>${item.Name} ${item.Image} ${item.SpiceLevel} ${item.ReviewAVG} ${item.ServingAmount}</li>`;
            }); 
            recipeList += `</ul>`;  
            document.getElementById("seachRecipes").innerHTML = recipeList; 
        })

    });
}
