import Link from "next/link";

function SideNav({ highlight }) {
    return (
        <div className=" hidden h-screen md:flex w-[250px] md:min-w-[200px] lg:min-w-[250px] z-30 fixed top-0  flex-col items-center gap-2 shadow-2xl bg-gradient-to-b from-[#8226CA] to-[#1F6DC9]">
            <div className="absolute top-[170px] left-[61px] ">
                <img className="h-[313px]" src="../next.svg"></img>
            </div>

            <div className="w-[140px] flex items-center justify-left mt-[30px] mr-[40px]">
                <Link href="/">
                    <div className="flex justify-between w-full poi">
                        <img src="../next.svg"></img>
                    </div>
                </Link>
            </div>
            <div className="flex flex-col gap-[20px] 3xl:gap-[40px] w-full mt-[45px]">
                <div className="flex flex-col">
                    <h2 className={` text-2xl flex gap-[8px] text-white ml-8 `}>
                        <Link href="/yale">
                            {highlight == "Yale" ? (
                                <div className="flex items-center w-[175px] h-[50px] poi bg-[#490970] rounded-lg gap-2 p-2">
                                    <img
                                        src="vercel.svg"
                                        className=" mt-2"
                                    ></img>
                                    <h2 className="text-white font-semibold text-xl">
                                        Idle Yale
                                    </h2>
                                </div>
                            ) : (
                                <div className="flex items-center w-[175px] h-[50px] poi gap-2 p-2">
                                    <img
                                        src="vercel.svg"
                                        className=" mt-2"
                                    ></img>
                                    <h2 className="text-white font-semibold text-xl">
                                        Idle Yale
                                    </h2>
                                </div>
                            )}
                        </Link>
                    </h2>

                    </div>
                </div>

				
                
            </div>

    );
}

export default SideNav;
