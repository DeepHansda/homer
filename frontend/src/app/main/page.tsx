"use client";
import React, { useEffect } from "react";

import Chat from "@/componets/chat";
import { AppContext } from "@/componets/mainLayout";
import { Suspense, useContext } from "react";
import Loading from "../loading";
import Designations from "@/componets/designations";
import { Button } from "@nextui-org/react";
export default function Main() {
  const { designations, messages, getAllDesignations, assignDesignation } =
    useContext(AppContext);

  useEffect(() => {
    getAllDesignations();
  }, []);
  return (
    <main className="px-8">
      {/* <Loading/> */}

      <div className="my-6">
        {designations.length > 0 && (
          <div className=" flex gap-x-4">
            {designations?.map((designation) => (
              <Button
                key={designation.designation}
                size="sm"
                radius="sm"
                variant="shadow"
                color="secondary"
                className="uppercase"
                onClick={() => {
                  assignDesignation(designation?.designation);
                }}
              >
                {designation?.title}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-y-8">
        {messages.map((message) => (
          <Chat message={message} />
        ))}
        "main"
      </div>
    </main>
  );
}
