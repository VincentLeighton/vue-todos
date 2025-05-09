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
</script>

<template>
  <header></header>

  <main>
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
          <td>{{ todo.completed ? 'Yes' : 'No' }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
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
</style>
