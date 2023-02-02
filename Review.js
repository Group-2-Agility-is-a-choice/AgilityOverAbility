function allReviews(RecipeID){
    fetch("backend/?searchRecipes&key=" + getCookie('jack')).then((rtn)=>{
        rtn.json().then((data)=>{
            let reviewList = "<ul>";
            data.seachRecipes.foreach((item)=>{
                reviewList += `<li>${item.Rating} ${item.Content} ${item.Image}</li>`;
            }); 
            reviewList += `</ul>`;  
            document.getElementById("displayReviews").innerHTML = recipeList; 
        })

    });
}

function createReview(){
    let edit = "";
    edit += document.getElementById("createReview").innerHTML;
    edit += "&createReview=" + item.RecipeID;
}

function addReviewNumber(){
    document.getElementById('reviewStars').innerHTML = `<b class="starsReview">${'â­'.repeat(document.getElementById("stars").value)}</b><b>${'â­'.repeat(5 - (document.getElementById("stars").value))}</b>`;
}