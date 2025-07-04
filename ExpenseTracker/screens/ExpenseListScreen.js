import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpense } from '../context/ExpenseContext';

export default function ExpenseListScreen() {
  const { expenses, categories, deleteExpense, loading } = useExpense();
  const [selectedFilter, setSelectedFilter] = useState('all');

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleDeleteExpense = (expense) => {
    Alert.alert(
      'Delete Expense',
      `Are you sure you want to delete "${expense.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteExpense(expense.id),
        },
      ]
    );
  };

  const getFilteredExpenses = () => {
    if (selectedFilter === 'all') {
      return expenses;
    }
    return expenses.filter(expense => expense.categoryId === selectedFilter);
  };

  const filteredExpenses = getFilteredExpenses();
  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  const renderExpenseItem = ({ item }) => {
    const category = categories.find(cat => cat.id === item.categoryId);
    
    return (
      <View style={styles.expenseItem}>
        <View style={styles.expenseLeft}>
          <View style={[styles.categoryIcon, { backgroundColor: category?.color || '#95A5A6' }]}>
            <Ionicons name={category?.icon || 'ellipsis-horizontal'} size={24} color="white" />
          </View>
          <View style={styles.expenseDetails}>
            <Text style={styles.expenseTitle}>{item.title}</Text>
            <Text style={styles.expenseCategory}>{category?.name || 'Other'}</Text>
            {item.description ? (
              <Text style={styles.expenseDescription} numberOfLines={1}>
                {item.description}
              </Text>
            ) : null}
            <Text style={styles.expenseDateTime}>
              {formatDate(item.date)} • {formatTime(item.date)}
            </Text>
          </View>
        </View>
        <View style={styles.expenseRight}>
          <Text style={styles.expenseAmount}>-{formatCurrency(item.amount)}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteExpense(item)}
          >
            <Ionicons name="trash-outline" size={18} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderFilterButton = (categoryId, categoryName) => (
    <TouchableOpacity
      key={categoryId}
      style={[
        styles.filterButton,
        selectedFilter === categoryId && styles.activeFilterButton,
      ]}
      onPress={() => setSelectedFilter(categoryId)}
    >
      <Text
        style={[
          styles.filterButtonText,
          selectedFilter === categoryId && styles.activeFilterButtonText,
        ]}
      >
        {categoryName}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading expenses...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>
          {selectedFilter === 'all' ? 'Total Expenses' : `${categories.find(c => c.id === selectedFilter)?.name || ''} Expenses`}
        </Text>
        <Text style={styles.summaryAmount}>{formatCurrency(totalAmount)}</Text>
        <Text style={styles.summaryCount}>
          {filteredExpenses.length} {filteredExpenses.length === 1 ? 'expense' : 'expenses'}
        </Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ id: 'all', name: 'All' }, ...categories]}
          renderItem={({ item }) => renderFilterButton(item.id, item.name)}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.filterList}
        />
      </View>

      {/* Expense List */}
      {filteredExpenses.length > 0 ? (
        <FlatList
          data={filteredExpenses}
          renderItem={renderExpenseItem}
          keyExtractor={(item) => item.id}
          style={styles.expenseList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.expenseListContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="receipt-outline" size={64} color="#ccc" />
          <Text style={styles.emptyText}>No expenses found</Text>
          <Text style={styles.emptySubtext}>
            {selectedFilter === 'all' 
              ? 'Start by adding your first expense' 
              : `No expenses in ${categories.find(c => c.id === selectedFilter)?.name || 'this category'}`
            }
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  summaryCard: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  summaryLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginBottom: 5,
  },
  summaryAmount: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  summaryCount: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  filterList: {
    paddingVertical: 5,
  },
  filterButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeFilterButtonText: {
    color: 'white',
  },
  expenseList: {
    flex: 1,
  },
  expenseListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  expenseItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  expenseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  expenseDetails: {
    flex: 1,
  },
  expenseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  expenseCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  expenseDescription: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  expenseDateTime: {
    fontSize: 12,
    color: '#999',
  },
  expenseRight: {
    alignItems: 'flex-end',
  },
  expenseAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 8,
  },
  deleteButton: {
    padding: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginTop: 15,
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
  },
});
