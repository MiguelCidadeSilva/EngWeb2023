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
        <button class="w3-btn w3-teal w3-mb-2" type="submit">Register User</button>
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
            <option value ="${user.id}">${user.nome}</option>
        `
    })        
    pag+=`
            </select>
            <label>What?</label>
            <input class="w3-input w3-round" type="text" name="what"/>
            <input class="w3-radio" type="radio" name="done" value="0" checked>
            <label>To Do</label>
            <input class="w3-radio" type="radio" name="done" value="1">
            <label>Done</label>
        </fieldset>
        <br/>
        <button class="w3-btn w3-teal w3-mb-2" type="submit">Register Task</button>
    </form>
    `
    return pag
}

function showTasks(lt, b, users,f)
{
    lt.sort((n1, n2) => {
        if (users[n1.who] && users[n2.who]) {
          return users[n1.who].localeCompare(users[n2.who]);
        }
        // handle case where either n1.who or n2.who is not defined in users
        return 0;
      })
    if(f == 1){
        pagHtml= `
        <div style="text-align: center;">
            <p>Tarefas feitas</p>
        </div>
        `
    }
    if(f == 0){
        pagHtml=`
        <div style="text-align: center;">
            <p>Tarefas por fazer</p>
        </div>`
    }
    pagHtml += `
    <table class="w3-table w3-striped w3-bordered w3-centered">
        <tr class="w3-teal">
            <td>ID</td>
            <td>Who</td>
            <td>What</td>`
    if(b)
        pagHtml += `       
            <td></td>`
    pagHtml += `</tr>`
    for(const elem of lt)
    {
        pagHtml += `
        <tr>
            <td>${elem.id}</td>
            <td>${users[elem.who]}</td>
            <td>${elem.what}</td>`
        if(b)
            pagHtml += `
            <td>
                <a class="w3-btn w3-round-xlarge w3-teal w3-padding-small" href="/tarefa/done/${elem.id}"><b>Done</b></a> 
                <a class="w3-btn w3-round-xlarge w3-teal w3-padding-small" href="/tarefa/edit/${elem.id}"><b>Edit</b></a>
            </td>
            `
        pagHtml += `</tr>`
    }
    return pagHtml + `</table>`
}


function showTasksTODO(listTasks,users,f)
{
    const lt = listTasks.filter(elem => elem.done == 0)
    return showTasks(lt,true,users,f)
}

function showTasksDone(listTasks,users,f)
{
    const lt = listTasks.filter(elem => elem.done != 0)
    return showTasks(lt,false,users,f)
}


exports.showPage = function showPage(users,tasks){
    var usernome = {}
    for(const u of users)
        usernome[u.id] = u.nome
    pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <title>Task Manager</title>
        </head>
        <body>
        <header class="w3-container w3-teal">
            <h1> Task Manager </h1>
        </header>
        <div class="w3-container">
        <div class="w3-cell" style="width:60%">`
    pagHTML += formTarefa(users)
    pagHTML += `
                </div>
                <div class="w3-cell" style="width:40%"> `
    pagHTML += formUtilizador()
    pagHTML += `
                </div>
            </div>
            <br />
            <div class="w3-cell-row">
                <div class="w3-cell"  style="width:45%">`
    pagHTML += showTasksTODO(tasks,usernome,0)
    pagHTML += `</div>
                <div class="w3-cell"  style="width:10%">
                </div>
                <div class="w3-cell"  style="width:45%">`
    pagHTML += showTasksDone(tasks,usernome,1)
    pagHTML += `
                </div>
            </div>
            </div>
        </body>
    </html>`
    return pagHTML
}


//editar task

//main page -> preciso de funcao que mostre as tarefas feitas e outra as  por fazer

//se tiver tempo faço função de sucesso de submissão