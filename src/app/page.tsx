'use client';

import { useState } from 'react';

interface RestakingStrategy {
  id: string;
  name: string;
  description: string;
  initialStake: string;
  restakedAmount: string;
  stakingRewards: string;
  restakingRewards: string;
  totalYield: string;
  risk: 'low' | 'medium' | 'high';
  totalAPY: number;
}

const strategies: RestakingStrategy[] = [
  {
    id: '1',
    name: 'Simple Restake',
    description: 'Stake ETH → EigenLayer → AVS (no delegation)',
    initialStake: '$10,000',
    restakedAmount: '$9,500',
    stakingRewards: '$380',
    restakingRewards: '$520',
    totalYield: '$900',
    risk: 'low',
    totalAPY: 14.5,
  },
  {
    id: '2',
    name: 'Delegated Restake',
    description: 'Stake ETH → ether.fi → EigenLayer → AVS',
    initialStake: '$10,000',
    restakedAmount: '$9,000',
    stakingRewards: '$360',
    restakingRewards: '$1,080',
    totalYield: '$1,440',
    risk: 'medium',
    totalAPY: 18.8,
  },
  {
    id: '3',
    name: 'Full EigenLayer',
    description: 'Native restaking with AVS delegation',
    initialStake: '$10,000',
    restakedAmount: '$9,800',
    stakingRewards: '$372',
    restakingRewards: '$1,450',
    totalYield: '$1,822',
    risk: 'high',
    totalAPY: 20.2,
  },
  {
    id: '4',
    name: 'Liquid Restake',
    description: 'Use eETH/rlETH for DeFi + EigenLayer',
    initialStake: '$10,000',
    restakedAmount: '$10,000',
    stakingRewards: '$400',
    restakingRewards: '$1,200',
    totalYield: '$1,600',
    risk: 'medium',
    totalAPY: 18.0,
  },
];

const avss = [
  { name: 'EigenDA', tvl: '$420M', utilization: 72, rewards: '8.5%' },
  { name: 'Kiln', tvl: '$180M', utilization: 68, rewards: '7.2%' },
  { name: 'Symbiotic', tvl: '$340M', utilization: 65, rewards: '6.8%' },
  { name: 'Puffer', tvl: '$250M', utilization: 70, rewards: '8.0%' },
  { name: 'Stratum', tvl: '$120M', utilization: 55, rewards: '6.5%' },
];

