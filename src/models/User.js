// class User{
//     constructor(username, email){
//         this.username = username;
//         this.email = email;
//     }

//      getUsername = () => this.username;
//      getEmail = () => this.email;
// }

// export default new User();
import React from "react";

const User = ({ name, email }) => {
    //personal note: OOP in JS is fucking stupid, like why even pretend to be OOP
    return (
        <div>
            <p>{name}</p>
            <p>{email}</p>
        </div>);
}

export default User;