import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpense } from '../context/ExpenseContext';

export default function HomeScreen({ navigation }) {
  const { getTotalExpenses, getRecentExpenses, getExpensesByCategory, loading, categories } = useExpense();

  const totalExpenses = getTotalExpenses();
  const recentExpenses = getRecentExpenses(3);
  const categoryData = getExpensesByCategory();

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Total Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Expenses</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(totalExpenses)}</Text>
        <Text style={styles.balanceSubtext}>This month</Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Add Expense')}
        >
          <Ionicons name="add-circle" size={24} color="#007AFF" />
          <Text style={styles.actionText}>Add Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Expenses')}
        >
          <Ionicons name="list" size={24} color="#007AFF" />
          <Text style={styles.actionText}>View All</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Expenses */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Expenses</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Expenses')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        {recentExpenses.length > 0 ? (
          recentExpenses.map((expense) => {
            const category = categories.find(cat => cat.id === expense.categoryId);
            return (
              <View key={expense.id} style={styles.expenseItem}>
                <View style={styles.expenseLeft}>
                  <View style={[styles.categoryIcon, { backgroundColor: category?.color || '#95A5A6' }]}>
                    <Ionicons name={category?.icon || 'ellipsis-horizontal'} size={20} color="white" />
                  </View>
                  <View style={styles.expenseDetails}>
                    <Text style={styles.expenseTitle}>{expense.title}</Text>
                    <Text style={styles.expenseCategory}>{category?.name || 'Other'}</Text>
                  </View>
                </View>
                <View style={styles.expenseRight}>
                  <Text style={styles.expenseAmount}>-{formatCurrency(expense.amount)}</Text>
                  <Text style={styles.expenseDate}>{formatDate(expense.date)}</Text>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No expenses yet</Text>
            <Text style={styles.emptySubtext}>Tap "Add Expense" to get started</Text>
          </View>
        )}
      </View>

      {/* Category Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoryGrid}>
          {categoryData.slice(0, 4).map((category) => (
            <View key={category.id} style={styles.categoryCard}>
              <View style={[styles.categoryIconLarge, { backgroundColor: category.color }]}>
                <Ionicons name={category.icon} size={24} color="white" />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
              <Text style={styles.categoryAmount}>{formatCurrency(category.total)}</Text>
              <Text style={styles.categoryCount}>{category.count} expenses</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
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
  balanceCard: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginBottom: 5,
  },
  balanceAmount: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  balanceSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  expenseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
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
  },
  expenseRight: {
    alignItems: 'flex-end',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
    marginBottom: 2,
  },
  expenseDate: {
    fontSize: 12,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIconLarge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
  },
});
