"use client";

import { FC, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { alchemy, utils } from "@/lib/alchemy";

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

  console.log({ blockData });

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
            <TableCell className="font-medium">{block.number}</TableCell>
            <TableCell>{block.miner}</TableCell>
            <TableCell>{block.transactions.length}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BlocksTable;
