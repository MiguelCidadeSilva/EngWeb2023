function formUtilizador()
{
    return `
    <form class="w3-container" method="POST">
        <fieldset>
            <legend>Utilizador</legend>
            <label>Id</label>
            <input class="w3-input w3-round" type="text" name="id"/>
            <label>Name</label>
            <input class="w3-input w3-round" type="text" name="nome"/>
        </fieldset>
        <br/>
        <button class="w3-btn w3-purple w3-mb-2" type="submit">Register User</button>
    </form>
    `
}

function formTarefa(ListOfUsers)
{
    pag= `
    <form class="w3-container" method="POST">
        <fieldset>
            <legend>Utilizador</legend>
            <label>Id</label>
            <input class="w3-input w3-round" type="text" name="id"/>
            <label>Who?</label>
            <select class="w3-select w3-round" name="who"/>`
    ListOfUsers.forEach(function(user)
    {
        pag+=`
            <option value ="${user.id}">${user-nome}</option>
        `
    })        
    pag+=`
            </select>
            <label>What?</label>
            <input class="w3-input w3-round" type="text" name="what"/>
        </fieldset>
        <br/>
        <button class="w3-btn w3-purple w3-mb-2" type="submit">Register Task</button>
    </form>
    `
    return pag
}

//editar task

//main page -> preciso de funcao que mostre as tarefas feitas e outra as  por fazer

//se tiver tempo faço função de sucesso de submissão