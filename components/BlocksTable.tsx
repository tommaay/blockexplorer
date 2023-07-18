"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { alchemy } from "@/lib/alchemy";

interface BlocksTableProps {
  blocks: number[];
}

const BlocksTable: FC<BlocksTableProps> = ({ blocks }) => {
  const [blockData, setBlockData] = useState<any[]>([]);

  useEffect(() => {
    async function getBlockData() {
      const blockData = await Promise.all(
        blocks.map(async (block) => {
          const blockData = await alchemy.core.getBlockWithTransactions(block);
          return blockData;
        })
      );
      setBlockData(blockData);
    }

    getBlockData();
  }, [blocks]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Block</TableHead>
          <TableHead>Fee recipient</TableHead>
          <TableHead>Transactions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blockData.map((block) => (
          <TableRow key={block.hash}>
            <TableCell className="font-medium">
              <Link href={`/block/${block.number}`}>{block.number}</Link>
            </TableCell>
            <TableCell>
              <Link href={`/block/${block.number}`}>{block.miner}</Link>
            </TableCell>
            <TableCell>
              <Link href={`/block/${block.number}`}>
                {block.transactions.length}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BlocksTable;
