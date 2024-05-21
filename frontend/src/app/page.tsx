"use client";

import Chat from "@/componets/chat";
import { AppContext } from "@/componets/mainLayout";
import { useContext } from "react";
import Loading from "./loading";

export default function Home() {
  const { designations, messages, getAllDesignations, assignDesignation } =
    useContext(AppContext);

  return (
    <main className="px-8">
      {/* <Loading/> */}
      {/* <Suspense fallback={<Loading />}>
        <Designations />
      </Suspense> */}

      <div className="flex flex-col gap-y-8">
        {messages.map((message) => (
          <Chat message={message} />
        ))}
      </div>
      <Loading />
    </main>
  );
}
