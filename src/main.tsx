import * as React from "react"
import ReactDOM from "react-dom"

import Excalidraw from "@excalidraw/excalidraw"
import { tw } from "twind"

import { excalidrawRef } from "./utills"
import { DrawerWrapper } from "./components"

ReactDOM.render(
  <React.StrictMode>
    <div className={tw`h-screen`}>
      <Excalidraw ref={excalidrawRef} zenModeEnabled gridModeEnabled />
    </div>
    <DrawerWrapper />
  </React.StrictMode>,
  document.getElementById("root"),
)
