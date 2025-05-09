<script setup lang="ts">
import { ref } from 'vue'

// Updated list of todos with additional fields
const todos = ref([
  {
    id: 1,
    title: 'Buy groceries',
    summary: 'Get essentials for the week',
    author: 'John Doe',
    description: 'Buy milk, eggs, bread, and vegetables.',
    imageUrl: 'https://via.placeholder.com/50',
    category: 'Personal',
    completed: false,
  },
  {
    id: 2,
    title: 'Walk the dog',
    summary: 'Evening walk with Max',
    author: 'Jane Smith',
    description: 'Take Max for a 30-minute walk in the park.',
    imageUrl: 'https://via.placeholder.com/50',
    category: 'Health',
    completed: true,
  },
  {
    id: 3,
    title: 'Finish project',
    summary: 'Complete Vue.js project',
    author: 'John Doe',
    description: 'Finalize the Vue.js project and submit it.',
    imageUrl: 'https://via.placeholder.com/50',
    category: 'Work',
    completed: false,
  },
])

type Todo = {
  id: number | null
  title: string
  summary: string
  author: string
  description: string
  imageUrl: string
  category: string
  completed: boolean
}

// Modal visibility state
const showModal = ref(false)

// New todo object
const newTodo = ref<Todo>({
  id: null,
  title: '',
  summary: '',
  author: '',
  description: '',
  imageUrl: '',
  category: '',
  completed: false,
})

// Function to add a new todo
const addTodo = () => {
  if (newTodo.value.title.trim() && newTodo.value.summary.trim() && newTodo.value.author.trim()) {
    todos.value.push({ ...newTodo.value, id: todos.value.length + 1 }) // Add new todo to the list
    resetNewTodo()
    showModal.value = false
  } else {
    alert('Title, Summary, and Author are required fields.')
  }
}

// Function to reset the new todo form
const resetNewTodo = () => {
  newTodo.value = {
    id: null,
    title: '',
    summary: '',
    author: '',
    description: '',
    imageUrl: '',
    category: '',
    completed: false,
  }
}

// Function to delete a todo
const deleteTodo = (id: number) => {
  todos.value = todos.value.filter((todo) => todo.id !== id)
}

// Function to download todos as a JSON file
const downloadTodos = () => {
  const dataStr = JSON.stringify(todos.value, null, 2) // Convert todos to JSON string
  const blob = new Blob([dataStr], { type: 'application/json' }) // Create a Blob
  const url = URL.createObjectURL(blob) // Create a URL for the Blob
  const link = document.createElement('a') // Create a temporary anchor element
  link.href = url
  link.download = 'todos.json' // Set the file name
  link.click() // Trigger the download
  URL.revokeObjectURL(url) // Clean up the URL object
}
</script>

<template>
  <main>
    <button @click="showModal = true">Add New Todo</button>
    <button @click="downloadTodos">Download Todos</button>
    <!-- Button to download todos -->
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Summary</th>
          <th>Author</th>
          <th>Description</th>
          <th>Image</th>
          <th>Category</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.title }}</td>
          <td>{{ todo.summary }}</td>
          <td>{{ todo.author }}</td>
          <td>{{ todo.description }}</td>
          <td>
            <img :src="todo.imageUrl" alt="Todo image" width="50" height="50" />
          </td>
          <td>{{ todo.category }}</td>
          <td>
            <input type="checkbox" v-model="todo.completed" />
          </td>
          <td>
            <button @click="deleteTodo(todo.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Add New Todo</h2>
        <form @submit.prevent="addTodo">
          <label>
            Title:
            <input v-model="newTodo.title" type="text" required />
          </label>
          <label>
            Summary:
            <input v-model="newTodo.summary" type="text" required />
          </label>
          <label>
            Author:
            <input v-model="newTodo.author" type="text" required />
          </label>
          <label>
            Description:
            <textarea v-model="newTodo.description"></textarea>
          </label>
          <label>
            Image URL:
            <input v-model="newTodo.imageUrl" type="text" />
          </label>
          <label>
            Category:
            <select v-model="newTodo.category">
              <option value="Personal">Personal</option>
              <option value="Health">Health</option>
              <option value="Work">Work</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label>
            Completed:
            <input v-model="newTodo.completed" type="checkbox" />
          </label>
          <div class="modal-actions">
            <button type="submit">Add</button>
            <button type="button" @click="showModal = false">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
#app {
  grid-template-columns: auto 1fr auto !important;
  grid-template-rows: 1fr 1fr !important;
  display: grid;
  height: 100vh;
}
main {
  display: flex;
  justify-content: center; /* Horizontally center the table */
  align-items: center; /* Vertically center the table */
  height: 100%; /* Ensure the main element takes full height */
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
  color: black;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

button[type='button'] {
  background-color: #ff4d4d;
}

button[type='button']:hover {
  background-color: #ff1a1a;
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: gray;
  color: #f4f4f4;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.modal-actions {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
