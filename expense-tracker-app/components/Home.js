/**
 * Trackit - Expense Tracker App
 * This app allows users to track their income and expenses, providing a clear overview of their financial status.
 * 
 */
import React, { use, useState } from "react";
import { StyleSheet, ScrollView, Pressable, View, Text, TextInput, FlatList, SectionList, Vibration } from "react-native";
import styles from './styles.jsx';

const Home = ({ navigation }) => {
    const [isExpense, setIsExpense] = useState(false);
    const [total, setTotal] = useState(parseFloat(0));
    const [totalIncome, setTotalIncome] = useState(parseFloat(0));
    const [totalExpense, setTotalExpense] = useState(parseFloat(0));
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState("");
    const [allData, setData] = useState({
        title: "History",
        data: []
    });
    return (
        <ScrollView style={styles.container}>
            <View name="header">
                <Text style={styles.h1}>Trackit</Text>
            </View>
            <View name="body">
                <View name="balance">
                    <Text style={styles.h2}>Your Balance</Text>
                    {total >= 0 ? (
                        <Text style={styles.netAmount}>${total}</Text>
                    ) : (
                        <Text style={styles.netAmount}>-${Math.abs(total)}</Text>
                    )}
                </View>
                <View name="incomeExpense" style={styles.incomeExpense}>
                    <View name="income" style={styles.inc}>
                        <Text style={styles.h3}>Income</Text>
                        <Text style={styles.totalIncomeText}>${totalIncome}</Text>
                    </View>
                    <View name="expense" style={styles.exp}>
                        <Text style={styles.h3}>Expense</Text>
                        <Text style={styles.totalExpenseText}>${totalExpense}</Text>
                    </View>
                </View>
                <View name="addTransaction">
                    <Text style={styles.h2}>Add Transaction</Text>
                    <View name='about'>
                        <Text style={styles.h3}>About</Text>
                        <TextInput
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                            style={styles.input}
                            placeholder="Enter description"
                        />
                    </View>
                    <View name='amount'>
                        <Text style={styles.h3}>Amount</Text>
                        <TextInput
                            value={amount.toString()}
                            onChangeText={(text) => setAmount(parseFloat(text) || 0)}
                            style={styles.input}
                            placeholder="Enter amount"
                            keyboardType="numeric"
                        />

                    </View>
                    <View name='addSubtract' style={styles.buttonsContainer}>
                        <Pressable name="income button" style={styles.incomeButton} onPress={() => {
                            console.log("Income button pressed");
                            setTotal(prevTotal => prevTotal + amount);
                            setTotalIncome(prevTotalIncome => prevTotalIncome + amount);
                            setData(prevData => ({
                                ...prevData,
                                title: "History",
                                data: [{ des: description, amo: amount, isExp: false }, ...allData.data],
                            }));
                            setDescription("");
                            setAmount(0);
                        }}>
                            <Text style={styles.buttonText}>Income</Text>
                        </Pressable>
                        <Pressable name="expense button" style={styles.expenseButton} onPress={() => {
                            setData(prevData => ({
                                ...prevData,
                                title: "History",
                                data: [{ des: description, amo: amount, isExp: true }, ...allData.data],
                            }));
                            setTotal(prevTotal => prevTotal - amount);
                            setTotalExpense(prevTotalExpense => prevTotalExpense + amount);
                            setDescription("");
                            setAmount(0);
                        }}>
                            <Text style={styles.buttonText}>Expense</Text>
                        </Pressable>
                    </View>

                </View>
                <View name="history">
                    <SectionList
                        initialNumToRender={5}
                        sections={[allData]}
                        renderItem={({ item }) => {
                            if (item.des && item.amo !== undefined) {
                                return (
                                    <Pressable onLongPress={() => {
                                        Vibration.vibrate();
                                        setData(prevData => ({
                                            ...prevData,
                                            title: "History",
                                            data: allData.data.filter((_, index) => index !== allData.data.indexOf(item)),
                                        }));
                                    }} style={item.isExp ? styles.historyItemRed : styles.historyItemGreen}>
                                        <Text>{item.des}</Text>
                                        <Text>${item.amo}</Text>
                                    </Pressable>
                                );
                            }
                            return null;
                        }}
                        renderSectionHeader={({ section: { title } }) => (
                            <Text style={styles.h2}>{title}</Text>
                        )}
                        keyExtractor={(item, index) => item.des + index}
                        stickySectionHeadersEnabled={false}
                        scrollEnabled={false}
                    />
                    <View name="view all" style={styles.viewAllContainer}>
                        <Pressable onPress={() => {
                            navigation.navigate("History", {
                                data: allData.data,
                            });
                        }} style={styles.viewAllButton}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </Pressable>
                    </View>
                </View>

            </View>
        </ScrollView>
    );
}

export default Home;