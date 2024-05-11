import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Spacer,
} from "@nextui-org/react";
import React from "react";

export default function Chat() {
  return (
    <div>
      <Card>
        <CardHeader className="flex-col items-start gap-y-2">
          <div className="flex">
            <div>
              <Avatar
                showFallback
                color="secondary"
                size="sm"
                isBordered
                src="https://images.unsplash.com/broken"
              />
            </div>
            <Spacer x={3.5} />
            <div>
              <p className="font-bold uppercase text-lg font-inherit">User</p>
            </div>
          </div>
          <div className="text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam
            repudiandae porro temporibus possimus itaque maiores!
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex">
            <div>
              <Avatar
                showFallback
                color="secondary"
                size="sm"
                isBordered
                src="https://images.unsplash.com/broken"
              />
            </div>
            <Spacer x={3.5} />
            <div>
              <p className="font-bold uppercase text-lg font-inherit">Assistant</p>
            </div>
          </div>
          <Spacer y={4}/>
          <div className="text-sm">
            In this example: We create a FastAPI instance. We define a list
            items to act as an in-memory database to store items. We create a
            POST endpoint at /items/ using the @app.post decorator. This
            endpoint expects a single JSON object as the request body. When a
            POST request is made to this endpoint, the create_item function is
            invoked. Inside this function, the received JSON object is appended
            to the items list and returned as a response. This implementation
            assumes that you have control over the structure of the incoming
            JSON object and don't need strict validation against a predefined
            model. If you need validation, you can still use Pydantic models to
            define the structure of your JSON object and handle it accordingly.
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
