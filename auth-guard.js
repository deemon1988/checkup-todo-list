(function checkAuth() {
  const TOKEN = localStorage.getItem('token');

  if (!TOKEN) {
    window.location.href = '../auth/auth.html';
  }
})();
