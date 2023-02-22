import Link from "next/link";
import Image from "next/image";

function Item({ title, desc, image }) {
    return (




            <div className='flex flex-row ml-[25px]'>
              {/*<img className="h-[130px] w-[250px] mr-[60px] rounded-full outline outline-white outline-[7px]" src="../buttery.jpeg"></img>*/}
              <Image src={image} width={130} height={100} className="rounded-full outline outline-white outline-[4px]"></Image>
              
              <div className='flex flex-row w-full pl-4'>
                
                <div className='flex flex-row z-0 bg-gradient-to-b from-[#272727] to-[#797979] h-[130px] w-5/6 rounded-full outline outline-white outline-[4px]'>
                  
                    <button id="upgrade_buttery" type="button" className="self-start z-10 bg-[#202B64] h-[130px] w-[250px] rounded-full outline outline-white outline-[4px] text-4xl text-white">
                        Upgrade
                    </button>
                  
                    <div className='flex flex-col text-center'>
                        <h3 className={`text-3xl text-white justify-center mb-[10px]`}>{title}</h3>
                        <h4 className={`text-2xl text-white justify-center`}>{desc}</h4>
                    </div>
                </div>
              </div>
            </div>

            );
        }

export default Item;