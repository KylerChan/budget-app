# Simple Budgeting 💰

A modern, responsive budget tracking application built with HTML, CSS (Tailwind), and JavaScript. Track your expenses, manage your budget, and visualize your spending with an intuitive interface.

## Features

### 💵 Budget Management
- Set your total available money
- Real-time calculation of remaining balance
- Visual indicators (green/red) for budget status
- Persistent storage using localStorage

### 📊 Spending Tracking
- Add new spending entries with description, amount, and date
- Color-coded spending cards for easy identification
- Click to delete spending entries
- Right-click to edit existing entries
- "Free" option for zero-cost items

### 🔧 Advanced Features
- **Sorting Options**: Sort by date, name, or amount
- **Bulk Actions**: Delete all spendings at once
- **Reset Function**: Reset total money to zero
- **Data Persistence**: All data saved locally in browser
- **Responsive Design**: Works on desktop and mobile devices

### 🎨 User Interface
- Clean, modern design with Tailwind CSS
- Gradient background and smooth transitions
- Modal dialogs for adding/editing entries
- Font Awesome icons for enhanced UX
- Hover effects and visual feedback

## Getting Started

### Prerequisites
- A modern web browser
- No additional installations required

### Installation
1. Clone or download the project files
2. Ensure you have the following files:
   - `index.html`
   - `script.js`
3. Open `index.html` in your web browser

(or you can just access it here[https://simple-budgeting.vercel.app/]

### Usage

1. **Set Your Budget**:
   - Enter your total available money in the input field
   - Click "Submit" to set your budget

2. **Add Spending**:
   - Click "Add New Spending" card
   - Fill in description, amount, and date
   - Check "Free" for zero-cost items
   - Click "Save" to add the entry

3. **Manage Entries**:
   - **Delete**: Left-click on any spending card
   - **Edit**: Right-click on any spending card
   - **Sort**: Use the sorting buttons (Date, Name, Amount)
   - **Reset**: Use "Delete All Spendings" or "Reset Money"

## File Structure

```
budget-app/
├── index.html          # Main HTML file
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## Technologies Used

- **HTML5**: Semantic markup and structure
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icon library (via CDN)
- **localStorage**: Client-side data persistence

## Key Components

### HTML Structure
- Responsive layout with Tailwind CSS classes
- Modal dialogs for user interactions
- Form validation and accessibility features

### JavaScript Functionality
- **Data Management**: localStorage for persistence
- **Event Handling**: Form submissions, clicks, context menus
- **Dynamic Content**: Card creation and manipulation
- **Calculations**: Real-time budget calculations
- **Sorting**: Multiple sorting algorithms

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

*Note: Requires JavaScript enabled and localStorage support*

## Features in Detail

### Color System
Spending cards are automatically assigned colors from a predefined palette:
- Blue, Green, Red, Purple, Indigo
- Colors cycle through for visual variety

### Data Persistence
- Total money amount saved in localStorage
- Individual spending cards stored with unique IDs
- Data persists between browser sessions

### Responsive Design
- Mobile-first approach
- Grid layout adapts to screen size
- Touch-friendly interface

## Contributing

Feel free to fork this project and submit pull requests for improvements:
- Bug fixes
- New features
- UI/UX enhancements
- Performance optimizations

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues or have questions:
1. Check browser console for error messages
2. Ensure JavaScript is enabled
3. Try clearing localStorage if data appears corrupted
4. Refresh the page to reset the application state

---

**Happy budgeting! 💰**
        
