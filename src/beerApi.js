

class BeerApi {
   
    constructor(_url){
        this.beerUrl = `${_url}/beers`
        
    }

    getBeers(){
        fetch(this.beerUrl)
            .then(resp => resp.json())
            .then(data => {
                    data.forEach(beer => {
                      const buildBeer = new Beer(beer)
                      let ing = beer.ingredients
                      ing.forEach(i => new Ingredient(i))
                      buildBeer.buildBeerHtml()
                    })
        })
        .catch(error => console.warn(error))
    }

    addBeers(beer){
        console.log(beer)        
       fetch(this.beerUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({beer})        
        })
            .then(resp => resp.json())
                .then(data => {
                    
                    if (data.status == 201){
                        const newIng = data.ingredients
                        const newBeer = new Beer(data.beer)
                        console.log("works")                        
                        newBeer.buildBeerHtml()
                        newIng.forEach(i => new Ingredient(i))
                       
                    } else {
                        console.log(data)
                    }
                })
                    .catch(error => console.log(error.message))
    }

    deleteBeer(beer){
        fetch(this.beerUrl +`/${beer.id}`, {
            method: "DELETE"     
         })
         .then(resp => resp.json())
             .then(data => {
                    if (data.messsage == "Successfully deleted"){
                        console.log(data.message)
                    } else {
                        console.log(data.message)
                    }
                })
                    .catch(error => console.log(error))
    }
}



    

