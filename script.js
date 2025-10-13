document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.getElementById("add-new-task-btn");
  const modal = document.getElementById("addTaskModal");
  const displayTask = document.getElementById("display-task-area");
  const inputTime = document.getElementById("input-time");
  const inputDescription = document.getElementById("input-description");
  const closeModalBtn = document.getElementById("closeModal");
  const addTask = document.getElementById("submit-task");
  const numberOfActiveTask = document.getElementById("number-of-active-task");

  let count = 0;
  let tasks = [];
  // Add event listeners once
  addTaskBtn.addEventListener("click", () => {
    addTaskBtn.classList.add("magictime", "puffIn");
    setTimeout(() => addTaskBtn.classList.remove("magictime", "puffIn"), 1000);
    openModal();
  });

  closeModalBtn.addEventListener("click", closeModal);

  addTask.addEventListener("click", () => {
	  const enteredTime = inputTime.value;
	  const enteredDescription = inputDescription.value.trim();
	  count++;

    if (enteredDescription) {
	  tasks.push(enteredDescription,enteredTime,count);
      renderTask(enteredTime, enteredDescription, count);
      inputTime.value = "";
      inputDescription.value = "";
    }

    closeModal();
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
	  <button class = "text-white bg-red-700 cursor-pointer rounded-lg p-3 hover:bg-red-400">Remove Task</button>
    `;

    displayTask.appendChild(taskDiv);
    numberOfActiveTask.textContent = `${number} Active`;
  }
});
