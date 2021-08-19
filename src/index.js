const _url = new BeerApi("http://localhost:3000");
const modal = document.getElementById("modal");
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.getElementById("close-button");
const overlay = document.getElementById("overlay");
const addIngredient = document.getElementById("add-ing");
let i = 0;

document.addEventListener("DOMContentLoaded", () => {
  //fetch to database, gets data and renders beer names
  _url.getBeers();
  renderBeer();
});

function createBeerForm() {
  const beerContainer = document.getElementById("modal-body");
  const form = document.createElement("form");
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
    `;
  form.id = "recipeForm";
  const submitButton = document.createElement("button");
  submitButton.id = "submitButton";
  submitButton.innerHTML = `submit`;
  beerContainer.appendChild(form);
  beerContainer.appendChild(submitButton);
  const addIng = document.createElement("button");
  addIng.type = "button";
  addIng.id = "add-Ing";
  addIng.innerHTML = "Add Ingredient";
  button = document.getElementById("submitButton");
  button.addEventListener("click", (e) => {
    e.preventDefault;
    let nameInput = document.getElementById("beerName");
    let desc = document.getElementById("beerDesc");
    let abv = document.getElementById("abv");
    let ibu = document.getElementById("ibu");
    let vol = document.getElementById("volume");
    let bvol = document.getElementById("bVol");
    let mash = document.getElementById("mashIns");
    let ferm = document.getElementById("fermIns");
    let pairings = document.getElementById("pairings");
    let tips = document.getElementById("tips");
    let ingredients = [];
    let ingredientCount = document.getElementsByClassName("ing-field");
    for (i = 0; i < ingredientCount.length; i++) {
      let _name = document.getElementsByName(`beer[ingredient][${i}][name]`)[0]
        .value;
      let _category = document.getElementsByName(
        `beer[ingredient][${i}][category]`
      )[0].value;
      let _amount = document.getElementsByName(
        `beer[ingredient][${i}][amount]`
      )[0].value;
      let _unit = document.getElementsByName(`beer[ingredient][${i}][unit]`)[0]
        .value;
      let ingObj = {
        name: _name,
        category: _category,
        amount: _amount,
        unit: _unit,
      };
      ingredients.push(ingObj);
    }
    let beer = {
      name: nameInput.value,
      description: desc.value,
      abv: abv.value,
      ibu: ibu.value,
      volume: vol.value,
      boil_volume: bvol.value,
      mash_instruct: mash.value,
      fermentation_instruct: ferm.value,
      food_pairing: pairings.value,
      tips: tips.value,
      ingredients_attributes: ingredients,
    };
    console.log(beer);
    _url.addBeers(beer);
    closeModal();
  });
  addIng.addEventListener("click", (e) => {
    console.log(button);
    e.preventDefault;
    createIngForm();
  });
  beerContainer.appendChild(addIng);
} //create new beer form

// addIngredient.addEventListener("click", (e) => {
//   e.preventDefault;
//   createIngForm();
// });

function createIngForm() {
  const addIngredient = document.getElementById("add-ing");
  const form = document.getElementById("recipeForm");
  let i = document.getElementsByClassName("ing-field").length;
  const ingForm = `
    <fieldset class="ing-field">
    <p>Ingredient:</p><br>
    <input placeholder="Ingredient Name" type="text" name="beer[ingredient][${i}][name]"/><br>
    <input placeholder="Category" type="text" name="beer[ingredient][${i}][category]"/><br>
    <input placeholder="Amount" type="number" step="0.1" name="beer[ingredient][${i}][amount]"/><br>
    <input placeholder="Unit" type="text" name="beer[ingredient][${i}][unit]"/><br>
    </fieldset>
        `;
  form.innerHTML += ingForm;
} //create new ingredient form - should associate with the beer it is

function renderBeer() {
  const bList = document.getElementById("beerList");
  bList.addEventListener("click", function (e) {
    const _e = e.target;
    const _delete = document.createElement("button");
    _delete.id = "delete";
    _delete.innerHTML = "Delete Recipe";
    let recipe = document.createElement("p");
    beer = Beer.allBeers.find((beer) => beer.id == _e.id);
    if (beer !== undefined) {
      let ing = Ingredient.allIngredients.filter((i) => i.beer_id == beer.id);
      recipe.innerHTML = `<b>Name:</b> ${beer.name} <br> <b>Description:</b> ${beer.description}<br> <b>ABV:</b> ${beer.abv}<br> <b>IBU:</b> ${beer.ibu}<br> <b>Total Volume:</b> ${beer.volume} Liters<br> <b>Boil Volume:</b> ${beer.boil_volume} Liters<br> <b>Mash Instructions:</b> ${beer.mash_instruct}<br> <b>Fermentation Instructions:</b> ${beer.fermentation_instruct}<br> <b>Suggested Food Pairings:</b> ${beer.food_pairing}<br> <b>Brewer's Tips:</b> ${beer.tips}<br><br>`;
      ing.forEach(
        (i) =>
          (recipe.innerHTML += `<b>Ingredient Number: ${
            ing.indexOf(i) + 1
          }</b><br><b>Name:</b> ${i.name}<br><b>Category:</b> ${
            i.category
          }<br><b>Amount:</b> ${i.amount} ${i.unit}<br><br>`)
      );
    }
    _e.append(recipe);
    recipe.append(_delete);
    _delete.addEventListener("click", function () {
      _e.remove();
      _url.deleteBeer(beer);
    });
    _e.addEventListener("click", function () {
      _e.removeChild(recipe);
    }); //closes rendered recipe.
  });
} // eventlistener for beerList container. Renders Recipes and removes recipe rendering.

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelectorAll(button.dataset.modalTarget);
    openModal(modal);
  });
}); //event listener for opening modal

