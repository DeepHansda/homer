"use client";

import React, { createContext, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import AppNavbar from "./appNavbar";
import MicFooter from "./micFooter";
import { callApi } from "@/lib/callApi";
import { usePathname } from "next/navigation";

export const AppContext = createContext({
  getAllDesignations: () => {},
  designations: [],
  getMessages: (blobData: Blob) => {},
  messages: [],
  assignDesignation: (desig: string) => {},
  newMessage: {},
});

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [designations, setDesignations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({});
  const pathname = usePathname();
  console.log(messages);
  const getAllDesignations = async () => {
    const fetchOpt = {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      cache: "no-cache",
    };
    callApi("get_designations", fetchOpt)
      .then(async (res) => {
        const data = await res.json();
        setDesignations(data);
      })
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
    callApi("chat", fetchOptions)
      .then(async (res) => {
        const data = await res.json();
        setNewMessage(data?.message);
        setMessages((prevData) => [...prevData, data]);
      })
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
      .then(async (res) => {
        console.log(res);
        const data = await res.json();
        setNewMessage(data?.message);
        setMessages((prevData) => [...prevData, data]);
      })
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
        newMessage: newMessage,
      }}
    >
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <div className="h-screen relative w-full">
            <AppNavbar />
            <div>{children}</div>
            <div className="fixed bottom-0 w- z-10 w-[1024px]">
              {pathname != "/" && <MicFooter />}
            </div>
          </div>
        </NextThemesProvider>
      </NextUIProvider>
    </AppContext.Provider>
  );
}
