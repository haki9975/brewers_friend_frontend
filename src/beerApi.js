

class BeerApi {
    
    constructor(_url){
        this.beerUrl = `${_url}/beers`
        this.ingredientUrl = `${_url}/ingredients`
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

    addBeers(){
        fetch(this.beerUrl, newBeerForm)
            .then(resp => resp.json())
                .then(json => console.log(json))
                    .catch(error => alert(error.message))
    }
    
   

}

const newBeerForm = {
    method: "POST",
    headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(data)
}

    

