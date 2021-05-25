document.addEventListener("DOMContentLoaded", () => {
    getBeers();
    //createForm();
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
}

function createForm(){
    const scaleContainer = document.getElementById("scale-container")
    const form = document.createElement('form')
        form.innerHTML = `<input placeholder='Scale your recipe!' type=text /><br><input type='submit'/>`
        scaleContainer.append(form)    
}
