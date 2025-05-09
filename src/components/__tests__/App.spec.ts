import { describe, it, expect, vi } from 'vitest'
import { DOMWrapper, mount } from '@vue/test-utils'
import App from '../../App.vue'

describe('App.vue', () => {
  it('renders the table with todos', () => {
    const wrapper = mount(App)
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(3) // Assuming there are 3 todos in the initial state
  })

  it('opens the modal when "Add New Todo" button is clicked', async () => {
    const wrapper = mount(App)
    const addButton = wrapper
      .findAll('button')
      .find((btn) => btn.text() === 'Add New Todo') as DOMWrapper<HTMLButtonElement>
    await addButton.trigger('click')
    expect(wrapper.find('.modal').isVisible()).toBe(true)
  })

  it('adds a new todo when the form is submitted', async () => {
    const wrapper = mount(App)
    const addButton = wrapper
      .findAll('button')
      .find((btn) => btn.text() === 'Add New Todo') as DOMWrapper<HTMLButtonElement>
    await addButton.trigger('click')

    const titleInput = wrapper.find('#title')
    const summaryInput = wrapper.find('#summary')
    const authorInput = wrapper.find('#author')
    await titleInput.setValue('New Todo')
    await summaryInput.setValue('This is a new todo')
    await authorInput.setValue('John Doe')

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(4) // Assuming the new todo is added
  })

  it('shows an alert if required fields are missing', async () => {
    const wrapper = mount(App)

    // Mock the alert function
    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {})

    const addButton = wrapper
      .findAll('button')
      .find((btn) => btn.text() === 'Add New Todo') as DOMWrapper<HTMLButtonElement>
    await addButton.trigger('click')

    const form = wrapper.find('form')
    await form.trigger('submit.prevent')

    // Assert that the alert was called
    expect(alertMock).toHaveBeenCalledWith('Title, Summary, and Author are required fields.')

    // Restore the original alert function
    alertMock.mockRestore()
  })

  it('deletes a todo when the delete button is clicked', async () => {
    const wrapper = mount(App)
    const deleteButton = wrapper.find('#delete')
    await deleteButton.trigger('click')

    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(2) // Assuming one todo is deleted
  })

  it('downloads todos as a JSON file', () => {
    const wrapper = mount(App)
    const downloadButton = wrapper
      .findAll('button')
      .find((btn) => btn.text() === 'Download Todos') as DOMWrapper<HTMLButtonElement>

    if (!downloadButton) {
      throw new Error('Download button not found')
    }

    const mockClick = vi.fn()
    window.URL.createObjectURL = vi.fn(() => 'blob:mock-url')
    vi.spyOn(document, 'createElement').mockImplementation(
      () =>
        ({
          click: mockClick,
          setAttribute: vi.fn(),
        }) as unknown as HTMLElement,
    )

    try {
      downloadButton.trigger('click')
      expect(mockClick).toHaveBeenCalled()
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error during download test: ${error.message}`)
      } else {
        throw new Error('Error during download test: An unknown error occurred')
      }
    }
  })
})
