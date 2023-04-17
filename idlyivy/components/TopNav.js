import Image from "next/image";
import { useWeb3React } from "@web3-react/core";
import Wallet from '@/components/Wallet'
import Link from "next/link";

function TopInfo({ title, init, reload }) {  
  
  return (

            <div className="flex flex-row md:justify-end justify-between sticky top-0  min-h-[75px] w-full z-20 md:border-l-[0px]">
              <div className="md:hidden flex flex-col pl-4 py-4 justify-between">
                <Link data-testid="return-home" href="/">
                        <h2 data-testid="IdleIvy" className="text-white font-semibold text-2xl">
                            IdleIvy
                        </h2>
                </Link>
                <Link data-testid="return-home" href="/leaderboard">
                        <h2 data-testid="Leaderboard" className="text-white font-semibold text-2xl">
                            Leaderboard
                        </h2>
                </Link>
              </div>
              <div className="px-4 self-center py-1">
                <Wallet {...{ init, reload }}></Wallet>
              </div>
            </div>

            );
        }

export default TopInfo;