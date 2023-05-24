import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    container: {
        borderRadius: 16,
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.15)",
        padding: 16,
        margin: "32px auto",
        maxWidth: 800,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 16,
    },
    headerCell: {
        fontWeight: "bold",
        color: "#444",
        borderBottom: "none",
    },
    cell: {
        borderBottom: "none",
    },
});

const RootsTable = ({ data,user }) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper} className={classes.container}>
        <h2 className={classes.title}>Roots Table</h2>
        <Table className={classes.table} aria-label="roots table">
            <TableHead>
            <TableRow>
                <TableCell className={classes.headerCell}>Name</TableCell>
                <TableCell className={classes.headerCell}>Relation</TableCell>
                <TableCell className={classes.headerCell}>Money Earned from this user</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data && data.map((row) => (
                <TableRow key={row.name}>
                <TableCell className={classes.cell} component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell className={classes.cell}>{row.parentId != user.result.email ? "grandchildren" : "children"}</TableCell>
                <TableCell className={classes.cell}>85</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
};

export default RootsTable;
