// Smooth Scroll (Desplazamiento suave para enlaces internos)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Desplazamiento al formulario con clic en el botón
document.getElementById('scroll-to-form').addEventListener('click', function() {
  const target = document.querySelector('#contact-section');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
});

// Validación del formulario de contacto
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevenir el envío del formulario para validar

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Validación básica
  if (!name || !email || !message) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  // Validar el formato del correo electrónico
  if (!validateEmail(email)) {
    alert('Por favor, ingrese un correo válido.');
    return;
  }

  alert('Formulario enviado correctamente!');
  this.submit(); // Enviar el formulario si todo está bien
});

// Función para validar el formato de un email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Botón "Ir arriba" (Back to Top)
window.addEventListener('DOMContentLoaded', function() {
  const backToTop = document.getElementById('back-to-top');

  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTop.style.display = 'block';
      } else {
        backToTop.style.display = 'none';
      }
    });

    // Desplazarse suavemente hacia arriba al hacer clic en el botón
    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Animaciones al hacer scroll con Intersection Observer
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Dejar de observar una vez que se activa
    }
  });
}, { threshold: 0.1 }); // Activar cuando el 10% del elemento sea visible

reveals.forEach(reveal => {
  revealObserver.observe(reveal);
});

// Animación a la foto al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
  const imgElement = document.querySelector('.animate-on-scroll');
  if (imgElement) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible'); // Quita la clase cuando ya no es visible
        }
      });
    });
    observer.observe(imgElement);
  }
});

// Mensaje de bienvenida basado en la hora del día
window.addEventListener('DOMContentLoaded', function() {
  const hours = new Date().getHours();
  const greetingElement = document.createElement('p');
  const header = document.querySelector('header .container');

  if (header) {
    if (hours < 12) {
      greetingElement.textContent = 'Buenos días, bienvenido a mi sitio web.';
    } else if (hours < 20) {
      greetingElement.textContent = 'Buenas tardes, bienvenido a mi sitio web.';
    } else {
      greetingElement.textContent = 'Buenas noches, bienvenido a mi sitio web.';
    }

    greetingElement.classList.add('lead');
    header.appendChild(greetingElement);
  }
});
     