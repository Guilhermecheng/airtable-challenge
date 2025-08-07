import { Timeline } from "./components/timeline"

function App() {

  return (
    <section className="h-full min-h-screen w-screen bg-white">

      <div className="px-4 py-8 flex flex-col gap-6 items-center">
        <h1 className='text-black font-bold text-xl'>Airtable Timeline</h1>

        <Timeline />
      </div>
    </section>
  )
}

export default App
