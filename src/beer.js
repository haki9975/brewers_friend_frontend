
class Beer {
    static allBeers = []
    constructor({id, name, description, abv, ibu, volume, boil_volume, mash_instruct, fermentation_instruct, food_pairing, tips, ingredients}) {
            this.id = id
            this.name = name
            this.description = description
            this.abv = abv
            this.ibu = ibu
            this.volume = volume
            this.boil_volume = boil_volume
            this.mash_instruct = mash_instruct
            this.fermentation_instruct = fermentation_instruct
            this.food_pairing = food_pairing
            this.tips = tips
            Beer.allBeers.push(this)
    }    

    buildBeerHtml(){
        const beerList = document.getElementById("beerList")
        beerList.innerHTML += `<li id=${this.id}>${this.name}</li>`
    }
}