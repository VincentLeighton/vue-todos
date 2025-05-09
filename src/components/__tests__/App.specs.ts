import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../../App.vue'

describe('App.vue', () => {
  it('renders the table with todos', () => {
    const wrapper = mount(App)
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(3) // Assuming there are 3 todos in the initial state
  })

  it('opens the modal when "Add New Todo" button is clicked', async () => {
    const wrapper = mount(App)
    const addButton = wrapper.find('button:contains("Add New Todo")')
    await addButton.trigger('click')
    expect(wrapper.find('.modal').isVisible()).toBe(true)
  })

  it('adds a new todo when the form is submitted', async () => {
    const wrapper = mount(App)
    const addButton = wrapper.find('button:contains("Add New Todo")')
    await addButton.trigger('click')

    const titleInput = wrapper.find('input[v-model="newTodo.title"]')
    const summaryInput = wrapper.find('input[v-model="newTodo.summary"]')
    const authorInput = wrapper.find('input[v-model="newTodo.author"]')

    await titleInput.setValue('New Todo')
    await summaryInput.setValue('This is a new todo')
    await authorInput.setValue('John Doe')

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(4) // Assuming the new todo is added
  })

  it('deletes a todo when the delete button is clicked', async () => {
    const wrapper = mount(App)
    const deleteButton = wrapper.find('tbody tr:first-child button:contains("Delete")')
    await deleteButton.trigger('click')

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(2) // Assuming one todo is deleted
  })

  it('downloads todos as a JSON file', () => {
    const wrapper = mount(App)
    const downloadButton = wrapper.find('button:contains("Download Todos")')
    const mockClick = vi.fn()
    window.URL.createObjectURL = vi.fn(() => 'blob:mock-url')
    vi.spyOn(document, 'createElement').mockImplementation(
      () =>
        ({
          click: mockClick,
          setAttribute: vi.fn(),
        }) as unknown as HTMLElement,
    )

    downloadButton.trigger('click')
    expect(mockClick).toHaveBeenCalled()
  })
})
