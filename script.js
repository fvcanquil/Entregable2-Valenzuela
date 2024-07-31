document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentform');
    const appointmentList = document.getElementById('appointment-list');

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
    });

    function addAppointmentToLocalStorage(appointment) {
        let appointments = getAppointmentsFromLocalStorage();
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }

    function getAppointmentsFromLocalStorage() {
        return localStorage.getItem('appointments') ? JSON.parse(localStorage.getItem('appointments')) : [];
    }

    function renderAppointments() {
        const appointments = getAppointmentsFromLocalStorage();
        appointmentList.innerHTML = '';

        appointments.forEach(appointment => {
            const li = document.createElement('li');
            li.textContent = `${appointment.nombre} - ${appointment.date} a las ${appointment.time} (${appointment.prevision})`;
            appointmentList.appendChild(li);
        });
    }

    renderAppointments();
});


