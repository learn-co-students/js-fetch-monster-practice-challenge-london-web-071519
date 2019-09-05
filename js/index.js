const MONSTURL = 'http://localhost:3000/monsters/?_limit=50&_page=7'


function addForm() {
    let formDiv = document.querySelector('#create-monster')
    formDiv.innerHTML = ""
            let addMonstForm = document.createElement('form')
            addMonstForm.innerHTML = `
            Name: <br>
            <input type="text" name="name">  <br>
            Age: <br>
            <input type="text" name="age"> <br>
            Description: <br>
            <input type="textarea" name="description">
            <input type="submit" id="submitMonst">`
            formDiv.append(addMonstForm)
            let formButton = document.querySelector('#submitMonst')
            formButton.addEventListener('click', e => {
                let newMonster = {
                    name: e.target.previousElementSibling[0].value,
                    age: e.target.previousElementSibling[1].value,
                    description: e.target.previousElementSibling[2].value
                }
                fetch(MONSTURL, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(newMonster)
                }).then(renderMonsters)
            })
            formDiv.append(formButton)
}


function fetchMonsters() {
    return fetch(MONSTURL)
    .then(resp => resp.json())
}


function renderMonsters() {
    addForm()
    fetchMonsters().then(allMonsters => {
        allMonsters.forEach(monster => {
            let monstListDiv = document.querySelector('#monster-container')
            let monstSingleDiv = document.createElement('div')
            monstSingleDiv.innerHTML = `
            <h2>Name: ${monster.name}</h2>
            <h3>Age: ${monster.age}</h3>
            <p>Description: ${monster.description}</p>
            <br>
            `
            monstListDiv.append(monstSingleDiv)
            
        });
    })
}

renderMonsters()