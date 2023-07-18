import { FC } from "react";

import { alchemy, utils } from "@/lib/alchemy";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

interface BlockDetailsPageProps {
  params: {
    block: string;
  };
}

const BlockDetailsPage: FC<BlockDetailsPageProps> = async ({
  params: { block },
}) => {
  const blockData = await alchemy.core.getBlockWithTransactions(
    parseInt(block)
  );
  const transactions = blockData.transactions;

  return (
    <main className="flex flex-col items-center min-h-screen px-24 py-12 border">
      <Link href="/" className="mb-10 text-sm text-gray-700">
        Back to home
      </Link>

      <Card>
        <CardHeader className="flex flex-col gap-2">
          <CardTitle>Block #{block}</CardTitle>
          <CardDescription>
            <span className="font-semibold">Hash:</span> {blockData.hash}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Miner:</span> {blockData.miner}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Timestamp:</span>{" "}
            {new Date(blockData.timestamp * 1000).toLocaleString()}
          </CardDescription>
          <CardDescription>
            <span className="font-semibold">Transactions:</span>{" "}
            {blockData.transactions.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {transactions.map((transaction) => (
            <Card key={transaction.hash}>
              <CardHeader className="flex flex-col gap-2">
                <CardTitle>
                  Transaction hash: {transaction.hash.toString()}
                </CardTitle>
                <CardDescription>
                  <span className="font-semibold">From:</span>{" "}
                  {transaction.from}
                </CardDescription>
                <CardDescription>
                  <span className="font-semibold">To:</span> {transaction.to}
                </CardDescription>
                <CardDescription>
                  <span className="font-semibold">Value:</span>{" "}
                  {utils.formatEther(transaction.value)} Ether
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </CardContent>
      </Card>
    </main>
  );
};

export default BlockDetailsPage;
