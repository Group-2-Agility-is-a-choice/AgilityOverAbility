// CAROUSEL FUNCTIONS

// DEFINE VARIABLES
let display = 0;
let data;
// get recipe

fetch("backend/?getCarouselRecipes").then((rtn)=>{rtn.json().then((freashData)=>{

    data = freashData;//
    //on load
    galleryChange(data[display])

    
})});


// function to update carousel
function galleryChange(specificData)
{
    document.getElementById("gallery").innerHTML = 
    `
        <h1>${specificData.Name}</h1>
        <button class="btn button" onclick="prev()">🢀</button>
        <button class="btn button" onclick="window.location = 'recipe.html?id=${specificData.RecipeID}'">COOK NOW</button></a>
        <button class="btn button" onclick="next()">🢂</button>
    `;
    document.getElementById("galleryImg").style.background = "url(" + specificData.Image + ") center";
}

//Function for when next button clicked
function next()
{
    display ++;
    if (display > 2)
    {
        display = 0;
    }
    galleryChange(data[display]);
}

//Function for when prev button clicked
function prev()
{
    display --;
    if (display < 0)
    {
        display = 2;
    }
    galleryChange(data[display]);
}