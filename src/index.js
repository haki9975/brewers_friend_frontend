const _url = new BeerApi("http://localhost:3000")
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay  = document.getElementById('overlay')
const beerContainer = document.getElementById("modal-body")
const searchButton = document.getElementById("search")


document.addEventListener("DOMContentLoaded", () => {
   // getBeers(); //fetch to database, gets data and renders beer names
      _url.getBeers() 
      renderBeer()
})

function createBeerForm(){
    const form = document.createElement("form")
    form.innerHTML += `
    <p>Beer Recipe:</p><br>
    <input id="beerName" placeholder="Beer Name" type="text" name="beer[name]"/><br>
    <input id ="beerDesc" placeholder="Description" type="textarea" name="beer[desription]"/><br>
    <input id="abv" placeholder="ABV" type="number" step="0.1" name="beer[abv]"/><br>
    <input id="ibu" placeholder="IBU" type="number" step="0.1" name="beer[ibu]"/><br>
    <input id="volume" placeholder="Volume" type="number" step="0.1" name="beer[volume]"/><br>
    <input id="bVol" placeholder="Boil Volume" type="number" step="0.1" name="beer[name]"/><br>
    <input id="mashIns" placeholder="Mash Instructions" type="text" name="beer[mash_instruct]"/><br>
    <input id="fermIns" placeholder="Fermentation Instructions" type="text" name="beer[ferment_instruct]"/><br>
    <input id="pairings" placeholder="Food Pairings" type="text" name="beer[food_pairing]"/><br>
    <input id="tips" placeholder="Tips" type="text" name="beer[tips]"/><br>
    `
    form.id = "recipeForm"
    beerContainer.appendChild(form) 
}//create new beer form

function createIngForm(){
    const addIngredient = document.getElementById("add-ing")
    const form = document.getElementById("recipeForm")
    const ingForm = `
    <p>Ingredient:</p><br>
    <input placeholder="Ingredient Name" type="text" name="beer[ingredient][name]"/><br>
    <input placeholder="Category" type="text" name="beer[ingredient][category]"/><br>
    <input placeholder="Amount" type="number" step="0.1" name="beer[ingredient][amount]"/><br>
    <input placeholder="Unit" type="text" name="beer[ingredient][unit]"/><br>
        `    
    addIngredient.addEventListener("click", (e) => {
        const addIngredient = document.getElementById("add-ing")
        e.preventDefault
        form.innerHTML += ingForm
        //addIngredient.remove()
        createIngForm()
    })
}//create new ingredient form - should associate with the beer it is 

function renderBeer(){
    const bList =document.getElementById("beerList")
    //const p = document.getElementsByTagName("p")
    bList.addEventListener("click", function(e){
        const _e = e.target
        const _delete = document.createElement("button")
        _delete.innerHTML = "Delete Recipe"
        let recipe = document.createElement("p")
        recipe.classList = "recipe-container"
        beer = Beer.allBeers.find(beer => beer.name == _e.innerHTML)
        let ing = beer.ingredients.map(i => i.id)
        recipe.innerHTML = `<b>Name:</b> ${beer.name} <br> <b>Description:</b> ${beer.description}<br> <b>ABV:</b> ${beer.abv}<br> <b>IBU:</b> ${beer.ibu}<br> <b>Total Volume:</b> ${beer.volume} Liters<br> <b>Boil Volume:</b> ${beer.boil_volume} Liters<br> <b>Mash Instructions:</b> ${beer.mash_instruct}<br> <b>Fermentation Instructions:</b> ${beer.fermentation_instruct}<br> <b>Suggested Food Pairings:</b> ${beer.food_pairing}<br> <b>Brewer's Tips:</b> ${beer.tips}<br><br>`
        ing.forEach(i => recipe.innerHTML += `<b>Ingredient Number: ${ing.indexOf(i) + 1}</b><br><b>Name:</b> ${i.name}<br><b>Category:</b> ${i.category}<br><b>Amount:</b> ${i.amount} ${i.unit}<br><br>`)
        _e.append(recipe)
        recipe.append(_delete)
        _delete.addEventListener("click", function(){
            _e.remove()
            _url.deleteBeer(beer)
        })        
        _e.addEventListener("click", function() {
            _e.removeChild(recipe)
        })//closes rendered recipe.
    })

}// eventlistener for beerList container. Renders Recipes and removes recipe rendering.

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelectorAll(button.dataset.modalTarget)
        openModal(modal)
    })
}) //event listener for opening modal

function openModal(modal) {
    console.log(closeModalButtons)
    if (modal == null) return;
    const button = document.getElementById("submitButton")
    modal[0].classList.add('active')
    overlay.classList.add('active')
    createBeerForm()
    createIngForm()
   
    button.addEventListener("click", () => {
        let nameInput = document.getElementById("beerName")
        let desc = document.getElementById("beerDesc")
        let abv = document.getElementById("abv")
        let ibu = document.getElementById("ibu")
        let vol = document.getElementById("volume")
        let bvol = document.getElementById("bVol")
        let mash = document.getElementById("mashIns")
        let ferm  = document.getElementById("fermIns")
        let pairings = document.getElementById("pairings")
        let tips = document.getElementById("tips")
        _url.addBeers(nameInput, desc, abv, ibu, vol, bvol, mash, ferm, pairings, tips)
        renderBeer()
        closeModal(modal)
    })
    beerContainer.append(button)
} 
//event handler for opening modal and appending new beer form

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal =  button.closest('.modal')
        const ing = document.getElementById("ing-body")
        const beerContainer = document.getElementById("modal-body")
        closeModal(modal)
        beerContainer.innerHTML = null
        //ing.innerHTML = null
    })
})// event listener for closing modal. 

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}// event handler for closing modal. Probably need to call this when you are submitting new beer. 

searchButton.addEventListener("keyup", (e) => {
    const beerList = document.getElementById("beerList")
    beerList.innerHTML = ""
    let foundBeers = Beer.allBeers.filter( b => b.name.toLowerCase().includes(e.target.value.toLowerCase()) )
    foundBeers.forEach(i => i.buildBeerHtml())

    
})