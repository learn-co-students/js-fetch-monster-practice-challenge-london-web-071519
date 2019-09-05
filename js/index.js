const createMonsterDiv = document.querySelector('#create-monster')
const monsterContainerDiv = document.querySelector('#monster-container')
const monstersURL = 'http://localhost:3000/monsters'
let forwardButton = document.querySelector('#forward')
let backButton = document.querySelector('#back')
let i = 1

//////////////////////////////////////////////////////////////
/////////////Forward and Backward Event Listeners/////////////
forwardButton.addEventListener('click', event => {
    ++i
    monsterContainerDiv.innerHTML = ""
    return fetch(`${monstersURL}/?_limit=50&_page=${i}`)
    .then(resp => resp.json())
    .then(monsters => monsters.forEach(monster => renderMonster(monster)))
    .catch(error => alert(error.message))
})

backButton.addEventListener('click', event => {
    --i
    monsterContainerDiv.innerHTML = ""
    return fetch(`${monstersURL}/?_limit=50&_page=${i}`)
    .then(resp => resp.json())
    .then(monsters => monsters.forEach(monster => renderMonster(monster)))
    .catch(error => alert(error.message))
})
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////
/////////////Get the first batch of monsters! ////////////////

function renderMonsters(){
    return fetch(`${monstersURL}/?_limit=50&_page=1`)
    .then(resp => resp.json())
    .then(monsters => monsters.forEach(monster => renderMonster(monster)))
    .catch(error => alert(error.message))
}

function renderMonster(monster){
    let newDiv = document.createElement('div')
    newDiv.classList.add('monster-card')
    let h1El = document.createElement('h1')
    h1El.innerText = monster.name
    let h3El = document.createElement('h3')
    h3El.innerText = `Age: ${monster.age}`
    let h2El = document.createElement('h2')
    h2El.innerHTML = `Description: <br><br>${monster.description}`

    newDiv.appendChild(h1El)
    newDiv.appendChild(h3El)
    newDiv.appendChild(h2El)
    monsterContainerDiv.appendChild(newDiv)
}
/////////////////////////////////////////////////////
/////////////Creating the monster form////////////

function createMonsterForm(){
    let monsterForm = document.createElement('form')
    monsterForm.setAttribute('method', 'post')
    monsterForm.setAttribute('action', 'submit.php')
    monsterForm.classList.add('monster-from')
        monsterForm.addEventListener('submit', event =>{
        event.preventDefault()
            return fetch(monstersURL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    "name": `${event.target.name.value}`,
                    "age": `${event.target.age.value}`,
                    "description": `${event.target.description.value}`
                })})})
    let nameInput = document.createElement('input')
    let nameLabel = document.createElement('label')
    nameLabel.setAttribute('for', 'name')
    nameLabel.innerText = "Monster Name"
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('name', 'name')


    let ageInput = document.createElement('input')
    let ageLabel = document.createElement('label')
    ageLabel.setAttribute('for', 'age')
    ageLabel.innerText = "Age"
    ageInput.setAttribute('type', 'text')
    ageInput.setAttribute('name', 'age')

    let descriptionInput = document.createElement('input')
    let descriptionLabel = document.createElement('label')
    descriptionLabel.setAttribute('for', 'description')
    descriptionLabel.innerText = "Description"
    descriptionInput.setAttribute('type', 'text')
    descriptionInput.setAttribute('name', 'description')

    let submitFormButton = document.createElement('input')
    submitFormButton.setAttribute('type', 'submit')
    submitFormButton.setAttribute('value', 'Submit')

    monsterForm.appendChild(nameLabel)
    monsterForm.append(nameInput)
    monsterForm.append(ageLabel)
    monsterForm.append(ageInput)
    monsterForm.appendChild(descriptionLabel)
    monsterForm.append(descriptionInput)
    monsterForm.append(submitFormButton)

    createMonsterDiv.append(monsterForm)
}

createMonsterForm()

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////

renderMonsters()