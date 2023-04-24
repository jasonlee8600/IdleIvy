
function Pending({ pending }) {  
  
  return (

<>
    {pending ?
        <div className="h-screen z-30 fixed inset-y-[0px] inset-x-0 bg-black  bg-opacity-50  flex justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center gap-[10px] mt-4">
            <div className='flex w-1/2 h-1/2 bg-white items-center justify-center'>
            <p className='text-xl text-black text-center'>Transaction Pending...<br/>
            Please wait for Metamask transaction to complete.<br/>
            Refresh the page if not loaded after 1 minute.</p>
            </div>
        </div>
        </div>
        :
        <></>
        }
    </>
);}

export default Pending;