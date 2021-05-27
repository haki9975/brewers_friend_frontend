
class BeerApi {
    
    constructor(beerUrl){
        this.beerUrl = `${beerUrl}/beers`
    }

    getBeers(){
        fetch(this.beerUrl)
            .then(resp => resp.json())
                .then(data => {
                    data.forEach(beer => {
                      const buildBeer = new Beer(beer)
                      debugger
                      buildBeer.buildBeerHtml()
                    })
                })
        .catch(error => console.warn(error))
    }
   

}

    

