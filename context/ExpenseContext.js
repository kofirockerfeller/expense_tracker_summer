import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpenseContext = createContext();

const initialState = {
  expenses: [],
  categories: [
    { id: '1', name: 'Food', color: '#FF6B6B', icon: 'restaurant' },
    { id: '2', name: 'Transportation', color: '#4ECDC4', icon: 'car' },
    { id: '3', name: 'Entertainment', color: '#45B7D1', icon: 'game-controller' },
    { id: '4', name: 'Shopping', color: '#96CEB4', icon: 'bag' },
    { id: '5', name: 'Bills', color: '#FFEAA7', icon: 'receipt' },
    { id: '6', name: 'Health', color: '#DDA0DD', icon: 'medical' },
    { id: '7', name: 'Other', color: '#95A5A6', icon: 'ellipsis-horizontal' },
  ],
  loading: false,
};

function expenseReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [action.payload, ...state.expenses] };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload),
      };
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    default:
      return state;
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Load expenses from AsyncStorage on app start
  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const storedExpenses = await AsyncStorage.getItem('expenses');
      if (storedExpenses) {
        dispatch({ type: 'SET_EXPENSES', payload: JSON.parse(storedExpenses) });
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const saveExpenses = async (expenses) => {
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  };

  const addExpense = async (expense) => {
    const newExpense = {
      id: Date.now().toString(),
      ...expense,
      date: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
    const updatedExpenses = [newExpense, ...state.expenses];
    await saveExpenses(updatedExpenses);
  };

  const deleteExpense = async (id) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id });
    const updatedExpenses = state.expenses.filter(expense => expense.id !== id);
    await saveExpenses(updatedExpenses);
  };

  const updateExpense = async (updatedExpense) => {
    dispatch({ type: 'UPDATE_EXPENSE', payload: updatedExpense });
    const updatedExpenses = state.expenses.map(expense =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    await saveExpenses(updatedExpenses);
  };

  const getTotalExpenses = () => {
    return state.expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

  const getExpensesByCategory = () => {
    const categoryTotals = {};
    state.categories.forEach(category => {
      categoryTotals[category.name] = {
        ...category,
        total: 0,
        count: 0,
      };
    });

    state.expenses.forEach(expense => {
      const category = state.categories.find(cat => cat.id === expense.categoryId);
      if (category) {
        categoryTotals[category.name].total += parseFloat(expense.amount);
        categoryTotals[category.name].count += 1;
      }
    });

    return Object.values(categoryTotals);
  };

  const getRecentExpenses = (limit = 5) => {
    return state.expenses.slice(0, limit);
  };

  const value = {
    ...state,
    addExpense,
    deleteExpense,
    updateExpense,
    getTotalExpenses,
    getExpensesByCategory,
    getRecentExpenses,
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
}
