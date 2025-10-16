document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.getElementById("add-new-task-btn");
  const modal = document.getElementById("addTaskModal");
  const displayTask = document.getElementById("display-task-area");
  const inputTime = document.getElementById("input-time");
  const inputDescription = document.getElementById("input-description");
  const closeModalBtn = document.getElementById("closeModal");
  const addTask = document.getElementById("submit-task");
  const numberOfActiveTask = document.getElementById("number-of-active-task");
  const displayTime = document.getElementById("display-time");
  const showTask = document.getElementById("display-task");
  const startTimerBtn = document.getElementById("start-timer");
  const pauseTimerBtn = document.getElementById("pause-timer");
  const restartBtn = document.getElementById("restart-btn");

  let count = 0;
  let tasks = JSON.parse(localStorage.getItem("Tasks")) || [];
  let timer = null;
  let timeLeft = 0;

  addTaskBtn.addEventListener("click", () => {
    addTaskBtn.classList.add("magictime", "puffIn");
    setTimeout(() => addTaskBtn.classList.remove("magictime", "puffIn"), 1000);
    openModal();
  });

  closeModalBtn.addEventListener("click", closeModal);

  addTask.addEventListener("click", () => {
    const enteredTime = inputTime.value.trim();
    const enteredDescription = inputDescription.value.trim();

    // Validate MM:SS format
    const timePattern = /^[0-9]{2}:[0-9]{2}$/; //^ :- start of the string,
    //$ :- end of the string

    if (!enteredDescription) {
      alert("Please enter a task description!");
      return;
    }

    if (!enteredTime || !timePattern.test(enteredTime)) {
      alert("Please enter time in MM:SS format (e.g., 05:30)");
      return;
    }

    count++;
    tasks.push({
      Description: enteredDescription,
      id: count,
      time: enteredTime,
    });
    saveTask();

    inputTime.value = "";
    inputDescription.value = "";

    displaytimeAndDescription();
    renderTask(enteredTime, enteredDescription, count);
    closeModal();
  });

  function displaytimeAndDescription() {
    let lastTask = tasks[tasks.length - 1];
    showTask.textContent = lastTask.Description;
    displayTime.textContent = lastTask.time;
  }

  // Convert MM:SS to total seconds
  function convertTimeToSeconds(timeString) {
    const parts = timeString.split(":");
    const minutes = parseInt(parts[0]) || 0;
    const seconds = parseInt(parts[1]) || 0;
    return minutes * 60 + seconds;
  }

  // Convert seconds back to MM:SS format
  function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60; //remaining seconds
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`; //padStart takes string arguments and returns string with given padding in params.
  }

  startTimerBtn.addEventListener("click", () => {
    if (tasks.length >= 1) {
      startTimer();
    } else {
      alert("Please Add Atleast One Task To Experience Pomodoro Technique");
    }
  });

  function startTimer() {
    // Don't start if already running
    if (timer) {
      alert("Timer is already running!");
      return;
    }

    // Get the displayed time and convert to seconds
    const displayedTime = displayTime.textContent;
    timeLeft = convertTimeToSeconds(displayedTime);

    if (isNaN(timeLeft) || timeLeft <= 0) {
      alert("Please add a task with a valid time first!");
      return;
    }

    timer = setInterval(() => {
      timeLeft--;
      displayTime.textContent = formatTime(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timer);
        timer = null;
        alert("Your Time is over...");
      }
    }, 1000);
  }

  pauseTimerBtn.addEventListener("click", () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  });

  restartBtn.addEventListener("click", () => {
    // Stop any running timer
    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    // Reset to the original task time
    let lastTask = tasks[tasks.length - 1];
    if (lastTask) {
      displayTime.textContent = lastTask.time;
      timeLeft = convertTimeToSeconds(lastTask.time);
    }
  });

  function openModal() {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("overflow-hidden");
  }

  function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.classList.remove("overflow-hidden");
  }

  function renderTask(time, text, number) {
    const taskDiv = document.createElement("div");
    taskDiv.className =
      "flex items-center justify-between py-3 px-4 border rounded-lg mt-2 shadow-sm bg-gray-50 hover:bg-white cursor-pointer transition";

    taskDiv.innerHTML = `
      <h4 class="text-black font-semibold pr-2">${text}</h4>
      <p class="text-gray-600 pl-2"><time datetime="${time}">${time}</time></p>
      <button class="remove-task text-white bg-red-700 cursor-pointer rounded-lg p-3 hover:bg-red-400" data-id="${number}">Remove Task</button>
    `;

    displayTask.appendChild(taskDiv);
    updateCount();

    const removeTaskBtn = taskDiv.querySelector(".remove-task");
    removeTaskBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const taskID = parseInt(e.target.getAttribute("data-id"));
      removeTask(taskID, taskDiv);
    });
  }

  function removeTask(id, taskElement) {
    if (typeof id === undefined || typeof id === null) return;
    tasks = tasks.filter((task) => task.id !== id);
    updateCount();
    console.log(tasks);
    taskElement.remove();
    saveTask();
    if (tasks.length === 0) {
      resetDisplay();
    } else {
      displaytimeAndDescription();
    }
  }

  function updateCount() {
    numberOfActiveTask.textContent = `${tasks.length} Active`;
  }

  function saveTask() {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }

  function resetDisplay() {
    if (tasks.length <= 0) {
      showTask.textContent = "Work";
      displayTime.textContent = "25:00";
      updateCount();
      localStorage.removeItem("Tasks");
    }
  }

  window.addEventListener("load", () => {
    tasks.forEach((task) => renderTask(task.time, task.Description, task.id));
    updateCount();

    if (tasks.length > 0) {
      displaytimeAndDescription();
    } else {
      resetDisplay();
    }
  });
});

