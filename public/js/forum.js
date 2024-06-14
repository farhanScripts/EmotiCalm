const socket = io();

const topicsContainer = document.getElementById('topics');
const postTopicButton = document.getElementById('postTopic');

postTopicButton.addEventListener('click', async () => {
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  const response = await fetch('/api/forum', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });
  const topic = await response.json();

  socket.emit('new forum', topic);
  addTopicToDOM(topic);
});

socket.on('new forum', (topic) => {
  addTopicToDOM(topic);
});

async function fetchTopics() {
  const response = await fetch('/api/forum');
  const topics = await response.json();
  topics.forEach(addTopicToDOM);
}

function addTopicToDOM(topic) {
  const div = document.createElement('div');
  div.classList.add('topic');
  div.innerHTML = `
    <h3>${topic.title}</h3>
    <p>${topic.content}</p>
    <p><strong>${topic.author}</strong></p>
    <div>
      <textarea placeholder="Reply..." class="border border-1"></textarea>
      <button onclick="postReply('${topic._id}', this)">Post Reply</button>
    </div>
    <div class="replies">
      ${topic.replies
        .map(
          (reply) => `<p><strong>${reply.author}:</strong> ${reply.content}</p>`
        )
        .join('')}
    </div>
  `;
  topicsContainer.appendChild(div);
}

async function postReply(topicId, button) {
  const textarea = button.previousElementSibling.previousElementSibling;
  const authorInput = button.previousElementSibling;
  const content = textarea.value;

  const response = await fetch(`/api/forum/${topicId}/replies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });
  const topic = await response.json();

  socket.emit('new reply', topic);
  textarea.value = '';
  authorInput.value = '';
}

socket.on('new reply', (topic) => {
  // Update the topic's replies in the DOM
  const topicDiv = Array.from(document.getElementsByClassName('topic')).find(
    (div) => div.querySelector('h3').innerText === topic.title
  );

  const repliesDiv = topicDiv.querySelector('.replies');
  repliesDiv.innerHTML = topic.replies
    .map((reply) => `<p><strong>${reply.author}:</strong> ${reply.content}</p>`)
    .join('');
});

// Initial fetch of topics
fetchTopics();
