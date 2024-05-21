import { Button } from "@nextui-org/react";
import { useContext, useEffect } from "react";
import { AppContext } from "./mainLayout";

function Designations() {
  const { designations, getAllDesignations, assignDesignation } =
    useContext(AppContext);

    useEffect(() => {
        getAllDesignations()
    },[])
  return (
    <div className="my-6 flex gap-x-4">
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
  );
}

export default Designations;
