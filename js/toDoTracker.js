let list = [];

class NewTask {
    #task;
    #input;
    #div;
    #p;
    #button1;
    #button2;
    #mainDiv;
    #buttonDiv;
    #nav;
    #numHelp = 0;

    constructor(task) {
        this.#task = task;
    }

    get add() {
        this.#mainDiv = document.createElement('div');
        this.#mainDiv.style.marginTop = '9px'
        this.#buttonDiv = document.createElement('div');
        this.#buttonDiv.classList.add('buttonDiv')

        this.#mainDiv.style.maxWidth = '360px';
        this.#mainDiv.classList.add('task')

        this.#nav = document.createElement('nav');
        this.#nav.classList.add('addSett')

        this.#div = document.createElement('div');
        this.#div.style.display = 'flex';
        this.#div.style.height = '50px'
        this.#div.style.alignItems = 'center'
        this.#div.style.paddingLeft = '10px';

        this.#input = document.createElement('input');
        this.#input.type = 'checkbox';
        this.#input.id = 'check';

        this.#input.addEventListener('click', (e) => {
            this.taskCompleted(e)
        })

        this.#p = document.createElement('p');
        this.#p.textContent = this.#task;
        this.#p.style.paddingLeft= '5px'
        this.#p.style.maxHeight = '30px'

        this.#button1 = document.createElement('button');
        this.#button1.innerHTML = '<img src="../assets/img/edit.png" alt="Edit">';
        this.#button1.classList.add('buttonsToDo');
        this.#button1.addEventListener('click', (e) => {
            this.edit(this.#p)
        })

        this.#button2 = document.createElement('button');
        this.#button2.innerHTML = '<img src="../assets/img/bin.png" alt="bin" class="toDoImg" >';
        this.#button2.classList.add('buttonsToDo');
        this.#button2.addEventListener('click', (e) => {
            this.bin(e)
        })


        this.#div.append(this.#input);
        this.#div.append(this.#p);

        this.#buttonDiv.append(this.#button1);
        this.#buttonDiv.append(this.#button2);

        this.#mainDiv.append(this.#div);
        this.#mainDiv.append(this.#buttonDiv);
        this.#mainDiv.append(this.#nav);
        list.push(this.#mainDiv)

        return this.#mainDiv;
    }

    taskCompleted(e) {
        if (this.#input.checked) {
            this.#mainDiv.classList.add('completed');
            document.querySelector('.taskList').append(this.#mainDiv)
        } else {
            this.#mainDiv.classList.remove('completed');
            document.querySelector('.taskList').prepend(this.#mainDiv)
            this.#input.checked = false;
        }
    }

    bin(e) {
        this.#input.checked = true
        if (this.#mainDiv.classList.contains('completed')) {
            this.#button1.style.display = 'none';
            this.#button2.style.display = 'none';
            this.#input.style.display = 'none';
            this.#mainDiv.classList.add('delete');
        } else {
            this.#mainDiv.classList.add('delete');
            this.#button1.style.display = 'none';
            this.#button2.style.display = 'none';
            this.#input.style.display = 'none'
        }
        this.#mainDiv.style.display = 'none';
    }

    edit(el) {
        let enter = document.createElement('input');
        if (this.#numHelp === 0){
            this.#numHelp += 1;
            this.#div.append(enter);

            enter.value = this.#task;
            enter.classList.add('editEnter')

            el.style.display = 'none';
            enter.addEventListener('keypress', (e) => {
                if (e.code === 'Enter') {
                    el.textContent = enter.value;
                    el.style.display = '';
                    enter.remove();
                    this.#numHelp = 0;
                }
            });
        }
    }

}

function addNewTask() {
    let task = document.querySelector('#newTask')
    if (task.value){
        let taskAdd = new NewTask(task.value)
        document.querySelector('.taskList').append(taskAdd.add)
        task.value = '';
        if(list.length !== 0){
            list.forEach(el => {
                if (el.classList.contains('delete')) {
                    el.style.display = 'none';
                } else {
                    el.style.display = '';
                }
            })}
    }
}

document.addEventListener("keypress", function (e) {
    if (e.code === 'Enter'){
        addNewTask()
    }
})
document.querySelector('#addNewTask').addEventListener('click', function (e){ addNewTask() })

document.querySelector('#binTasks').addEventListener('click', function (e) {
    if(list.length !== 0){
        list.forEach(el => {
            if (el.classList.contains('delete')) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        })
    }
})

document.querySelector('#allTasks').addEventListener('click', function (e) {
    if(list.length !== 0){
        list.forEach(el => {
            if (el.classList.contains('delete')) {
                el.style.display = 'none';
            } else {
                el.style.display = '';
            }
        })
    }
})

