function allReviews(){
    fetch("backend/?getReviews").then((rtn)=>{
        rtn.json().then((data)=>{
            let reviewList = "";
            let sectionHeader = "";
            data?.forEach((item)=>{
                if(sectionHeader!== item.RecipeID){
                    reviewList+= 
                    `<h2>${item.Name}</h2>`
                    sectionHeader = item.RecipeID;
                }

                reviewList += `
                <div class=" reviewCard card mb-3 border border-dark" style="max-width: 800px;" ><div class="row no-gutters">
                <div class="col-md-4">
                <img src="${item.Image.replace('recipeBig', 'recipeSmall')}" style="height:100%;width:100%;" class="card-img" alt="...">
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <h4 class="card-title">${item.Title}</h4>
                    <p class="card-text mt-4"><small class="text-muted">Rating: ${'⭐'.repeat(item.Rating)}</small></p>
                    <p class="card-text"><small class="text-muted">${item.Content}</small></p>
                    <button id="myBtn" onclick="deleteButton(this.getAttribute('data-id'))"  data-id = "${item.ReviewID}">Delete </button>
              </div>
            </div>
          </div></div>`;
        });
        document.getElementById("getReviews").innerHTML = reviewList;
    })

});
}

function deleteButton(id){
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
    modal.setAttribute("data-id", id);
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
    let id = document.getElementById("myModal").getAttribute('data-id')
    fetch("backend/?deleteReview&ReviewID="+id).then((rtn)=>{
        rtn.json().then((data)=>{
            let id = document.getElementById("myModal").style.display = 'none';
            allReviews();
        })
    })
}
