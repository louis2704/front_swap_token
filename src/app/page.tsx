import { ConnectButton } from '../components/ConnectButton'
import { Connected } from '../components/Connected'
import { Token } from '../components/Token'
import { SwapValue } from '../components/SwapValue'
export function Page() {
  return (
    <>
    <div className='bg-blue-900'>
      <h1 className='font-[20px] font-bold text-center'>Td Swap de Louis Stoven</h1>
      <div className="flex justify-center items-center mt-[50px]">
        <div className="display-flex">
          <ConnectButton />
        </div>
        
      </div>
      <Connected>
      <hr />
        <h1 className="text-center font-[7px]">
          Swap ETH / SC1 : 
        </h1>
        <h2 className="text-center font-[5px]">
          données via chainlink oracle
        </h2>
        <Token />
        <br />

        <h2 className="text-center font-[7px]">Swap : </h2>
        <SwapValue/>
        <hr />      </Connected>
        </div>
    </>
  )
}

export default Page
