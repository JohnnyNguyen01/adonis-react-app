import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Firebase from "../../../firebase";
import { Avatar, Button, Typography } from "@material-ui/core";
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


    const renderedUsers = userList.map((user) => {
        return (
            <TableRow key={user.email}>
                <TableCell component="th" scope="row">
                    <div className={classes.inline}>
                        <Avatar alt={user.username} src={user.image_url} />
                        <Typography>{user.username}</Typography>
                    </div>
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
            </TableRow>
        );
    });


    return (
        <div>
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
            <div className={classes.floatRight}>
                <Button
                    variant="contained"
                    className={classes.addButton}>
                    Add User
                </Button>
                <Button
                    variant="contained"
                    className={classes.removeButton}>
                    Remove User
                </Button>
            </div>
        </div>
    );
}