import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Firebase from "../../../../firebase";
import {Avatar} from "@material-ui/core";


async function getUserList() {
    var userList = [];
    var listPromise = new Promise(async (resolve, reject) => {
        var data = userList = await Firebase.getUserList();
        resolve(data);
    });
    await listPromise.then((value) => { userList = [...value] });
    return userList;
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

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


    const renderedUsers = userList.map((user) => {
        console.log(user);
        return (
            <TableRow key={user.email}>
                <TableCell component="th" scope="row">
                    <Avatar alt={user.username} src={user.image_url}/>
                    {user.username}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
            </TableRow>
        );
    });


    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="right">Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderedUsers}
                </TableBody>
            </Table>
        </TableContainer>
    );
}