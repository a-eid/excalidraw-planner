import * as React from "react"
import { atomWithStorage, useAtomValue } from "jotai/utils"
import { tw } from "twind"
import { DrawerToggleButton } from "./DrawerToggleButton"

import { collectionsAtom, drawerVisibilityAtom } from "../atoms"
import { useAtom } from "jotai"
import { CollectionList } from "./CollectionList"

export function DrawerWrapper() {
  const showDrawer = useAtomValue(drawerVisibilityAtom)

  return (
    <>
      <div className={tw`h-screen w-96 absolute top-0 left-0 bg-blue-900 bg-opacity-50 z-10 transition-transform ${showDrawer ? "translate-x-0" : "-translate-x-96"}`}>
        <CollectionList />
        <DrawerToggleButton />
      </div>
    </>
  )
}
