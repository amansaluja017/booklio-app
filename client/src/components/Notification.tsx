
function Notification({text}: {text?: string}) {
  return (
    <div className='w-full'>
        <div className='bg-blue-500 opacity-80 flex items-center justify-center gap-5'>
            <p className='text-center text-white py-2 font-bold'>{text}</p>
        </div>
    </div>
  )
}

export default Notification;