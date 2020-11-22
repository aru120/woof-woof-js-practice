const dogNav = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")
const dogButton = document.querySelector("#Dog-Button")
const navButton = document.querySelector("button#good-dog-filter")
const dogNav1 = document.querySelectorAll("span")
dogInfo.addEventListener("click",updateDog)
dogNav.addEventListener("click", renderDog)
navButton.addEventListener("click",renderGoodDog)


const initialize = () => {
    fetch(`http://localhost:3000/pups`)
    .then(resp => resp.json())
    .then(data => {
        data.forEach(dog =>{
            addDogNav(dog)
        })
    })
}

function addDogNav(dogObj){
    
    const span = document.createElement("span")
    span.dataset.id = dogObj.id
    span.textContent = dogObj.name

    dogNav.append(span)

}

// dogNav.addEventListener("click", renderDog)

function renderGoodDog(e){
    if(navButton.textContent == "Filter good dogs: OFF"){
    fetch(`http://localhost:3000/pups`)
    .then(resp=> resp.json())
    .then(data => {
        dogNav.innerHTML = ""
        data.forEach(dog =>{
            goodDogs(dog)
        })
    })
    navButton.textContent = "Filter good dogs: ON"
}
    else if(navButton.textContent = "Filter good dogs: ON"){
        fetch(`http://localhost:3000/pups`)
        .then(resp => resp.json())
        .then(data => {
            dogNav.innerHTML = ""
            data.forEach(dog =>{
                addDogNav(dog)
            })
        })
        navButton.textContent = "Filter good dogs: OFF"
    }
}

function goodDogs(dogObj){
    
    if(dogObj.isGoodDog){
        addDogNav(dogObj)
    }
}

function renderDog(e){
    if(e.target.matches("span")){
    const dogId = e.target.dataset.id

    fetch(`http://localhost:3000/pups/${dogId}`)
    .then(resp => resp.json())
    .then(data =>{
        appendDog(data)
    })
    }
}

function appendDog(dogObj){
    let dogStatus = "Good Dog!"

    if(dogObj.isGoodDog == false){
        dogStatus = "Bad Dog"
    }
    dogInfo.dataset.id = dogObj.id    

    dogInfo.innerHTML = `
        <img src=${dogObj.image} alt="Cute Dog" >
        <h2>${dogObj.name} </h2>
        <button id="Dog-Button"> ${dogStatus} </button>
    `    
}

function updateDog(e){
    e.preventDefault()
    
    const dogId = e.target.parentNode.dataset.id
    
    if(e.target.textContent === " Bad Dog "){
        fetch(`http://localhost:3000/pups/${dogId}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            isGoodDog: true
        })
    })
    .then( resp => resp.json())
    .then(data =>{
        
        renderDog(data)
    })

    }
    else if(e.target.textContent === " Good Dog! "){
        fetch(`http://localhost:3000/pups/${dogId}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            isGoodDog: false
        })
    })
    .then( resp => resp.json())
    .then(data =>{
        
        renderDog(data)
    })
    }    
}




initialize()

