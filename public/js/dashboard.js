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
