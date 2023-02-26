import Link from "next/link";

function SideNav({ highlight }) {
    return (
        <div className="flex flex-col items-center hidden h-screen md:flex w-[250px] md:min-w-[250px] lg:min-w-[250px] fixed top-0 gap-2 shadow-2xl bg-gradient-to-b from-[#272727] to-[#797979] outline outline-white outline-[5px]">
            <div className="fixed top-[2%]">
                <Link data-testid="return-home" href="/">
                        <h2 data-testid="IdleIvy" className="text-white font-semibold text-[60px]">
                            IdleIvy
                        </h2>
                </Link>
            </div>

            <div className="fixed top-[15%]">
                <img className="mt=[20px]" src="../yalelogo.svg"></img>
            </div>

            <div className="fixed top-[35%]">
                <div className="flex flex-col items-center mt-[20px]">
                    <h2 className={`text-4xl text-white`}>
                        Tokens:
                    </h2>
                    <h3 className={`text-2xl text-white`}>1,000,000</h3>
                </div>

                <div className="flex flex-col items-center mt-[50px]">
                    <h2 className={`text-4xl text-white`}>
                        Rate:
                    </h2>
                    <h3 className={`text-2xl text-white`}>1 tokens/min</h3>
                </div>


                <button id="collect" type="button" className="bg-[#202B64] mt-[50px] px-[35px] py-[10px] rounded-full outline outline-white outline-[7px]">
                    <div className="flex flex-col items-center">
                        <h2 className={`text-4xl text-white`}>
                            Collect:
                        </h2>
                        <h3 className={`text-2xl text-white`}>1,000</h3>
                    </div>
                </button>
            </div>

            <div className="fixed top-[80%]">
                <div className="flex flex-col items-center">
                    <h2 className="text-white font-semibold text-[30px]">
                        Leaderboard
                    </h2>
                </div>

                <div className="flex flex-col items-center mt-[20px]">
                    <Link href="/">
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
