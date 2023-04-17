import Link from "next/link";

import React from 'react'
import {useEffect, useState, useRef} from 'react';
import LBHeader from "./LBHeader";
import LBList from "./LBList";



export default function Leaderboard() {
    const [list, setList] = useState([]);
    

    useEffect(()=>{
        fetch('http://localhost:3001/getLB')
          .then(response => response.json())
          .then(setList);
       }, []);

        // console.log("list is " + JSON.stringify(list))

        var top10list = JSON.parse(JSON.stringify(list))
        console.log(top10list)

       return (
                
                
            <div className="flex flex-col w-4/5 h-fit bg-gradient-to-b from-[#272727] to-[#797979] self-center items-center border-[5px] border-white">  
                <LBHeader></LBHeader>
                
                <LBList leaders={top10list}></LBList>
            </div>
       
       );

}
