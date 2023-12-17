import { ConnectButton } from '../components/ConnectButton'
import { Connected } from '../components/Connected'
import { Token } from '../components/Token'
import { SwapValue } from '../components/SwapValue'
import '../../global.css'
import { Swapper } from '../components/Swapper'

export function Page() {
  return (
    <>
    <div className='bg-blue-300 font-family'>
      <h1 className='font-[20px] font-bold text-center'>Td Swap de Louis Stoven</h1>
      <div className="flex justify-center items-center mt-[50px]">
        <div className="display-flex">
          <ConnectButton />
        </div>
        
      </div>
      <Connected>
      <div className="barrehori h-[10px] w-[10px]"/>
        <h1 className="text-center font-family font-[7px]">
          Swap ETH / SC1 : 
        </h1>
        <h2 className="text-center font-family font-[5px]">
          données via chainlink oracle
        </h2>
        <Token />
        <br />
        <h2 className="text-center font-family font-[7px]">Swap : </h2>
        <SwapValue/>
        <h1 className="barrehori h-[10px] w-[10px] pb-30"/>
        <Swapper/>
      </Connected>
        </div>
    </>
  )
}

export default Page
