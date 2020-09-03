import { Avatar } from "@material-ui/core";
import MaterialTable from 'material-table';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState, useContext } from 'react';
import Firebase from "../../../firebase";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import useStyles from "./UseStyles";
import UserProfileScreen from "../../user_profile_screen/UserProfileScreen";
import { CurrentClientContext } from "../../providers/CurrentClientContext";

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
    const history = useHistory()
    const { currentClient, setCurrentClient } = useContext(CurrentClientContext);

    useEffect(() => {
        const fetchData = async () => {
            var listData = await getUserList();
            setUserList(listData);
        }
        fetchData();
    }, []);

    /**
     * Update current user context to this user, then pushes to their profile screen
     * @param {String} userDetails The rowdata values for this row's user
     * includes: username, email, url, uid, userDoc
     */
    const handleViewUserProfileButton = (userDetails) => {
        setCurrentClient(userDetails);
        console.log(currentClient);
        history.push(`/userProfile=${userDetails.uid}`);
    }

    //I have no idea why this works. It makes no sense.
    //This is used to generate the data for each table row
    var dataList = [];
    const setupData = () => userList.forEach((user) => {
        var userDoc = user.data();
        dataList.push({
            'username': userDoc.username,
            'email': userDoc.email,
            'url': userDoc.image_url,
            'uid': user.ref.id,
            'userDoc': userDoc
        });
    });
    setupData();


    const columns = [
        { title: "User Photo", field: "url", render: rowData => <Avatar alt={rowData.username} src={rowData.url} /> },
        { title: "Username", field: "username" },
        { title: "email", field: "email" },
        { title: "userID", field: "uid" }];

    const handleUserDelete = async (uid) => {
        Firebase.deleteUserWithUID(uid);
        dataList.forEach((user, index) => {
            if (user.uid === uid);
        });
    }

    return (
        <MaterialTable
            title="Manage Users"
            columns={columns}
            data={dataList}
            actions={[
                {
                    icon: "delete",
                    tooltip: "Delete this user",
                    onClick: (event, rowData) => handleUserDelete(rowData.uid)
                },
                {
                    icon: AccountBoxIcon,
                    tooltip: "view user profile",
                    onClick: (event, clientData) => { handleViewUserProfileButton(clientData) },
                }
            ]} />
    );
}