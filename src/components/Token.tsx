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
    <div>
      <>
        <div className="flex justify-center items-center">
          <div className="text-center pb-4">
              <thead className='mb-10 mt-10'>
                <tr className="bg-gray-200 text-blue-900">
                  <th className="border border-gray-300">Currency</th>
                  <th className="border border-gray-300">Amount</th>
                  <button onClick={showAddress}>Address</button>
                </tr>
              </thead>
              <tbody>
                <tr className='mt-10 mb-10'>
                  <td className="border border-gray-300 p-2 text-blue-500">SC1</td>
                  <td className="border border-gray-300 p-2 text-blue-500">
                    {Number(stcBalance) * 10 ** -18}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {showSC1Address && (
                      <a href={`https://goerli.etherscan.io/address/${TK2Contract.address}`} target="_blank">
                        {SC1Contract.address}
                      </a>
                    )}
                  </td>
                </tr>
                <tr className='mb-10 mt-10'>
                  <td className=" text-green-500">ETH</td>
                  <td className=" text-green-500">
                    {Number(ethBalance) * 10 ** -18}
                  </td>
                  <td className="border border-gray-300">
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
