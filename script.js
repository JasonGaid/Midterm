const scheduleForm = document.getElementById("schedule-form");
const scheduleTable = document.getElementById("schedule-table");
const searchInput = document.getElementById("search");

// Create an empty array to store schedules
let schedules = [];

// Function to add a new schedule
function addSchedule(subject, day, time, room, instructor) {
    schedules.push({ subject, day, time, room, instructor });
}

// Function to display schedules in the table
function displaySchedules() {
    scheduleTable.innerHTML = `
        <tr>
            <th>Subject</th>
            <th>Day</th>
            <th>Time</th>
            <th>Room</th>
            <th>Instructor</th>
            <th>Actions</th>
        </tr>
    `;
    schedules.forEach((schedule, index) => {
        scheduleTable.innerHTML += `
            <tr>
                <td>${schedule.subject}</td>
                <td>${schedule.day}</td>
                <td>${schedule.time}</td>
                <td>${schedule.room}</td>
                <td>${schedule.instructor}</td>
                <td><button onclick="editSchedule(${index})">Edit</button> <button onclick="deleteSchedule(${index})">Delete</button></td>
            </tr>
        `;
    });
}

// Function to edit a schedule
function editSchedule(index) {
    const editedSchedule = schedules[index];
    document.getElementById("subject").value = editedSchedule.subject;
    document.getElementById("day").value = editedSchedule.day;
    document.getElementById("time").value = editedSchedule.time;
    document.getElementById("room").value = editedSchedule.room;
    document.getElementById("instructor").value = editedSchedule.instructor;

    // Remove the schedule from the array
    schedules.splice(index, 1);
    displaySchedules();
}

// Function to delete a schedule
function deleteSchedule(index) {
    schedules.splice(index, 1);
    displaySchedules();
}

// Function to search schedules by day
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredSchedules = schedules.filter(schedule => schedule.day.toLowerCase().includes(searchTerm));
    displaySchedules(filteredSchedules);
    function displaySchedules(filteredSchedules = schedules) {
        scheduleTable.innerHTML = `
            <tr>
                <th>Subject</th>
                <th>Day</th>
                <th>Time</th>
                <th>Room</th>
                <th>Instructor</th>
                <th>Actions</th>
            </tr>
        `;
        filteredSchedules.forEach((schedule, index) => {
            scheduleTable.innerHTML += `
                <tr>
                    <td>${schedule.subject}</td>
                    <td>${schedule.day}</td>
                    <td>${schedule.time}</td>
                    <td>${schedule.room}</td>
                    <td>${schedule.instructor}</td>
                    <td><button onclick="editSchedule(${index})">Edit</button> <button onclick="deleteSchedule(${index})">Delete</button></td>
                </tr>
            `;
        });
    }
    
    
    
});

// Handle form submission
scheduleForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const subject = document.getElementById("subject").value;
    const day = document.getElementById("day").value;
    const time = document.getElementById("time").value;
    const room = document.getElementById("room").value;
    const instructor = document.getElementById("instructor").value;

    if (subject && day && time && room && instructor) {
        addSchedule(subject, day, time, room, instructor);
        displaySchedules();
        scheduleForm.reset();
    }
});

// Initial display of schedules
displaySchedules();

