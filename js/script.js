// Funcionalidad del sitio web
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sitio web cargado correctamente');

    // Smooth scrolling para navegación
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Funcionalidad del formulario
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener datos del formulario
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Validación básica
            if (!data.nombre || !data.email || !data.mensaje) {
                alert('Por favor, completa todos los campos');
                return;
            }

            // Simular envío
            const button = this.querySelector('button');
            const originalText = button.textContent;

            button.textContent = 'Enviando...';
            button.disabled = true;

            setTimeout(() => {
                alert(`Gracias ${data.nombre}, tu mensaje ha sido enviado correctamente`);
                this.reset();
                button.textContent = originalText;
                button.disabled = false;
            }, 2000);

            console.log('Datos del formulario:', data);
        });
    }

    // Animación de entrada para servicios
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const servicios = document.querySelectorAll('.servicio');
    servicios.forEach(servicio => {
        servicio.style.opacity = '0';
        servicio.style.transform = 'translateY(30px)';
        servicio.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(servicio);
    });

    // Estadísticas de visita
    const visitCount = localStorage.getItem('visitCount') || 0;
    localStorage.setItem('visitCount', parseInt(visitCount) + 1);
    console.log(`Visita número: ${parseInt(visitCount) + 1}`);
});

// Función para mostrar hora actual
function mostrarHora() {
    const ahora = new Date();
    console.log(`Hora actual: ${ahora.toLocaleString()}`);
}

// Ejecutar cada minuto
setInterval(mostrarHora, 60000);
mostrarHora(); // Ejecutar inmediatamente
