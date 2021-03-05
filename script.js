
// function myFunction() {
//     const xmlRequest = new XMLHttpRequest();

//     xmlRequest.onreadystatechange = function() {
//         if(this.readyState == 4 && this.status == 200){
//             document.getElementById('test-xml').innerHTML = this.responseText;
//         }
//     }
//     xmlRequest.open('GET', 'ajax_info.txt', true);
//     xmlRequest.send();
// }

const addToDoBtn = document.getElementById('addToDo');
addToDoBtn.addEventListener('click', function(e) {
    const text = document.getElementById('toDoText').value;
    console.log(text);

    fetch('http://localhost:3000/todos', { 
        method: 'POST',
        body: JSON.stringify({
            text,
            "completed": false
        }),
        headers: {
            'Content-Type': 'application/json'
        }   
    })
    .then(() => displayToDos());
});


function getToDos(){
    return fetch('http://localhost:3000/todos', { method: 'GET'})
    .then(result => result.json());
}

function createToDoElems(todos){
    const fragment = document.createDocumentFragment();

    todos.forEach(todo => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        const p = document.createElement('p');
        p.innerText = todo.text;       
        li.appendChild(checkbox);
        li.appendChild(p);
        fragment.appendChild(li);
    });

    return fragment;
}

async function displayToDos() {
    
    const toDos = await getToDos();
    console.log(toDos);
    const list = document.getElementById('doToList');

    list.innerHTML = null;
    const toDoElems = createToDoElems(toDos);

    list.appendChild(toDoElems);
}


//getToDos();
displayToDos()