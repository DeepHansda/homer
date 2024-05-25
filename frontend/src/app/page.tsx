"use client";

import animation from "@/lib/animation.json";
import { Card, CardBody } from "@nextui-org/react";
import Lottie from "lottie-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // const { designations, messages, getAllDesignations, assignDesignation } =
  //   useContext(AppContext);
  const router = useRouter();
  const initializeApp = () => {
    fetch("/api/setup", { method: "GET" })
      .then(async (res) => {
        const mainRes = await res.json();
        console.log(mainRes);
        if (mainRes.status === "ok") {
          router.replace("/main");
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  useEffect(() => {
    initializeApp();
  }, []);

  return (
    <main className="px-8">
      <div className="h-fit">
        <Lottie
          animationData={animation}
          loop={true}
          className="h-[450px] m-0 p-0"
        />
      </div>
      <Card isHoverable>
        <CardBody>
          <div className="text-center">
            <h1 className="font-inherite text-xl">Server Setup in Progress.</h1>
            <p className="font-inherite text-base text-wrap mt-2">
              Please Wait........ ( Currently Setting Up Server and Downloading
              AI Models. ){" "}
            </p>
          </div>
        </CardBody>
      </Card>
    </main>
  );
}
