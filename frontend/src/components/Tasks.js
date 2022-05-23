import React from 'react'


const TaskItem = ({task}) => {
    return (
        <tr>
            <td>
                {task.Project}
            </td>
            <td>
                {task.description}
            </td>
            <td>
                {task.assigned_to}
            </td>
        </tr>
       )
    }


const TaskList = ({tasks}) => {
    return (
        <table>
            <th>
                Project
            </th>
            <th>
                Description
            </th>
            <th>
                Assigned to
            </th>
                {tasks.map((task) => <TaskItem task={task} />)}
        </table>
    )
}


export default TaskList
