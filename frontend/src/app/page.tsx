"use client";

import Chat from "@/componets/chat";
import { AppContext } from "@/componets/mainLayout";
import { Suspense, useContext } from "react";
import Loading from "./loading";
import Designations from "@/componets/designations";

export default function Home() {
  const { designations, messages, getAllDesignations, assignDesignation } =
    useContext(AppContext);

  return (
    <main className="px-8">
     "hello"
    </main>
  );
}
