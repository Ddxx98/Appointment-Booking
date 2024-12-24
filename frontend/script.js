const slotsContainer = document.getElementById('slots');
const appointmentsContainer = document.getElementById('appointments');
const modal = document.getElementById('modal');
const slotIndexInput = document.getElementById('slotIndex');

async function fetchSlots() {
  return await axios.get('http://localhost:3000/slots')
    .then(response => response.data)
    .catch(err => {
      console.error('Error fetching slots:', err);
      return [];
    });
}

async function fetchAppointments() {
  return await axios.get('http://localhost:3000/appointments')
    .then(response => response.data)
    .catch(err => {
      console.error('Error fetching appointments:', err);
      return [];
    });
}

function updateSlots(slots) {
  slotsContainer.innerHTML = '';

  if (slots.length === 0) {
    slotsContainer.innerHTML = '<p>No slots available.</p>';
    return;
  }

  slots.forEach((slot) => {
    if (slot.count > 0) {
      const slotDiv = document.createElement('div');
      slotDiv.className = 'slot';
      slotDiv.innerHTML = `
        <strong>${slot.time}</strong><br>
        <span class="slot-count">Available: ${slot.count}</span>
      `;
      slotDiv.onclick = () => openModal(slot.id);
      slotsContainer.appendChild(slotDiv);
    }
  });
}

async function updateAppointments() {
  await fetchAppointments()
    .then(appointments => {
      appointmentsContainer.innerHTML = '';

      if (appointments.length === 0) {
        appointmentsContainer.innerHTML = '<p>No appointments booked yet.</p>';
        return;
      }

      appointments.forEach((appointment) => {
        const appointmentDiv = document.createElement('div');
        appointmentDiv.className = 'appointment-card';
        appointmentDiv.innerHTML = `
          <strong>Name:</strong> ${appointment.name}<br>
          <strong>Email:</strong> ${appointment.email}<br>
          <strong>Slot:</strong> ${appointment.time}<br>
          <button class="delete-button" onclick="deleteAppointment(${appointment.id}, ${appointment.slotId})">Delete</button>
        `;
        appointmentsContainer.appendChild(appointmentDiv);
      });
    })
    .catch(err => console.error('Error displaying appointments:', err));
}

function openModal(slotId) {
  slotIndexInput.value = slotId;
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

async function updateSlotCount(slotId, newCount) {
  return await axios.put(`http://localhost:3000/slots/${slotId}`, { count: newCount })
    .then(response => {
      console.log('Slot count updated successfully:', response.data);
    })
    .catch(err => {
      console.error('Error updating slot count:', err);
    });
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const slotId = parseInt(document.getElementById('slotIndex').value);

  fetchSlots()
    .then(async slots => {
      const selectedSlot = slots.find((slot) => slot.id === slotId);

      if (!selectedSlot) {
        alert('Selected slot not found.');
        return;
      }

      await axios.post('http://localhost:3000/appointments', {
        name,
        email,
        slotId,
        time: selectedSlot.time,
      })
        .then(() => {
          const newCount = selectedSlot.count - 1;
          updateSlotCount(slotId, newCount); 
          
          selectedSlot.count = newCount; 
          updateSlots(slots);  
          updateAppointments(); 
          
          closeModal();
          document.getElementById('bookingForm').reset();
        })
        .catch(err => {
          alert(err.response?.data?.message || 'An error occurred.');
        });
    });
}

async function deleteAppointment(appointmentId, slotId) {
  await axios.delete(`http://localhost:3000/appointments/${appointmentId}`)
    .then(() => {
      fetchSlots()
        .then(slots => {
          const slot = slots.find((slot) => slot.id === slotId);
          const newCount = slot.count + 1;
          updateSlotCount(slotId, newCount); 

          slot.count = newCount;
          updateSlots(slots); 
          updateAppointments(); 
        });
    })
    .catch(err => {
      alert(err.response?.data?.message || 'An error occurred.');
    });
}

window.addEventListener("DOMContentLoaded", function () {
  fetchSlots().then(slots => updateSlots(slots));
  updateAppointments();
});