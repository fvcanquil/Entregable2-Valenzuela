// Función para agregar una cita al localStorage
function addAppointmentToLocalStorage(appointment) {
    let appointments = getAppointmentsFromLocalStorage();
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

// Función para obtener las citas desde localStorage
function getAppointmentsFromLocalStorage() {
    return localStorage.getItem('appointments') ? JSON.parse(localStorage.getItem('appointments')) : [];
}

// Función para renderizar las citas en el DOM
function renderAppointments() {
    const appointmentList = document.getElementById('appointment-list');
    const appointments = getAppointmentsFromLocalStorage();
    appointmentList.innerHTML = '';

    appointments.forEach(appointment => {
        const li = document.createElement('li');
        li.textContent = `${appointment.nombre} - ${appointment.date} a las ${appointment.time} (${appointment.prevision})`;
        appointmentList.appendChild(li);
    });
}

// Evento que se dispara cuando el documento ha sido completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentform');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const prevision = document.getElementById('prevision').value;

        const appointment = {
            id: Date.now(),
            nombre,
            date,
            time,
            prevision
        };

        addAppointmentToLocalStorage(appointment);
        renderAppointments();
        form.reset();

        // Mostrar la alerta usando SweetAlert2
        Swal.fire({
            icon: 'success',
            title: 'Cita Agendada',
            showConfirmButton: true,
           
        });
    });

    // Renderiza las citas al cargar la página
    renderAppointments();
});
