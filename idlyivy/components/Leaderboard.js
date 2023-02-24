import Link from "next/link";

import React from 'react'

export default function Leaderboard({ game }) {

    

    var top10 = fetch('http://localhost:3001/getLB')
      .then(function (response) {
          return response.json();
      }).then(function (data) {
          console.log('GET response:');
          console.log(data); 
          return data.text;
      });

      console.log(top10)

  return (
    <div>{1}</div>
  )
}
