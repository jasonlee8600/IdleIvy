import React from 'react'

export default function LBHeader() {
  return (
    <div className="font-display container h-14 content-center text-center grid grid-cols-11 bg-[#202B64] border-b-[3px] border-white">
    <div className="tile col-span-5">Address</div>
    <div className="tile col-span-5">Rate</div>
    </div>
  )
}
