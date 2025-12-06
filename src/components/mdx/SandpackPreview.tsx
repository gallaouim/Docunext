"use client";
import { Sandpack } from "@codesandbox/sandpack-react";

export function SandpackPreview() {
  return (
    <div className="my-4">
      <Sandpack
        template="react"
        options={{ showTabs: true, showLineNumbers: true }}
        theme="light"
      />
    </div>
  );
}

