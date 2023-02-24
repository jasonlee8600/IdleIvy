import React from 'react'
import LBRow from './LBRow'

export default function LBList({ leaders }) {

    console.log(leaders)

    return (
        leaders.map((player,i) =>
        {
            return <LBRow key={i} player={player.nickname} rate={player.rate}></LBRow>
        }))
}
