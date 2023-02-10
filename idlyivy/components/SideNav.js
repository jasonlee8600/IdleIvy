import Link from "next/link";

function SideNav({ highlight }) {
    return (
        <div className="flex flex-col hidden h-screen md:flex w-[250px] md:min-w-[250px] lg:min-w-[250px] z-30 fixed top-0  flex-col items-center gap-2 shadow-2xl bg-gradient-to-b from-[#393939] to-[#A9A9A9]">
            <div className="flex h-[70px] poi gap-2 p-2">
                <Link href="http://localhost:3000/">
                        <h2 className="text-white font-semibold text-[45px]">
                            IdleIvy
                        </h2>
                </Link>
            </div>

            <div>
                <img className="mt=[20px]" src="../yalelogo.svg"></img>
            </div>

            <div className="flex flex-col items-center">
                <h2 className={`text-2xl text-white`}>
                    Tokens:
                </h2>
                <h3>1,000,000</h3>
            </div>

            <div className="flex flex-col items-center">
                <h2 className={`text-2xl text-white`}>
                    Rate:
                </h2>
                <h3>1 tokens/min</h3>
            </div>


            <div>
                <div className="flex flex-col items-center">
                    <h2 className={`text-2xl text-white`}>
                        Collect:
                    </h2>
                    <h3>1,000</h3>
                </div>
            </div>


            <div>
                <h2 className="text-white font-semibold text-[30px]">
                    Leaderboard
                </h2>
            </div>

            <div>
                <Link href="http://localhost:3000/">
                    <h2 className="text-white font-semibold text-[30px]">
                        Home
                    </h2>
                </Link>
            </div>

        </div>

    );
}

export default SideNav;
