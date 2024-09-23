import { createSignal, Show } from 'solid-js'
import { createEvent } from './supabaseClient'
import { SolidMarkdown } from 'solid-markdown'

function App() {
  const [topic, setTopic] = createSignal('')
  const [guide, setGuide] = createSignal('')
  const [loading, setLoading] = createSignal(false)

  const handleGetGuide = async () => {
    if (!topic()) return
    setLoading(true)
    setGuide('')
    try {
      const result = await createEvent('chatgpt_request', {
        prompt: `Please provide a detailed guide on how to earn money online through ${topic()}. Include practical steps and tips.`,
        response_type: 'text'
      })
      setGuide(result)
    } catch (error) {
      console.error('Error fetching guide:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <div class="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md h-full">
        <h1 class="text-3xl font-bold mb-6 text-center">Online Earning Guide</h1>
        <div class="mb-6">
          <input
            type="text"
            value={topic()}
            onInput={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic on online earning"
            class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 box-border"
          />
        </div>
        <div class="mb-6">
          <button
            class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 cursor-pointer"
            onClick={handleGetGuide}
            disabled={loading() || !topic()}
          >
            {loading() ? 'Generating Guide...' : 'Get Guide'}
          </button>
        </div>
        <Show when={guide()}>
          <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 class="text-2xl font-semibold mb-4">Guide:</h2>
            <div class="text-gray-700 prose">
              <SolidMarkdown children={guide()} />
            </div>
          </div>
        </Show>
      </div>
    </div>
  )
}

export default App