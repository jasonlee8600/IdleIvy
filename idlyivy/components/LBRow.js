import React from 'react'

export default function LBRow({ player,rate }) {
  return (
    <div class="font-display container h-12 content-center text-center grid grid-cols-11 border-t-[2px] border-white">
    <div className="tile col-span-5 ">{player}</div>
    <div className="tile col-span-5">{rate}</div>
    <div className="tile col-span-1"></div>

    </div>
  )
}
