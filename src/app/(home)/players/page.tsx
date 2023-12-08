'use client'
import Player, { PlayerProps } from "@/app/components/Player";
import { NextPage } from "next";
import { pb } from "../../lib/pocketbase";
import { usePBAuth } from "@/app/contexts/AuthWrapper";
import { useEffect, useState } from "react";

const Players: NextPage = () => {
  const { isInitialized } = usePBAuth();
  const [playerData, setPlayerData] = useState<PlayerProps[] | null>(null);

  useEffect(() => {
    if (isInitialized) {
      fetchPlayerData();
    }
  }, [isInitialized]);

  const fetchPlayerData = async () => {
    try {
      const records = await pb.collection("players").getFullList({
        sort: "-shirtNumber",
      });

      const playerData: PlayerProps[] = records.map((record: any) => ({
        collectionId: record.collectionId,
        id: record.id,
        fullName: record.fullName,
        shirtName: record.shirtName,
        shirtNumber: record.shirtNumber,
        position: record.position,
        picture: record.picture,
        textField: record.textField,
      }));

      setPlayerData(playerData);
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center">
      {playerData &&
        playerData.map((player, index) => (
          <Player key={index} {...player} />
        ))}
    </div>
  );
};

export default Players;