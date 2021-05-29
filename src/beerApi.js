

class BeerApi {
    
    constructor(_url){
        this.beerUrl = `${_url}/beers`
        //this.ingredientUrl = `${_url}/ingredients`
        // this.deleteBeerUrl = `${_url}/beers/${id}`
    }

    getBeers(){
        fetch(this.beerUrl)
            .then(resp => resp.json())
                .then(data => {
                    data.forEach(beer => {
                      const buildBeer = new Beer(beer)
                      buildBeer.buildBeerHtml()
                    })
                })
        .catch(error => console.warn(error))
    }

    addBeers(nameInput, desc, abv, ibu, vol, bvol, mash, ferm, pairings, tips){
       fetch(this.beerUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: nameInput.value,
                description: desc.value,
                abv: abv.value,
                ibu: ibu.value,
                volume: vol.value,
                boil_volume: bvol.value,
                mash_instruct: mash.value,
                fermentation_instruct: ferm.value,
                food_pairings: pairings.value,
                tips: tips.value
            })
        })
            .then(resp => resp.json())
                .then(data => {
                    debugger
                    console.log(data)
                    
                    // if (data.status === 201){
                    //    // this.addBeers(data.beer)
                    // } else {
                    //     alert(data.errors)
                    // }
                    // nameInput.value = ""
                })
                    .catch(error => alert(error.message))
    }

    deleteBeer(beerId){
        fetch(this.deleteBeerUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                //id: beer id???
            })
        })

    }
    
   

}



    

