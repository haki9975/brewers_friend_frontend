const _url = new BeerApi("http://localhost:3000")
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay  = document.getElementById('overlay')
const beerContainer = document.getElementById("modal-body")


document.addEventListener("DOMContentLoaded", () => {
   // getBeers(); //fetch to database, gets data and renders beer names
      _url.getBeers() 
      logTarget()
})

function createBeerForm(){
    const form = document.createElement("form")
    form.innerHTML += `
    <p>Beer Recipe:</p><br>
    <input placeholder="Beer Name" type="text" name="name"/><br>
    <input placeholder="Description" type="textarea" name="desription"/><br>
    <input placeholder="ABV" type="number" step="0.1" name="abv"/><br>
    <input placeholder="IBU" type="number" step="0.1" name="ibu"/><br>
    <input placeholder="Volume" type="number" step="0.1" name="volume"/><br>
    <input placeholder="Boil Volume" type="number" step="0.1" name="name"/><br>
    <input placeholder="Mash Instructions" type="text" name="mash_instruct"/><br>
    <input placeholder="Fermentation Instructions" type="text" name="ferment_instruct"/><br>
    <input placeholder="Food Pairings" type="text" name="food_pairing"/><br>
    <input placeholder="Tips" type="text" name="tips"/><br>
    `
    beerContainer.appendChild(form) 
}//create new beer form

function createIngForm(){
    const ingBody = document.getElementById("ing-body")
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

}// eventlistener for beerList container


function handleBeerForm(e){

    e.preventDefault()
    
}// handler for submitting new beer form

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelectorAll(button.dataset.modalTarget)
        openModal(modal)

    })
}) //event listener for opening modal

function openModal(modal) {
    const addIngredient = document.getElementById("add-ing")
    if (modal == null) return;
    modal[0].classList.add('active')
    overlay.classList.add('active')
    createBeerForm()
    createIngForm()
    addIngredient.addEventListener("click", (e) => {
        e.preventDefault
        addIngredient.remove()
        createIngForm()
    })
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

