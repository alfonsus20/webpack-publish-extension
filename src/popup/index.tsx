import React from "react";
import ReactDOM from "react-dom";
import "./globals.css";
import { Button } from "@/components/ui/button";
import { showNotification } from "@/lib/notification";

const Popup: React.FC = () => (
  <div className="w-80 h-80 shadow flex flex-col items-center justify-center">
    <p className="text-lg font-bold mb-4">Hello from React TypeScript Popup!</p>
    <Button
      onClick={() => {
        showNotification({
          title: "Installed",
          message: "Extension Installed",
        });
      }}
    >
      Hello World
    </Button>
  </div>
);

ReactDOM.render(<Popup />, document.getElementById("root"));
