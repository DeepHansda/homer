"use client";

import React, { createContext, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import AppNavbar from "./appNavbar";
import MicFooter from "./micFooter";
import { callApi } from "@/lib/callApi";

export const AppContext = createContext({
  getAllDesignations: () => {},
  designations: [],
  getMessages: (blobData: Blob) => {},
  messages: [],
  assignDesignation: (desig: string) => {},
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [designations, setDesignations] = useState([]);
  const [messages, setMessages] = useState([]);

  const getAllDesignations = async () => {
    const fetchOpt = {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      cache:"no-cache"
    };
    callApi("/get_designations", fetchOpt)
      .then((data) => setDesignations(data))
      .catch((err) => {
        throw new Error(err);
      });
  };

  const getMessages = async (blobData: Blob) => {
    const formData = new FormData();
    console.log(blobData);
    formData.append("audio", blobData);
    const fetchOptions = {
      method: "POST",
      body: formData,
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      
    };
    callApi("/chat", fetchOptions)
      .then((data) => setMessages((prevData) => [...prevData, data]))
      .catch((err) => {
        throw new Error(err);
      });
  };

  const assignDesignation = async (desig: string) => {
    const fetchOptions = {
      method: "POST",
      body: JSON.stringify({ designation: desig }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    callApi("make_assistant", fetchOptions)
      .then((data) => setMessages((prevData) => [...prevData, data]))
      .catch((err) => {
        throw new Error(err);
      });
  };

  return (
    <AppContext.Provider
      value={{
        getAllDesignations: getAllDesignations,
        designations: designations,
        getMessages: getMessages,
        messages: messages,
        assignDesignation: assignDesignation,
      }}
    >
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <div className="h-screen relative w-full">
            <AppNavbar />
            <div>{children}</div>
            <MicFooter />
          </div>
        </NextThemesProvider>
      </NextUIProvider>
    </AppContext.Provider>
  );
}
