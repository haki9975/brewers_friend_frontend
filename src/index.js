const _url = new BeerApi("http://localhost:3000")
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay  = document.getElementById('overlay')
const beerContainer = document.getElementById("modal-body")


document.addEventListener("DOMContentLoaded", () => {
   // getBeers(); //fetch to database, gets data and renders beer names
      _url.getBeers() 
      renderBeer()
})

function createBeerForm(){
    const form = document.createElement("form")
    form.innerHTML += `
    <p>Beer Recipe:</p><br>
    <input id="beerName" placeholder="Beer Name" type="text" name="name"/><br>
    <input id ="beerDesc" placeholder="Description" type="textarea" name="desription"/><br>
    <input id="abv" placeholder="ABV" type="number" step="0.1" name="abv"/><br>
    <input id="ibu" placeholder="IBU" type="number" step="0.1" name="ibu"/><br>
    <input id="volume" placeholder="Volume" type="number" step="0.1" name="volume"/><br>
    <input id="bVol" placeholder="Boil Volume" type="number" step="0.1" name="name"/><br>
    <input id="mashIns" placeholder="Mash Instructions" type="text" name="mash_instruct"/><br>
    <input id="fermIns" placeholder="Fermentation Instructions" type="text" name="ferment_instruct"/><br>
    <input id="pairings" placeholder="Food Pairings" type="text" name="food_pairing"/><br>
    <input id="tips" placeholder="Tips" type="text" name="tips"/><br>
    `
    beerContainer.appendChild(form) 
}//create new beer form

function createIngForm(){
    const form = document.createElement("form")
    form.innerHTML += `
    <p>Ingredient:</p><br>
    <input placeholder="Ingredient Name" type="text" name="name"/><br>
    <input placeholder="Category" type="text" name="category"/><br>
    <input placeholder="Amount" type="number" step="0.1" name="amount"/><br>
    <input placeholder="Unit" type="text" name="unit"/><br>
    <button id="add-ing">Add Another Ingredient</button>
    `
    beerContainer.appendChild(form)
    const addIngredient = document.getElementById("add-ing")
    addIngredient.addEventListener("click", (e) => {
        e.preventDefault
        addIngredient.remove()
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
    const button = document.createElement("button")
    modal[0].classList.add('active')
    overlay.classList.add('active')
    createBeerForm()
    createIngForm()
    button.innerHTML="Submit Recipe"
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
} //event handler for opening modal and appending new beer form

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

