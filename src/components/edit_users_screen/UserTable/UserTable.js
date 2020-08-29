import { Avatar, Typography } from "@material-ui/core";
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import Firebase from "../../../firebase";
import useStyles from "./UseStyles";

async function getUserList() {
    var userList = [];
    var listPromise = new Promise(async (resolve, reject) => {
        var data = userList = await Firebase.getUserList();
        resolve(data);
    });
    await listPromise.then((value) => { userList = [...value] });
    return userList;
}


export default function UserTable() {
    const [userList, setUserList] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        const fetchData = async () => {
            var listData = await getUserList();
            setUserList(listData);
        }
        fetchData();
    }, []);


    //I have no idea why this works. It makes no sense.
    var dataList = [];
    const setupData = () => userList.forEach((user) => {
        var userDoc = user.data();
        dataList.push({
            'username': userDoc.username,
            'email': userDoc.email,
            'url': userDoc.image_url,
            'uid' : user.ref.id,
        });
    });
    setupData();


    const columns = [
        { title: "User Photo", field: "url", render: rowData => <Avatar alt={rowData.username} src={rowData.url} /> },
        { title: "Username", field: "username" },
        { title: "email", field: "email" },
        { title: "userID", field:"uid"}];

    const handleUserDelete = async (uid) => {
        Firebase.deleteUserWithUID(uid);
        dataList.forEach( (user, index) => {
            if(user.uid === uid) ;
        });
    }

    return (
        <MaterialTable
            title="Manage Users"
            columns={columns}
            data={dataList} 
            actions={[
                {icon: "delete",
                tooltip: "Delete this user",
                onClick: (event, rowData) => handleUserDelete(rowData.uid)
                }
            ]}/>
    );
}