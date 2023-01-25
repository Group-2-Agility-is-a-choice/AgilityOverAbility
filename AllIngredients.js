function allIngredients(){
    fetch("backend?getIngredients").then((rtn)=>{
        rtn.json().then((data)=>{
            let ingredientsList = "<ul>";
            data.getIngredients.foreach((item)=>{
                ingredientsList += `<li> <input type = "checkbox" value="${item.IngredientId} id = "${item.IngredientId}"> <label for = "${item.IngredientId}"> ${item.Name}</label><br></li>`;
            }); 
            ingredientsList += `</ul>`;  
            document.getElementById("getIngredients").innerHTML = ingredientsList; 
        })

    });
}
