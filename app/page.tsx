"use client";

import { useEffect, useState } from "react";
import { alchemy } from "@/lib/alchemy";
import BlocksTable from "@/components/BlocksTable";

export default function Home() {
  const [blockNumber, setBlockNumber] = useState<number | undefined>();
  const [latestBlocks, setLatestBlocks] = useState<any[]>([]);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  useEffect(() => {
    if (!blockNumber) return;
    const blocks = Array.from({ length: 10 }, (_, i) => blockNumber - i);
    setLatestBlocks(blocks);
  }, [blockNumber]);

  return (
    <main className="flex flex-col items-center min-h-screen px-24 py-12 border">
      <h1 className="fixed top-0 left-0 flex justify-center w-full pt-8 pb-6 mb-12 uppercase border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Current block: {blockNumber}
      </h1>

      <div className="w-full min-h-full p-5 border border-gray-200 rounded">
        <h2 className="block mb-10 text-2xl text-center">Latest blocks</h2>
        <BlocksTable blocks={latestBlocks} />
      </div>
    </main>
  );
}
