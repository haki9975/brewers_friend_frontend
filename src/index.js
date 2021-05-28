const _url = new BeerApi("http://localhost:3000")


document.addEventListener("DOMContentLoaded", () => {
   // getBeers(); //fetch to database, gets data and renders beer names
      _url.getBeers() 
      logTarget()
})


// function getBeers(){
//    const beerList = document.getElementById("beerList")
//     fetch("http://localhost:3000/beers")
//         .then(response => response.json())
//             .then(data => {
//                 data.forEach(beer => {
//                     beerList.innerHTML += `<li>${beer.name}</li>`
//                 })
//             })
//                 .catch(error => console.warn(error))
// } //shows list item of beer names. You want to add a listener for these and expand them when they click 


function createBeerForm(){
    const beerContainer = document.getElementById("newBeer-container")
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
    beerContainer.append(form) 
}//create new beer form

function createIngForm(){
    //grab container
    const form = document.createElement("form")
    form.innerHTML = `
    <input placeholder="Ingredient Name" type="text" name="name"/>
    <input placeholder="Category" type="text" name="category"/>
    <input placeholder="Amount" type="number" name="amount"/>
    <input placeholder="Unit" type="text" name="unit"/>
    <input type='submit'/>
    `
    //container.append(form)
}//create new ingredient form - should associate with the beer it is 

function handleBeer(e){
    e.preventDefault
    const nameInput = e.target.children[0]
}

function logTarget(){
    const bList =document.getElementById("beerList")
    bList.addEventListener("click", function(e){
        console.log(e.target)
        Beer.allBeers.find(beer => beer.name)
    })

}


function handleBeerForm(e){
    e.preventDefault()
    
}

 //function handleScale(e){
    //     e.preventDefault()
    //     const scaleInput = e.target.children[0]
    
    //     fetch("http://localhost:3000/beer/:id", {
        //         method: "POST",
        //         headers: {
            //             "Content-Type": "application/json",
            //             Accept: "application/json"
            //         },
            //         body: JSON.stringify({
                //             name: scaleInput.value
                //         })
                //     })
 //}


//function createScaleForm(){
    //     const scaleContainer = document.getElementById("scale-container")
    //     const form = document.createElement('form')
    //         form.innerHTML = `<input placeholder='Scale your recipe!' type=text /><br><input type='submit'/>`
    //         scaleContainer.append(form)
    //         form.addEventListener("submit", handleScale)  
 //} //create scaling form...  abandon this for now