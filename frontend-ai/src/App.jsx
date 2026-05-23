
import "tailwindcss";
import Chat from './component/Chat'
import PdfUploader from './component/PdfUploader'

function App() {

  return (
    <div className="flex h-screen bg-zinc-950 text-white">

      {/* Left Side */}
      <div className="w-[30%] border-r border-zinc-800 bg-zinc-900 p-6">
        <PdfUploader />
      </div>

      {/* Right Side */}
      <div className="w-[70%] p-2">
        <Chat />
      </div>

    </div>
  )
}

export default App
