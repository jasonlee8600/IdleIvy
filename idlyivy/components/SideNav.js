import Link from "next/link";

function SideNav({ highlight }) {
    return (
        <div className="flex flex-col items-center hidden h-screen md:flex w-[250px] md:min-w-[250px] lg:min-w-[250px] z-30 fixed top-0  gap-2 shadow-2xl bg-gradient-to-b from-[#272727] to-[#797979]">
            <div className="flex poi gap-2 p-2">
                <Link href="http://localhost:3000/">
                        <h2 className="text-white font-semibold text-[60px]">
                            IdleIvy
                        </h2>
                </Link>
            </div>

            <div>
                <img className="mt=[20px]" src="../yalelogo.svg"></img>
            </div>

            <div>
                <div className="flex flex-col items-center mt-[20px]">
                    <h2 className={`text-4xl text-white`}>
                        Tokens:
                    </h2>
                    <h3 className={`text-2xl text-white`}>1,000,000</h3>
                </div>

                <div className="flex flex-col items-center mt-[40px]">
                    <h2 className={`text-4xl text-white`}>
                        Rate:
                    </h2>
                    <h3 className={`text-2xl text-white`}>1 tokens/min</h3>
                </div>


                <button oid="collect" type="button" className="bg-[#202B64] mt-[40px] px-[35px] py-[10px] rounded-full outline outline-white outline-[6px]">
                    <div className="flex flex-col items-center">
                        <h2 className={`text-4xl text-white`}>
                            Collect:
                        </h2>
                        <h3 className={`text-2xl text-white`}>1,000</h3>
                    </div>
                </button>
            </div>

            <div>
                <div className="flex flex-col items-center">
                    <h2 className="text-white font-semibold text-[30px]">
                        Leaderboard
                    </h2>
                </div>

                <div className="flex flex-col items-center">
                    <Link href="http://localhost:3000/">
                        <h2 className="text-white font-semibold text-[30px]">
                            Home
                        </h2>
                    </Link>
                </div>
            </div>

        </div>

    );
}

export default SideNav;
