import React from "react";
import ReactDOM from "react-dom";
import "./globals.css";
import { Button } from "@/components/ui/button";

const Popup: React.FC = () => (
  <div className="w-80 h-80 shadow">
    Hello from React TypeScript Popup!
    <Button>Hello World</Button>
  </div>
);

ReactDOM.render(<Popup />, document.getElementById("root"));
