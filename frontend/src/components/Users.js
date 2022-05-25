import React from 'react'


const UserItem = ({item}) => {
    return (
        <tr>
            <td>
                {item.first_name}
            </td>
            <td>
                {item.last_name}
            </td>
            <td>
                {item.role}
            </td>
        </tr>
       )
    }


const UserList = ({users}) => {
    return (
        <table>
            <th>
                First name
            </th>
            <th>
                Last Name
            </th>
            <th>
                Project Role
            </th>
                {users.map((item) => <UserItem item={item} />)}

        </table>
    )
}


export default UserList
