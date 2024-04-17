export default function index() {
  return (
    <div className='flex flex-col dark'>
      <p className='mb-1 text-gray-500'>Time left:</p>
      <div className='timer flex gap-4 text-center text-[12px]'>
        <div className='rounded-box flex flex-col text-text'>
          <span className='countdown font-mono text-xl'>
            <span>00</span>
          </span>
          hours
        </div>
        <div className='rounded-box flex flex-col text-text'>
          <span className='countdown font-mono text-xl'>
            <span>12</span>
          </span>
          min
        </div>
        <div className='rounded-box flex flex-col text-text'>
          <span className='countdown font-mono text-xl'>
            <span>55</span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
}
