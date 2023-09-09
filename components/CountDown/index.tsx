
export default function index() {
  return (
    <div className="flex flex-col dark">
      <p className="text-gray-500 mb-1">Time left:</p>
      <div className="timer flex gap-4 text-[12px] text-center">
      <div className="flex flex-col rounded-box text-text">
    <span className="countdown font-mono text-xl">
      <span>00</span>
    </span>
    hours
  </div> 
  <div className="flex flex-col rounded-box text-text">
    <span className="countdown font-mono text-xl">
      <span>12</span>
    </span>
    min
  </div> 
  <div className="flex flex-col rounded-box text-text">
    <span className="countdown font-mono text-xl">
      <span>55</span>
    </span>
    sec
  </div>
</div>
</div>
  )
}
