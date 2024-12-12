import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import GameEngine from "./_components/game-engine";
import Controls from "./_components/controls/controls";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-10 text-3xl">Attention Span</h1>
      <div className="flex w-full justify-evenly">
        <GameEngine />
        <Controls />
      </div>
    </div>
  );
}
