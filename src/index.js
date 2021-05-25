fetch("http://localhost:3000/beers")
    .then(response => response.json())
        .then(beers => console.log(beers))
            .catch(error => console.warn(error))

