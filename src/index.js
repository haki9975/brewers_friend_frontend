document.addEventListener("DOMContentLoaded", () => {
    getBeers(); //fetch to database, gets data and renders beer names
    createScaleForm(); // creates form for scaling recipes
    createBeerForm();
})


function getBeers(){
   const beerList = document.getElementById("beerList")
    fetch("http://localhost:3000/beers")
        .then(response => response.json())
            .then(data => {
                data.forEach(beer => {
                    beerList.innerHTML += `<li>${beer.name}</li>`
                })
            })
                .catch(error => console.warn(error))
} //shows list item of beer names. You want to add a listener for these and expand them when they click 

function createScaleForm(){
    const scaleContainer = document.getElementById("scale-container")
    const form = document.createElement('form')
        form.innerHTML = `<input placeholder='Scale your recipe!' type=text /><br><input type='submit'/>`
        scaleContainer.append(form)
        form.addEventListener("submit", handleScale)  
} //create scaling form

function createBeerForm(){
    const beerContainer = document.getElementById("newBeer-container")
    //const beerButton = document.getElementById("beerButton")
    const form = document.createElement("form")
    form.innerHTML = `
    <input placeholder="Beer Name" type="text" name="name"/>
    <input placeholder="Description" type="text" name="desription"/>
    <input placeholder="ABV" type="number" name="abv"/>
    <input placeholder="IBU" type="number" name="ibu"/>
    <input placeholder="Volume" type="number" name="volume"/>
    <input placeholder="Boil Volume" type="number" name="name"/>
    <input placeholder="Mash Instructions" type="text" name="mash_instruct"/>
    <input placeholder="Fermentation Instructions" type="text" name="ferment_instruct"/>
    <input placeholder="Food Pairings" type="text" name="food_pairing"/>
    <input placeholder="Tips" type="text" name="tips"/>
    <input type='submit'/>
    `
    
     
    
    //beerContainer.append(form) 
    //form.addEventListener("submit", handleBeer)
    
}

function handleBeer(e){
    e.preventDefault
    const nameInput = e.target.children[0]
}

function handleScale(e){
    e.preventDefault()
    const scaleInput = e.target.children[0]
    
    fetch("http://localhost:3000/beer/:id", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: scaleInput.value
        })
    })
}

function handleBeerForm(e){
    e.preventDefault()

}
