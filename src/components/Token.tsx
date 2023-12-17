'use client'
import { useState } from 'react';
import { useContractRead, useContractWrite, useWaitForTransaction, useAccount } from 'wagmi';
import { TK2Contract, SC1Contract } from './contracts';

export function Token() {
  return (
    <>
        <Amount />
    </>
  );
}

function Amount() {
  const [showSC1Address, setShowSC1Address] = useState(false);
  const [showTK2Address, setShowTK2Address] = useState(false);

  let { address } = useAccount();
  if (!address) {
    address = "0x00";
  }
  const { data: ethBalance } = useContractRead({
    ...TK2Contract,
    functionName: 'balanceOf',
    args: [address],
  });

  const { data: stcBalance } = useContractRead({
    ...SC1Contract,
    functionName: 'balanceOf',
    args: [address],
  });

  if (address === "0x00") {
    return null;
  }

  const showAddress = () => {
    setShowSC1Address(!showSC1Address);
    setShowTK2Address(!showTK2Address);
  };

  return (
    <div className='font-family'>
      <>
        <div className="flex justify-center items-center">
          <div className="text-center mb-10">
              <thead className='mb-10 mt-10'>
                <tr className="font-[5px]">
                  <th className="border border-gray-900">Currency</th>
                  <th className="border border-gray-900">Amount</th>
                  <button onClick={showAddress}>Address</button>
                </tr>
              </thead>
              <tbody>
                <tr className='mt-10 mb-10'>
                  <td className="border border-gray-900 font-[5px]">SC1</td>
                  <td className="border border-gray-900 font-[5px]">
                    {Number(stcBalance) * 10 ** -18}
                  </td>
                  <td className="border border-gray-900">
                    {showSC1Address && (
                      <a href={`https://goerli.etherscan.io/address/${TK2Contract.address}`} target="_blank">
                        {SC1Contract.address}
                      </a>
                    )}
                  </td>
                </tr>
                <tr className='mb-10 mt-10'>
                  <td className="font-[5px]">ETH</td>
                  <td className="font-[5px]">
                    {Number(ethBalance) * 10 ** -18}
                  </td>
                  <td className="border border-gray-900">
                    {showTK2Address && (
                      <a href={`https://goerli.etherscan.io/address/${TK2Contract.address}`} target="_blank">
                        {TK2Contract.address}
                      </a>
                    )}
                  </td>
                </tr>
              </tbody>
          </div>
        </div>
      </>
    </div>
  );
}
