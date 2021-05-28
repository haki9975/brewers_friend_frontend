

class BeerApi {
    dubgger
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

    addBeers(nameInput){
       fetch(this.beerUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                name: nameInput.value
                
            })
        })
            .then(resp => resp.json())
                .then(data => {
                    console.log(data, this)
                    debugger
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



    

