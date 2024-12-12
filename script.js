// Sample slots data
const slots = [
    { time: "9:00 AM", count: 3 },
    { time: "10:00 AM", count: 2 },
    { time: "11:00 AM", count: 1 },
];

const slotsContainer = document.getElementById('slots');
const appointmentsContainer = document.getElementById('appointments');
const modal = document.getElementById('modal');
const slotIndexInput = document.getElementById('slotIndex');

function updateSlots() {
    slotsContainer.innerHTML = ''; 
    slots.forEach((slot, index) => {
        if (slot.count > 0) { 
            const slotDiv = document.createElement('div');
            slotDiv.className = 'slot';
            slotDiv.innerHTML = `
          <strong>${slot.time}</strong><br>
          <span class="slot-count">Available: ${slot.count}</span>
        `;
            slotDiv.onclick = () => openModal(index);
            slotsContainer.appendChild(slotDiv);
        }
    });
}

function openModal(index) {
    slotIndexInput.value = index;
    modal.style.display = 'flex'; 
}

function closeModal() {
    modal.style.display = 'none'; 
}

function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const slotIndex = document.getElementById('slotIndex').value;

    if (slots[slotIndex].count > 0) {
        slots[slotIndex].count--;

        const appointment = document.createElement('div');
        appointment.className = 'appointment-card';
        appointment.innerHTML = `
        <strong>Name:</strong> ${name}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Slot:</strong> ${slots[slotIndex].time}<br>
        <button class="delete-button" onclick="deleteAppointment(this, ${slotIndex})">Delete</button>
      `;
        appointmentsContainer.appendChild(appointment);

        const noAppointmentsMessage = appointmentsContainer.querySelector('p');
        if (noAppointmentsMessage) {
            noAppointmentsMessage.style.display = 'none';
        }

        updateSlots();

        closeModal();
        document.getElementById('bookingForm').reset();
    } else {
        alert('Selected slot is no longer available.');
    }
}

function deleteAppointment(button, slotIndex) {
    const appointment = button.parentElement;
    appointmentsContainer.removeChild(appointment);

    slots[slotIndex].count++;

    updateSlots();

    const remainingAppointments = appointmentsContainer.querySelectorAll('.appointment-card');
    if (remainingAppointments.length === 0) {
        const noAppointmentsMessage = appointmentsContainer.querySelector('p');
        if (noAppointmentsMessage) {
            noAppointmentsMessage.style.display = 'block';
        }
    }
}

updateSlots();