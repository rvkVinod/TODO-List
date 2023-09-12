const form = document.querySelector('form');
const input = document.querySelector('#new-item');
const list = document.querySelector('#list');

let items = [];

function renderList() {
	list.innerHTML = '';
	items.forEach((item, index) => {
		const li = document.createElement('li');
		const actions = document.createElement('div');
		const deleteButton = document.createElement('button');
		const editButton = document.createElement('button');
		const checkbox = document.createElement('input');

		li.textContent = item.text;

		checkbox.type = 'checkbox';
		checkbox.checked = item.completed;
		checkbox.addEventListener('change', () => {
			items[index].completed = checkbox.checked;
			renderList();
		});

		deleteButton.textContent = 'Delete';
		deleteButton.addEventListener('click', () => {
			items.splice(index, 1);
			renderList();
		});

		editButton.textContent = 'Edit';
		editButton.addEventListener('click', () => {
			const newText = prompt('Enter new text:', item.text);
			if (newText !== null && newText !== '') {
				items[index].text = newText;
				renderList();
			}
		});

		actions.appendChild(checkbox);
		actions.appendChild(editButton);
		actions.appendChild(deleteButton);

		li.appendChild(actions);
		if (item.completed) {
			li.classList.add('completed');
		}
		list.appendChild(li);
	});
}

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const text = input.value.trim();
	if (text !== '') {
		items.push({
			text,
			completed: false,
		});
		renderList();
		input.value = '';
		input.focus();
	}
});

renderList();