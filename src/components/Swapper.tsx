'use client'

import { useState, useEffect } from 'react';
import { useContractWrite, useWaitForTransaction } from 'wagmi';

import { marketPlaceContract, SC1Contract, TK2Contract } from './contracts';
   
function Swap() {
    type contracttype = typeof SC1Contract | typeof TK2Contract;

    const [tokenFrom, setTokenFrom] = useState('ETH');
    const [amountFrom, setAmountFrom] = useState(0);
    const [isSwapped, setIsSwapped] = useState(false);
    const [tokenContract, setTokenContract] = useState<contracttype>(TK2Contract);
    const [swapFunctionName, setSwapFunctionName] = useState<'swapTok2ForTok1' | 'swapTok1ForTok2'>('swapTok2ForTok1');
  
    useEffect(() => {
      if (tokenFrom === 'ETH') {
        setTokenContract(TK2Contract);
        setSwapFunctionName('swapTok2ForTok1');
      } else {
        setTokenContract(SC1Contract);
        setSwapFunctionName('swapTok1ForTok2');
      }
    }, [tokenFrom]);
  
    const { write: writeSwap, data: swapData, isLoading: swapIsLoading, isError: swapIsError } = useContractWrite({
      ...marketPlaceContract,
      functionName: swapFunctionName,
    });
  
    const { data: receiptSwap, isLoading: isPendingSwap, isSuccess: isSuccessSwap } = useWaitForTransaction({ hash: swapData?.hash });
  
    useEffect(() => {
      if (isSuccessSwap) {
        setIsSwapped(true);
      }
    }, [isSuccessSwap]);
  
    const handleSwap = async () => {
      try {
        const amount = BigInt(amountFrom * 10 ** 18);
        await writeSwap({ args: [amount] });
  
      } catch (error) {
        console.error('Error swapping tokens:', error);
      }
    };
  
    return (
      <div>
        <div className='text-center'>
          <input
            type="number"
            step="0.000000000000000001"
            value={amountFrom}
            onChange={(e) => setAmountFrom(Number(e.target.value))}
            className="border border-gray-900 rounded-md"
          />
          <select
            value={tokenFrom}
            onChange={(e) => setTokenFrom(e.target.value)}
            className="border border-gray-900 rounded-md"
          >
            <option value="TK2">TK2</option>
            <option value="SC1">SC1</option>
          </select>
        </div>
        <div className='text-center'>
          <div className='pb-4'>
            <button
              onClick={handleSwap}
              disabled={isSwapped}
              className={`border rounded-md ${isSwapped ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-400 text-white'}`}
            >
              {isPendingSwap ? 'Swapping...' : 'Swap Tokens'}
            </button>
          </div>
          <div className='pb-4'>
            {isSwapped ? 'Swap successful! Please refetch your balance to see the result.' : ''}
          </div>
        </div>
      </div>
    );
  }
export function Swapper() {
    return(
            <Swap/>
        );
}
