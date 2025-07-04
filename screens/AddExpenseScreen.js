import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useExpense } from '../context/ExpenseContext';

export default function AddExpenseScreen({ navigation }) {
  const { categories, addExpense } = useExpense();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddExpense = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title for your expense');
      return;
    }

    if (!amount.trim() || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category');
      return;
    }

    setLoading(true);
    try {
      await addExpense({
        title: title.trim(),
        amount: parseFloat(amount).toFixed(2),
        categoryId: selectedCategory.id,
        description: description.trim(),
      });

      Alert.alert('Success', 'Expense added successfully!', [
        {
          text: 'OK',
          onPress: () => {
            setTitle('');
            setAmount('');
            setSelectedCategory(null);
            setDescription('');
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add expense. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Amount Input */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Amount</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0.00"
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Title Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Title</Text>
          <TextInput
            style={styles.textInput}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter expense title"
            placeholderTextColor="#999"
          />
        </View>

        {/* Category Selection */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory?.id === category.id && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <View
                  style={[
                    styles.categoryIcon,
                    { backgroundColor: category.color },
                    selectedCategory?.id === category.id && styles.selectedCategoryIcon,
                  ]}
                >
                  <Ionicons name={category.icon} size={24} color="white" />
                </View>
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory?.id === category.id && styles.selectedCategoryText,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Description Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Description (Optional)</Text>
          <TextInput
            style={[styles.textInput, styles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Add a note about this expense"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Add Button */}
        <TouchableOpacity
          style={[styles.addButton, loading && styles.addButtonDisabled]}
          onPress={handleAddExpense}
          disabled={loading}
        >
          {loading ? (
            <Text style={styles.addButtonText}>Adding...</Text>
          ) : (
            <>
              <Ionicons name="add" size={24} color="white" />
              <Text style={styles.addButtonText}>Add Expense</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  amountSection: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  amountLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007AFF',
    marginRight: 5,
  },
  amountInput: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 100,
    textAlign: 'center',
  },
  inputSection: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f8f9fa',
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  categoryScroll: {
    marginHorizontal: -5,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
    minWidth: 80,
  },
  selectedCategory: {
    backgroundColor: '#e3f2fd',
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedCategoryIcon: {
    transform: [{ scale: 1.1 }],
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 15,
    marginTop: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
