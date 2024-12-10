import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import GameEngine from "./_components/game-engine";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-10 text-3xl">Attention Span</h1>
      <GameEngine />
    </div>
  );
}
