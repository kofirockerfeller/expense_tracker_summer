# Expense Tracker App

A React Native mobile application built with Expo for tracking personal expenses. This app helps users manage their spending by categorizing expenses and providing visual insights into their financial habits.

## Features

### 🏠 Home Screen
- **Total Expenses Overview**: Displays the total amount spent across all categories
- **Recent Expenses**: Shows the 3 most recent expenses with category icons and details
- **Quick Actions**: Easy access buttons to add new expenses or view all expenses
- **Category Summary**: Visual grid showing spending breakdown by top 4 categories

### ➕ Add Expense Screen
- **Amount Input**: Large, prominent input field for expense amount
- **Title & Description**: Text fields for expense details
- **Category Selection**: Horizontal scrollable category picker with colorful icons
- **Form Validation**: Ensures all required fields are filled before saving
- **Success Feedback**: Confirmation alert when expense is successfully added

### 📋 Expense List Screen
- **Complete Expense History**: Chronological list of all expenses
- **Category Filtering**: Filter expenses by specific categories or view all
- **Detailed Information**: Shows title, category, description, date, and time
- **Delete Functionality**: Swipe or tap to delete expenses with confirmation
- **Summary Statistics**: Total amount and count for filtered expenses

### 📊 Categories Screen
- **Spending Breakdown**: Visual representation of spending by category
- **Progress Bars**: Percentage-based progress indicators for each category
- **Category Statistics**: Total amount and expense count per category
- **Sorted by Spending**: Categories ordered by highest to lowest spending
- **Empty State**: Helpful guidance when no expenses exist

## Technical Features

### 🔧 Architecture
- **Context API**: Centralized state management for expenses and categories
- **AsyncStorage**: Local data persistence across app sessions
- **React Navigation**: Bottom tab navigation with 4 main screens
- **Custom Hooks**: Reusable expense management logic

### 🎨 Design
- **Modern UI**: Clean, iOS-inspired design with consistent styling
- **Color-Coded Categories**: Each expense category has a unique color and icon
- **Responsive Layout**: Optimized for various mobile screen sizes
- **Loading States**: Smooth loading indicators during data operations
- **Empty States**: Helpful messaging when no data is available

### 📱 User Experience
- **Intuitive Navigation**: Bottom tab bar for easy screen switching
- **Form Validation**: Real-time validation with helpful error messages
- **Confirmation Dialogs**: Safety prompts for destructive actions
- **Keyboard Handling**: Proper keyboard avoidance for form inputs

## Categories

The app includes 7 predefined expense categories:

1. **Food** 🍽️ - Restaurant meals, groceries, snacks
2. **Transportation** 🚗 - Gas, public transit, rideshare
3. **Entertainment** 🎮 - Movies, games, subscriptions
4. **Shopping** 🛍️ - Clothing, electronics, general purchases
5. **Bills** 🧾 - Utilities, rent, insurance
6. **Health** 🏥 - Medical expenses, pharmacy, fitness
7. **Other** ⚪ - Miscellaneous expenses

## Installation & Setup

1. **Prerequisites**:
   - Node.js (v18.18 or higher recommended)
   - Expo CLI (`npm install -g @expo/cli`)
   - Expo Go app on your mobile device

2. **Install Dependencies**:
   ```bash
   cd ExpenseTracker
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on Device**:
   - Scan the QR code with Expo Go app (Android)
   - Scan with Camera app (iOS)

## Dependencies

- **React Native**: Core framework
- **Expo**: Development platform and runtime
- **React Navigation**: Navigation library
- **AsyncStorage**: Local data storage
- **Expo Vector Icons**: Icon library

## File Structure

```
ExpenseTracker/
├── App.js                 # Main app component with navigation
├── context/
│   └── ExpenseContext.js  # Global state management
├── screens/
│   ├── HomeScreen.js      # Dashboard with overview
│   ├── AddExpenseScreen.js # Form to add new expenses
│   ├── ExpenseListScreen.js # List of all expenses
│   └── CategoriesScreen.js # Category breakdown view
└── assets/               # App icons and images
```

## Usage Tips

1. **Adding Expenses**: Use the prominent "Add Expense" button or navigate to the Add tab
2. **Viewing History**: Check the Expenses tab for complete transaction history
3. **Category Analysis**: Use the Categories tab to understand spending patterns
4. **Quick Overview**: The Home screen provides a snapshot of recent activity

## Future Enhancements

Potential features for future versions:
- Export data to CSV/PDF
- Monthly/yearly spending reports
- Budget setting and tracking
- Expense search functionality
- Custom categories
- Photo attachments for receipts
- Multi-currency support
- Cloud synchronization

## Development Notes

This app was built as a class project demonstrating:
- React Native mobile development
- State management with Context API
- Local data persistence
- Modern UI/UX design principles
- Component-based architecture

The app follows React Native best practices and uses modern JavaScript features including async/await, destructuring, and arrow functions.
