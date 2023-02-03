// WHICH INGREDIENTS DO YOU HAVE LIST
function listOwnedIngredients(){
    fetch("backend/?getIngredients").then((rtn)=>{
        rtn.json().then((data)=>{
            let listOfIngrs = "<ul style = 'list-style:none;'>";
            data.forEach((item)=>{
                listOfIngrs += `<li> <input class = "owned-list" type = "checkbox" value = "${item.IngredientID}" id ="has-${item.IngredientID}"> <label for = "has-${item.IngredientID}"> ${item.Name}</label><br></li>`;
            });
            listOfIngrs += `</ul>`;
            document.getElementById("question-have").innerHTML = listOfIngrs;
        })

    })
}


// LIST OF POTENTIAL ALLERGENS WITH CHECKBOXES
function listAvoid(){
    fetch("backend/?getIngredients").then((rtn)=>{
        rtn.json().then((data)=>{
            let listOfIngr = "<ul style = 'list-style:none;'>";
            data.forEach((item)=>{
                listOfIngr += `<li> <input class = "avoid-list" type = "checkbox" value = "${item.IngredientID}" id = "avoid-${item.IngredientID}"> <label for = "avoid-${item.IngredientID}"> ${item.Name}</label><br></li>`;
            });
            listOfIngr += `</ul>`;
            document.getElementById("question-avoid").innerHTML = listOfIngr;
        })
    });
}


// MAKE INTO ONE BIG PASS FUNCTION

function passGoods(){
    // AVOID INGREDIENTS
    let urlBuilder = "backend/?searchRecipes";
    let els = document.getElementsByClassName("avoid-list");
    for(let i = 0; i < els.length; i++){
        if (els[i].checked){
            urlBuilder += "&avoidIngredients[]=" + els[i].value;
        }
    }

    // OWNED INGREDIENTS
    els = document.getElementsByClassName("owned-list");
    for(let i = 0; i < els.length; i++){
        if(els[i].checked){
            urlBuilder += "&ingredientsID[]=" + els[i].value;
        }
    }

    urlBuilder += "&SpiceLevel=" + document.getElementById("spice").value;
    urlBuilder += "&SweetOrSavoury=" + ((!(document.getElementById("sweet").checked)) ? "1" : "0");
    fetch(urlBuilder).then((rtn)=>{
        rtn.json().then((data)=>{
            if (data.length > 0) {
                fetch("backend/?getReviews&RecipeID=" + data[0]?.RecipeID).then((fetchRtn)=>{
                    fetchRtn.json().then((reviwData)=>{
                        document.getElementsByClassName('comments')[0].innerHTML = "";
                        reviwData.forEach((review)=>{
                            document.getElementsByClassName('comments')[0].innerHTML +=
                                `<div class="comment-card" data-review="${encodeURIComponent(JSON.stringify(review))}">
                    <div class="content">
                        <h5>${review.Title} - <b>${'⭐'.repeat(review.Rating)}</b></h5>
                        <sub>${review.Content}</sub>
                    </div>
                </div>`;
                        })
                        for (let commentCard of document.getElementsByClassName('comment-card')) {
                            commentCard.onclick = ()=>{
                                let review = JSON.parse(decodeURIComponent(commentCard.getAttribute('data-review')));
                                document.getElementById("modal_image").setAttribute("src",review.Image);
                                document.getElementById("modal_image").setAttribute("alt",review.Title);
                                document.getElementById("modal_title").innerHTML = `${review.Title}`;
                                document.getElementById("modal_content").innerHTML = `${review.Content}`;
                                document.getElementById("modal_stars").innerHTML = `<b>${'⭐'.repeat(review.Rating)}</b>`;
                                const modal = document.getElementById("myModal");
                                modal.style.display = "block";
                            }
                        }
                    })
                })
                document.getElementById("answerHead").style.backgroundImage = `url("${data[0]?.Image}")`
                document.getElementById("answerHead").setAttribute('data-id', data[0]?.RecipeID)
                document.getElementById("answerHead").innerHTML = `<div class="content">
                    <h2>${data[0]?.Name}</h2>
                    <h5>Serves: ${data[0]?.ServingAmount} - <b class="text-danger">${'🌶'.repeat(data[0]?.Spicelevel)}</b><b>${'🌶'.repeat(3 - (data[0]?.Spicelevel))}</b><b class="text-warning">${'⭐'.repeat(data[0]?.ReviewAVG)}</b><b>${'⭐'.repeat(5 - (data[0]?.ReviewAVG))}</b></h5>
                </div><div class="answerHeadCover"></div>`;
                let alternates = "";
                if (data.length === 1)
                    alternates = "<p>Send us a message ! We are happy to help! <a href='https://www.instagram.com/thelittlegreenlarder'>instagram</a></p>"
                data.slice(1).forEach((item)=>{
                    alternates += `<div class="res-card" style="background-image: url('${item?.Image.replace('recipeBig', 'recipeSmall')}')" onclick="window.location = 'recipe.html?id=' + this.getAttribute('data-id')" data-id="${item?.RecipeID}">
                    <div class="content">
                        <h5>${item?.Name}</h5>
                        <sub>Serves: ${item?.ServingAmount} - <b class="text-danger">${'🌶'.repeat(item?.Spicelevel)}</b><b>${'🌶'.repeat(3 - (item?.Spicelevel))}</b></sub>
                    </div>
                </div>`;
                });
                document.getElementById("other-choices").innerHTML = alternates;
            } else {
                // todo: handle case when no results found question - card - answer
                document.getElementById("question-card-answer").innerHTML = "Sorry, there's currently no recipes available! Come back later and we may have dished up some more!"
            }
            document.getElementById('question-card-answer').setAttribute("data-active","active");
        })
    })
}

function checkSavour() {
    document.getElementById('spiceOmeter').style.display =
        document.getElementById("sweet").checked ? "none" : "flex";
}
function spiceOmeter() {
    document.getElementById('spiceness').innerHTML = `<b class="text-danger">${'🌶'.repeat(document.getElementById("spice").value)}</b><b>${'🌶'.repeat(3 - (document.getElementById("spice").value))}</b>`;
}

function checkHaves(q) {
    for (let ownedEL of document.getElementsByClassName("owned-list")) {
        if (ownedEL.parentElement.innerText.toLowerCase().includes(q.toLowerCase()))
            ownedEL.parentElement.style.display = 'list-item';
        else
            ownedEL.parentElement.style.display = 'none';
    }
}
function checkAvoids(q) {
    for (let ownedEL of document.getElementsByClassName("avoid-list")) {
        if (ownedEL.parentElement.innerText.toLowerCase().includes(q.toLowerCase()))
            ownedEL.parentElement.style.display = 'list-item';
        else
            ownedEL.parentElement.style.display = 'none';
    }

}
function closeButton(){
    document.getElementById("myModal").style.display = "none";
}
