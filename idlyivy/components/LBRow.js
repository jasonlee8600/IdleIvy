import React from 'react'

export default function LBRow({ player,rate }) {
  return (
    <div class="container h-14 content-center text-center grid grid-cols-11">
    <div className="tile col-span-5">{player}</div>
    <div className="tile col-span-5">{rate}</div>
    <div className="tile col-span-1"></div>

    </div>
  )
}
