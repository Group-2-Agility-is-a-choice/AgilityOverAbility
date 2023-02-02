function allReviews(RecipeID){
    fetch("backend/?getReviews").then((rtn)=>{
        rtn.json().then((data)=>{
            let reviewList = "<ul>";
            data.seachRecipes.foreach((item)=>{
                reviewList += `<li>${item.Rating} ${item.Content} ${item.Image}</li>`;
            }); 
            reviewList += `</ul>`;  
            document.getElementById("getReviews").innerHTML = recipeList; 
        })

    });
}

function createReview(){
            let review = "";
            review += document.getElementById("addReview").innerHTML;
            review += "&addReview=" + item.RecipeID;
            var starAmount = document.getElementById('reviewStars').innerHTML = `<b class="starsReview">${'⭐'.repeat(document.getElementById("stars").value)}</b><b>${'⭐'.repeat(5 - (document.getElementById("stars").value))}</b>`;
            starAmount += "&addReview" + item.RecipeID;
    fetch("backend/?addReview").then((rtn)=>{
        rtn.json().then((data)=>{
        })
    })
}

function deleteReview(){
    fetch("backend/?deleteReview&reviewDelete="+id).then((rtn)=>{
        rtn.json().then((data)=>{
        })
    })
}