function openModal(modal) {
  if (modal == null) return;
  if (modal != null) {
    // const button = document.getElementById("submitButton");
    modal[0].classList.add("active");
    overlay.classList.add("active");
    createBeerForm();
    createIngForm();

    // button.addEventListener("click", (e) => {
    //   e.preventDefault;
    //   let nameInput = document.getElementById("beerName");
    //   let desc = document.getElementById("beerDesc");
    //   let abv = document.getElementById("abv");
    //   let ibu = document.getElementById("ibu");
    //   let vol = document.getElementById("volume");
    //   let bvol = document.getElementById("bVol");
    //   let mash = document.getElementById("mashIns");
    //   let ferm = document.getElementById("fermIns");
    //   let pairings = document.getElementById("pairings");
    //   let tips = document.getElementById("tips");
    //   let ingredients = [];
    //   let ingredientCount = document.getElementsByClassName("ing-field");
    //   for (i = 0; i < ingredientCount.length; i++) {
    //     let _name = document.getElementsByName(
    //       `beer[ingredient][${i}][name]`
    //     )[0].value;
    //     let _category = document.getElementsByName(
    //       `beer[ingredient][${i}][category]`
    //     )[0].value;
    //     let _amount = document.getElementsByName(
    //       `beer[ingredient][${i}][amount]`
    //     )[0].value;
    //     let _unit = document.getElementsByName(
    //       `beer[ingredient][${i}][unit]`
    //     )[0].value;
    //     let ingObj = {
    //       name: _name,
    //       category: _category,
    //       amount: _amount,
    //       unit: _unit,
    //     };
    //     ingredients.push(ingObj);
    //   }
    //   let beer = {
    //     name: nameInput.value,
    //     description: desc.value,
    //     abv: abv.value,
    //     ibu: ibu.value,
    //     volume: vol.value,
    //     boil_volume: bvol.value,
    //     mash_instruct: mash.value,
    //     fermentation_instruct: ferm.value,
    //     food_pairing: pairings.value,
    //     tips: tips.value,
    //     ingredients_attributes: ingredients,
    //   };
    //   _url.addBeers(beer);
    //   closeModal();
    // });
  }
  // beerContainer.append(button);
} //event handler for opening modal and appending new beer form

closeModalButtons.addEventListener("click", () => {
  closeModal();
});
// event listener for closing modal.

function closeModal() {
  // const button = document.getElementById("submitButton");
  const beerContainer = document.getElementById("modal-body");
  beerContainer.innerHTML = null;
  // beerContainer.appendChild(button);
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
  // _url.getBeers();
} // event handler for closing modal. Probably need to call this when you are submitting new beer.

const searchButton = document.getElementById("search");

searchButton.addEventListener("keyup", (e) => {
  const beerList = document.getElementById("beerList");
  beerList.innerHTML = "";
  let foundBeers = Beer.allBeers.filter((b) =>
    b.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  foundBeers.forEach((i) => i.buildBeerHtml());
});
