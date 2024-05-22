"use client";
import React from 'react'

import Chat from "@/componets/chat";
import { AppContext } from "@/componets/mainLayout";
import { Suspense, useContext } from "react";
import Loading from "../loading";
import Designations from "@/componets/designations";
export default function Main() {
    const { designations, messages, getAllDesignations, assignDesignation } =
    useContext(AppContext);

  return (
    <main className="px-8">
    {/* <Loading/> */}
    {/* <Suspense fallback={<Loading />}>
      <Designations/>
    </Suspense> */}

    <div className="flex flex-col gap-y-8">
      {messages.map((message) => (
        <Chat message={message} />
      ))}
    </div>
    <Loading />
  </main>
  )
}

