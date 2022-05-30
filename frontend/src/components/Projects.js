import React from 'react'



const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.owner}
            </td>
        </tr>
       )
    }


const ProjectList = ({projects}) => {
    return (
        <table>
            <th>
                Project Name
            </th>
            <th>
                Owner
            </th>
                {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}


export default ProjectList