

class Ingredient {
    static allIngredients = []
    constructor({id, name, category, amount, unit, beer_id}){
        this.id = id
        this.name = name
        this.category = category
        this.amount = amount
        this.unit = unit
        this.beer_id = beer_id
        Ingredient.allIngredients.push(this)
    }
}