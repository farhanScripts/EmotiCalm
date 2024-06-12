const moodUser = document.querySelectorAll('#mood-user');
console.dir(moodUser);
document.addEventListener('DOMContentLoaded', () => {
  moodUser.forEach((user) => {
    if (user.innerText == 'Normal') {
      user.classList.add('bg-warning');
    } else if (user.innerText == 'Happy') {
      user.classList.add('bg-success');
    } else {
      user.classList.add('bg-danger');
    }
  });
});

/**
 * TODO :
 * 1. Ambil data mood user dari database
 * 2. Select mood user, ubah background color berdasarkan mood user
 *   2.a Happy = .bg-success-subtle
 *   2.b Netral = .bg-warning-subtle
 *   2.b Sad  = .bg-danger-subtle
 */
