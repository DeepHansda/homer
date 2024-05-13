import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Code,
  Divider,
  Spacer,
} from "@nextui-org/react";
import React from "react";
import Markdown from "react-markdown";
import SyntaxHighlighter from 'react-syntax-highlighter';

export default function Chat({ message }: { message: {} }) {
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
          <div className="mt-1">
            <Chip radius="sm">
              <p className="text-xs">{message?.prompts?.content}</p>
            </Chip>
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
              <p className="font-bold uppercase text-lg font-inherit">
                Assistant
              </p>
            </div>
          </div>
          <Spacer y={4} />
          <div className="text-sm">
            <Markdown>
          {message?.message?.content}
            </Markdown>
            {/* <SyntaxHighlighter>
            {message?.message?.content}
            </SyntaxHighlighter> */}
            {/* <Code>{message?.message?.content}</Code> */}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