export default function Home() {
  const [selectedStrategy, setSelectedStrategy] = useState(0);

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="border-b-4 border-green-400 bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black">Liquid Restaking</h1>
          <p className="text-gray-400 mt-2">Restake ETH to earn additional rewards via EigenLayer</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 border-4 border-green-400 p-4 text-center">
            <div className="text-3xl font-black text-green-400">$2.5B</div>
            <div className="text-sm text-gray-400">TVL</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">$1.8B</div>
            <div className="text-sm text-gray-400">AVS TVL</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black text-green-400">12.5%</div>
            <div className="text-sm text-gray-400">Avg APY</div>
          </div>
          <div className="bg-gray-900 border-4 border-gray-700 p-4 text-center">
            <div className="text-3xl font-black">5</div>
            <div className="text-sm text-gray-400">Top AVS</div>
          </div>
        </section>

        {/* Restaking Strategies */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Restaking Strategies</h2>
          <div className="space-y-3">
            {strategies.map((strategy, idx) => (
              <div
                key={strategy.id}
                onClick={() => setSelectedStrategy(idx)}
                className={`p-4 border-4 cursor-pointer transition-all ${
                  selectedStrategy === idx
                    ? 'bg-green-900/30 border-green-400'
                    : 'bg-gray-800 border-gray-600 hover:border-gray-500'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-bold text-green-400 text-lg">{strategy.name}</div>
                    <div className="text-sm text-gray-400 mt-1">{strategy.description}</div>
                    <div className="flex gap-3 mt-2 text-xs">
                      <span className="text-gray-500">Stake: {strategy.initialStake}</span>
                      <span className="text-gray-500">Restake: {strategy.restakedAmount}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-400 text-xl">{strategy.totalAPY}%</div>
                    <div className="text-xs text-gray-500">APY</div>
                    <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-bold ${
                      strategy.risk === 'low' ? 'bg-green-900 text-green-400' :
                      strategy.risk === 'medium' ? 'bg-yellow-900 text-yellow-400' :
                      'bg-red-900 text-red-400'
                    }`}>
                      {strategy.risk}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Selected Strategy Details */}
        {strategies[selectedStrategy] && (
          <section className="bg-gray-900 border-4 border-green-400 p-6">
            <h2 className="text-xl font-black text-green-400 mb-4">{strategies[selectedStrategy].name}</h2>

            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-gray-800 border border-gray-700">
                <div className="text-sm text-gray-400">Initial Stake</div>
                <div className="text-2xl font-bold">{strategies[selectedStrategy].initialStake}</div>
              </div>
              <div className="p-4 bg-gray-800 border border-gray-700">
                <div className="text-sm text-gray-400">Restaked</div>
                <div className="text-2xl font-bold">{strategies[selectedStrategy].restakedAmount}</div>
              </div>
              <div className="p-4 bg-gray-800 border border-gray-700">
                <div className="text-sm text-gray-400">Staking Rewards</div>
                <div className="text-2xl font-bold text-blue-400">{strategies[selectedStrategy].stakingRewards}</div>
              </div>
              <div className="p-4 bg-gray-800 border border-gray-700">
                <div className="text-sm text-gray-400">Restaking Rewards</div>
                <div className="text-2xl font-bold text-green-400">{strategies[selectedStrategy].restakingRewards}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-900/30 border border-green-400">
                <div className="text-sm text-green-400 mb-1">Total Annual Yield</div>
                <div className="text-3xl font-bold">{strategies[selectedStrategy].totalYield}</div>
              </div>
              <div className="p-4 bg-gray-800 border border-gray-700">
                <div className="text-sm text-gray-400 mb-1">Total APY</div>
                <div className="text-3xl font-bold">{strategies[selectedStrategy].totalAPY}%</div>
              </div>
            </div>

            <button className="w-full py-4 bg-green-500 text-white font-bold border-4 border-green-400 hover:bg-green-400 mt-6">
              Restake {strategies[selectedStrategy].restakedAmount}
            </button>
          </section>
        )}

        {/* AVS Opportunities */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">Validated Services (AVS)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                  <th className="text-left py-3">AVS</th>
                  <th className="text-right py-3">TVL</th>
                  <th className="text-right py-3">Utilization</th>
                  <th className="text-right py-3">Rewards</th>
                </tr>
              </thead>
              <tbody>
                {avss.map((avs) => (
                  <tr key={avs.name} className="border-b border-gray-800">
                    <td className="py-3 font-bold text-green-400">{avs.name}</td>
                    <td className="py-3 text-right">{avs.tvl}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 bg-gray-900 border border-gray-600 h-2">
                          <div className="bg-green-400 h-2" style={{ width: `${avs.utilization}%` }} />
                        </div>
                        <span>{avs.utilization}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-right text-green-400">{avs.rewards}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How Liquid Restaking Works */}
        <section className="bg-gray-900 border-4 border-gray-700 p-6">
          <h2 className="text-xl font-black mb-4">How Liquid Restaking Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">1️⃣</div>
              <h3 className="font-bold text-green-400 mb-2">Stake ETH</h3>
              <p className="text-xs text-gray-400">Become a validator or use LSTs</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">2️⃣</div>
              <h3 className="font-bold text-blue-400 mb-2">Restake</h3>
              <p className="text-xs text-gray-400">Deposit to EigenLayer or ether.fi</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">3️⃣</div>
              <h3 className="font-bold text-purple-400 mb-2">Earn Rewards</h3>
              <p className="text-xs text-gray-400">Both staking + AVS rewards</p>
            </div>
            <div className="p-4 bg-gray-800 border-2 border-gray-600 text-center">
              <div className="text-2xl mb-2">4️⃣</div>
              <h3 className="font-bold text-yellow-400 mb-2">Delegated</h3>
              <p className="text-xs text-gray-400">Choose which AVS to secure</p>
            </div>
          </div>
        </section>

        {/* Risk Factors */}
        <section className="bg-gray-900 border-4 border-yellow-400 p-6">
          <h2 className="text-xl font-black text-yellow-400 mb-4">Risk Factors</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800 border border-gray-700">
              <div className="text-2xl mb-2">⚠️</div>
              <h3 className="font-bold text-yellow-400 mb-2">Smart Contract Risk</h3>
              <p className="text-sm text-gray-400">
                Counterparty risk from EigenLayer and AVS smart contracts
              </p>
            </div>
            <div className="p-4 bg-gray-800 border border-gray-700">
              <div className="text-2xl mb-2">🔄</div>
              <h3 className="font-bold text-yellow-400 mb-2">Market Risk</h3>
              <p className="text-sm text-gray-400">
                AVS TVL and rewards can fluctuate based on demand
              </p>
            </div>
            <div className="p-4 bg-gray-800 border border-gray-700">
              <div className="text-2xl mb-2">🏛️</div>
              <h3 className="font-bold text-yellow-400 mb-2">Protocol Risk</h3>
              <p className="text-sm text-gray-400">
                New technology - always DYOR before investing
              </p>
            </div>
          </div>
        </section>

        {/* Real-World Examples */}
        <section className="bg-gray-900 border-4 border-green-400 p-6">
          <h2 className="text-xl font-black text-green-400 mb-4">Popular Protocols</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800 border border-gray-700">
              <div className="font-bold text-green-400 mb-2">EigenLayer</div>
              <p className="text-sm text-gray-400">Native restaking protocol with AVS marketplace</p>
            </div>
            <div className="p-4 bg-gray-800 border border-gray-700">
              <div className="font-bold text-green-400 mb-2">ether.fi</div>
              <p className="text-sm text-gray-400">Liquid staking + restaking with eETH token</p>
            </div>
            <div className="p-4 bg-gray-800 border border-gray-700">
              <div className="font-bold text-green-400 mb-2">Symbiotic</div>
              <p className="text-sm text-gray-400">Open-source restaking middleware</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 text-sm py-8 border-t border-gray-800">
          <p>
            Built by <a href="https://x.com/samdevrel" className="text-green-400 hover:underline">@samdevrel</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
