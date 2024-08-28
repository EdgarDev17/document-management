"use client";

import { DataContainer } from "./data-container";

export function TalkClientWrapper({
  initialData,
  token,
}: {
  initialData: any;
  token: string;
}) {
  return <DataContainer talkData={initialData} token={token} />;
}
