"use client";

import { useEffect, useState } from "react";
import { alchemy } from "@/lib/alchemy";

export default function Home() {
  const [blockNumber, setBlockNumber] = useState<number | undefined>();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  console.log("ttt", alchemy);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen px-24 py-12">
      <p className="fixed top-0 left-0 flex justify-center w-full pt-8 pb-6 uppercase border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Current block: {blockNumber}
      </p>
    </main>
  );
}
