let localStorageList = JSON.parse(localStorage.getItem('tasks')) || [];
let deletedList = [];

class NewTask {
    static loadCompleted = 0
    static stoploadCompleted = true
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
    #bin;
    #completed;

    constructor(task, completed, bin) {
        this.#task = task;
        this.#completed = completed;
        this.#bin = bin;
    }

    toJSON(){
        return{
            task: this.#task,
            completed: this.#completed,
            bin: this.#bin,
        }
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

        deletedList.push(this.#mainDiv)

        if (this.#completed) this.taskCompleted();
        if (this.#bin) this.bin();

        return this.#mainDiv;
    }

    taskCompleted(e) {
        if ((NewTask.loadCompleted === (localStorageList.filter(el => el.completed).length))){
            NewTask.stoploadCompleted = false
        }else if ((NewTask.loadCompleted !== (localStorageList.filter(el => el.completed).length)) && this.#completed && NewTask.stoploadCompleted) {
            this.#input.checked = this.#completed
            NewTask.loadCompleted += 1

        }

        this.#completed = this.#input.checked
        let index = -1;

        if (this.#input.checked) {
            this.#mainDiv.classList.add('completed');
            document.querySelector('.taskList').append(this.#mainDiv)
        } else {
            this.#mainDiv.classList.remove('completed');
            document.querySelector('.taskList').prepend(this.#mainDiv)
            this.#input.checked = false;
        }

        localStorageList.findIndex(el => {
            if (el.task === this.#task) index = localStorageList.indexOf(el)
        });
        if (index !== -1) {
            localStorageList[index].completed = this.#completed;
            localStorage.setItem('tasks', JSON.stringify(localStorageList));
        }
    }

    bin(e) {
        (this.#bin) ? this.#input.checked = this.#bin : this.#completed = this.#input.checked;

        let index = -1

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

        localStorageList.findIndex(el => {
            if (el.task === this.#task) index = localStorageList.indexOf(el)
        });
        if (index !== -1) {
            localStorageList[index].bin = true;
            localStorage.setItem('tasks', JSON.stringify(localStorageList));
        }
    }

    edit(el) {
        let enter = document.createElement('input');
        let index = -1;
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

                    localStorageList.findIndex(el => {
                        if (el.task === this.#task) index = localStorageList.indexOf(el)
                    });
                    if (index !== -1) {
                        localStorageList[index].task = enter.value;
                        localStorage.setItem('tasks', JSON.stringify(localStorageList));
                    }
                }
            });
        }
    }

}

function addNewTask() {
    let task = document.querySelector('#newTask')
    if (task.value){
        let taskAdd = new NewTask(task.value, false, false)
        document.querySelector('.taskList').append(taskAdd.add)
        localStorageList.push(taskAdd.toJSON())
        localStorage.setItem('tasks', JSON.stringify(localStorageList))
        task.value = '';

        if(deletedList.length !== 0){
            deletedList.forEach(el => {
                if (el.classList.contains('delete')) {
                    el.style.display = 'none';
                } else {
                    el.style.display = '';
                }
            })}
    }
}

window.addEventListener('load', ()=>{
    if (localStorage.length !== 0){
        let taskList = JSON.parse(localStorage.getItem('tasks'))
        taskList.forEach(el => {
            let taskAdd = new NewTask(el.task, el.completed, el.bin)
            document.querySelector('.taskList').append(taskAdd.add)
        })

    }
})

document.addEventListener("keypress", function (e) {
    if (e.code === 'Enter'){
        addNewTask()
    }
})
document.querySelector('#addNewTask').addEventListener('click', function (e){ addNewTask() })

document.querySelector('#binTasks').addEventListener('click', function (e) {
    if(localStorageList.length !== 0){
        deletedList.forEach(el => {
            if (el.classList.contains('delete')) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        })
    }
})

document.querySelector('#allTasks').addEventListener('click', function (e) {
    if(localStorageList.length !== 0){
        deletedList.forEach(el => {
            if (el.classList.contains('delete')) {
                el.style.display = 'none';
            } else {
                el.style.display = '';
            }
        })
    }
})

