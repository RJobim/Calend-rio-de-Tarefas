window.onload = function () {
    generateCalendar()
}

function generateCalendar() {
    const calendar = document.getElementById('calendar')

    const currentDate = new Date()
    const month = currentDate.getMonth()
    const year = currentDate.getFullYear()

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)

    const firstDayOfWeek = firstDayOfMonth.getDay()
    const totalDays = lastDayOfMonth.getDate()

    for(let i = 0; i < firstDayOfWeek; i++) {
        let blankDay = document.createElement('div')
        calendar.appendChild(blankDay)
    }

    for (let day = 1; day <= totalDays; day++) {
        let daySquare = document.createElement('div')
        daySquare.className = 'calendar-day'
        daySquare.textContent= day
        daySquare.id = `day-${day}`
        calendar.appendChild(daySquare)
    } 
}

function showAddTaskModal(){
    document.getElementById('addTaskModal').style.display = 'block'
}

function closeAddTaskModal(){
    document.getElementById('addTaskModal').style.display = 'none'
}

function deleteTask(taskElement){
    if(confirm('Você confirma a exclusão desta tarefa?')){
        taskElement.parentNode.removeChild(taskElement)
    }
}

function editTask(taskElement){
    const newTaskDescription = prompt('Digite a nova tarefa:', taskElement.textContent)

    if(newTaskDescription !== null & newTaskDescription.trim() !== ''){
        taskElement.textContent = newTaskDescription
    }
}

function addTask(){
    const taskDate = new Date(document.getElementById('task-date').value)
    const taskDescription = document.getElementById('task-description').value.trim()

    if(taskDescription && !isNaN(taskDate.getDate())){
        const calendarDays = document.getElementById('calendar').children
        
        for(let i = 0; i < calendarDays.length; i++){
            const day = calendarDays[i]

            if(parseInt(day.textContent) === taskDate.getDate()){
                const taskElement = document.createElement('div')
                taskElement.className = 'task'
                taskElement.textContent = taskDescription

                taskElement.addEventListener('contextmenu', (ev) => {
                    ev.preventDefault()
                    deleteTask(taskElement)
                })

                taskElement.addEventListener('click', (ev) => {
                    editTask(taskElement)
                })

                day.appendChild(taskElement)
                break
            }
        }

        closeAddTaskModal()
    }else{
        alert('Por favor, preencha todos os campos corretamente.')
    }
}