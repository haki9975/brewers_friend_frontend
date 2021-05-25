console.log("hello!")

function getBeers(){
    fetch("http://localhost:3000/beers")
        .then(response => response.json())
            .then(data => console.log(data))
                .catch(error => console.warn(error))
}

