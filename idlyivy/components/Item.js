import Link from "next/link";
import Image from "next/image";

function Item({ title, desc, image }) {
    return (




            <div className='flex flex-row ml-[25px]'>
              <Image src={image} width={65} className="rounded-full outline outline-white outline-[4px]"></Image>
              
              <div className='flex flex-row w-full pl-4'>
                
                <div className='flex flex-row z-0 bg-gradient-to-b from-[#272727] to-[#797979] h-[65px] w-5/6 rounded-full outline outline-white outline-[4px]'>
                  
                    <button id="upgrade_buttery" type="button" className="self-start z-10 bg-[#202B64] h-[65px] w-1/4 rounded-full outline outline-white outline-[4px] text-xl text-white">
                        Upgrade
                    </button>
                  
                    <div className='flex flex-col justify-center w-4/5'>
                        <h3 className={`text-2xl text-white text-center`}>{title}</h3>
                        <h4 className={`text-lg text-white text-center`}>{desc}</h4>
                    </div>
                </div>
              </div>
            </div>

            );
        }

export default Item;