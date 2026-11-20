// ChaloChale - shared JavaScript for all pages

// ---------- Navbar ----------

// Highlight the nav link matching the current page
(function highlightActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();

// Close the mobile menu after clicking a nav link
document.querySelectorAll('#navbarNav .nav-link').forEach(function (link) {
  link.addEventListener('click', function () {
    const collapse = document.getElementById('navbarNav');
    if (collapse && collapse.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    }
  });
});

// ---------- Forms ----------

function showAlert(message, type) {
  const alertBox = document.createElement('div');
  alertBox.className = 'alert alert-' + type + ' alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
  alertBox.style.zIndex = '9999';
  alertBox.innerHTML = message +
    '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';
  document.body.appendChild(alertBox);
  setTimeout(function () { alertBox.remove(); }, 5000);
}

// Booking form (booking.html)
const bookingForm = document.querySelector('main form');
if (bookingForm && window.location.pathname.includes('booking')) {
  bookingForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      return;
    }
    showAlert('<i class="fa-solid fa-circle-check me-2"></i>Booking request submitted! We will contact you shortly.', 'success');
    bookingForm.reset();
  });
}

// Contact form (contact.html)
const contactForms = document.querySelectorAll('main form');
if (window.location.pathname.includes('contact')) {
  contactForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      showAlert('<i class="fa-solid fa-circle-check me-2"></i>Message sent! We will get back to you soon.', 'success');
      form.reset();
    });
  });
}

// Login form (login.html)
if (window.location.pathname.includes('login')) {
  document.querySelectorAll('main form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      showAlert('<i class="fa-solid fa-circle-check me-2"></i>Login successful! Welcome back.', 'success');
      form.reset();
    });
  });
}

// Signup form (signup.html)
if (window.location.pathname.includes('signup')) {
  document.querySelectorAll('main form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const password = form.querySelector('input[type="password"]');
      const confirm = form.querySelectorAll('input[type="password"]')[1];
      if (password && confirm && password.value !== confirm.value) {
        showAlert('<i class="fa-solid fa-circle-exclamation me-2"></i>Passwords do not match.', 'danger');
        return;
      }
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      showAlert('<i class="fa-solid fa-circle-check me-2"></i>Account created! Please login.', 'success');
      form.reset();
    });
  });
}

// ---------- Dark / Light mode ----------
(function themeToggle() {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme') || 'light';

  root.setAttribute('data-bs-theme', saved);
  updateIcon(saved);

  if (btn) {
    btn.addEventListener('click', function () {
      const next = root.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-bs-theme', next);
      localStorage.setItem('theme', next);
      updateIcon(next);
    });
  }

  function updateIcon(theme) {
    if (!btn) return;
    btn.innerHTML = theme === 'dark'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }
})();

// ---------- Scroll to top button ----------
(function scrollToTop() {
  const btn = document.createElement('button');
  btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  btn.className = 'btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-3 shadow';
  btn.style.width = '45px';
  btn.style.height = '45px';
  btn.style.display = 'none';
  btn.style.zIndex = '999';
  btn.setAttribute('aria-label', 'Scroll to top');
  document.body.appendChild(btn);

  window.addEventListener('scroll', function () {
    btn.style.display = window.scrollY > 400 ? 'block' : 'none';
  });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
