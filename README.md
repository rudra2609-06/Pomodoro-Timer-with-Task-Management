# 🍅 Pomodoro Timer Application

A simple and elegant Pomodoro Timer web application to help you manage your tasks and stay productive using the Pomodoro Technique.

## Features

- ⏱️ **Customizable Timer**: Set custom time intervals for each task in MM:SS format
- ✅ **Task Management**: Add, view, and remove tasks with ease
- 🎯 **Active Task Tracking**: See how many tasks are currently active
- ⏯️ **Timer Controls**: Start, pause, and restart the timer as needed
- 💾 **Persistent Storage**: Tasks are saved in browser's local storage
- 🎨 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ✨ **Smooth Animations**: Engaging UI with subtle animations

## Technologies Used

- **HTML5**: Structure and semantics
- **CSS3**: Styling with Tailwind CSS via CDN
- **JavaScript (ES6+)**: Application logic and interactivity
- **LocalStorage API**: Data persistence
- **Font Awesome**: Icons
- **Magic CSS**: Animation effects

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required!

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start managing your tasks with the Pomodoro Technique!

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd pomodoro-timer

# Open in browser
open index.html
```

## Usage

### Adding a Task

1. Click the **"Add New Tasks"** button
2. Enter your task description
3. Enter the time in MM:SS format (e.g., 25:00 for 25 minutes)
4. Click **"Add Task"**

### Starting the Timer

1. Add at least one task
2. The most recently added task will be displayed
3. Click the **"Start"** button to begin the timer
4. The timer will count down and alert you when time is up

### Managing Tasks

- **Pause**: Click the pause button to temporarily stop the timer
- **Restart**: Click restart to reset the timer to the original task time
- **Remove**: Click the "Remove Task" button on any task to delete it
- Tasks are automatically saved and will persist even after closing the browser

## File Structure

```
pomodoro-timer/
│
├── index.html          # Main HTML file
├── script.js           # JavaScript logic
└── README.md          # Documentation
```

## How It Works

### Timer Functionality

- Time is entered in MM:SS format
- Converted to seconds for countdown
- Updates display every second
- Alerts when timer reaches zero

### Task Management

- Tasks are stored as objects with description, ID, and time
- Saved to localStorage for persistence
- Automatically loads tasks on page refresh
- Active task count updates in real-time

## Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ IE11 (limited support)

## Customization

### Changing Default Timer

Edit the `resetDisplay()` function in `script.js`:

```javascript
function resetDisplay() {
  if (tasks.length <= 0) {
    showTask.textContent = "Work";
    displayTime.textContent = "25:00"; // Change default time here
    updateCount();
    localStorage.removeItem("Tasks");
  }
}
```

### Styling

The application uses Tailwind CSS. Modify classes in `index.html` to customize the appearance.

## Known Limitations

- Timer runs in the browser tab (closing the tab stops the timer)
- No notification sound when timer completes (only browser alert)
- No Pomodoro cycle tracking (work/break intervals)

## Future Enhancements

- 🔔 Add audio notifications
- 🔄 Implement automatic work/break cycle
- 📊 Add task completion statistics
- 🎨 Theme customization options
- 📱 Progressive Web App (PWA) support
- ⏰ Background timer using Service Workers

## Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Pomodoro Technique® by Francesco Cirillo
- Font Awesome for icons
- Tailwind CSS for styling framework
- Magic CSS for animations

## Support

If you encounter any issues or have questions, please open an issue in the repository.

---

**Happy Productivity! 🍅⏱️**
