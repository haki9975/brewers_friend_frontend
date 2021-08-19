class BeerApi {
  constructor(_url) {
    this.beerUrl = `${_url}/beers`;
  }

  getBeers() {
    fetch(this.beerUrl)
      .then((resp) => resp.json())
      .then((data) => {
        data.forEach((beer) => {
          const buildBeer = new Beer(beer);
          buildBeer.buildBeerHtml();
          beer.ingredients.forEach((i) => new Ingredient(i));
        });
      })
      .catch((error) => console.warn(error));
  }

  addBeers(beer) {
    fetch(this.beerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ beer }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.status == 201) {
          const newIng = data.ingredients;
          console.log(data.beer, "hello");
          const newBeer = new Beer(data.beer);
          newBeer.buildBeerHtml();
          console.log(newIng, "what");
          newIng.forEach((i) => new Ingredient(i));
        } else {
        }
      })
      .catch((error) => console.log(error.message));
  }

  deleteBeer(beer) {
    fetch(this.beerUrl + `/${beer.id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.messsage == "Successfully deleted") {
          console.log(data.message);
        } else {
          console.log(data.message);
        }
      })
      .catch((error) => console.log(error));
  }
}
