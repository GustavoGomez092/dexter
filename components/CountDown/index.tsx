
export default function index() {
  return (
    <div className="flex flex-col">
      <p className="text-gray-500 mb-2">Time left:</p>
      <div className="timer flex gap-2 text-[12px] text-center">
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span className="countdown font-mono text-xl">
      <span style={{"--value":1}}></span>
    </span>
    hours
  </div> 
  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span className="countdown font-mono text-xl">
      <span style={{"--value":2}}></span>
    </span>
    min
  </div> 
  <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
    <span className="countdown font-mono text-xl">
      <span style={{"--value":42}}></span>
    </span>
    sec
  </div>
</div>
</div>
  )
}
