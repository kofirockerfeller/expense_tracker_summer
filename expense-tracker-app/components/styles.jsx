import { StyleSheet } from "react-native";
import React, { use, useState } from "react";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },

    h1: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
        marginTop: 30,
    },

    h2: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000",
        marginTop: 20,
    },
    h3: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#000",
        marginTop: 10,
    },
    netAmount: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#000",
        marginTop: 5,
    },

    incomeExpense: {
        flexDirection: "row",
        marginTop: 20,
        borderColor: "#000",
        borderWidth: 1,
        backgroundColor: "#666",
        padding: 10,
        borderRadius: 10,
        elevation: 10,
    },
    inc: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        borderRightColor: "#000",
        borderRightWidth: 1,
        backgroundColor: "#f0f0f0",
        width: "50%",
    },
    exp: {
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f0f0f0",
        width: "50%",
    },
    totalIncomeText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'green',


    },
    totalExpenseText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'red'
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    incomeButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
        width: "48%",
        alignItems: "center",
    },

    expenseButton: {
        backgroundColor: "#ff0000",
        padding: 10,
        borderRadius: 5,
        width: "48%",
        alignItems: "center",
    },
    buttonText: {
        color: "#000",
        fontSize: 20,
        fontWeight: "bold",
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        backgroundColor: "#f0f0f0",
    },
    historyItemRed: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        borderRightWidth: 8,
        borderRightColor: "red",
    },
    historyItemGreen: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#f0f0f0",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        borderRightWidth: 8,
        borderRightColor: "green",
    },
    viewAllContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    viewAllButton: {
        backgroundColor: "#ccc",
        padding: 10,
        borderRadius: 5,
        width: "30%",
        alignItems: "center",
        marginTop: 20,
    },
    viewAllText: {
        textDecorationLine: "underline",
        color: "blue",
        fontSize: 12,
        fontWeight: "bold",
    },
});
export default styles;