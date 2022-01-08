import { useAtom } from "jotai"
import { tw } from "twind"

import { drawerVisibilityAtom } from "../atoms"

export function DrawerToggleButton() {
  const [, updateDrawer] = useAtom(drawerVisibilityAtom)

  return (
    <button className={tw`absolute top-8 left-96 w-32 z-20`} onClick={() => updateDrawer(v => !v)}>
      Toggle Drawer
    </button>
  )
}
