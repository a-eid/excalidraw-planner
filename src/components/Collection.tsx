import * as React from "react"
import { useAtom } from "jotai"
import { tw } from "twind"
import { nanoid } from "nanoid"

import { atomFamily, useAtomValue, useUpdateAtom } from "jotai/utils"

import { Collection, collectionsAtom, activeCollectionAtom, activePageAtom, Page, dataAtomFamily } from "../atoms"
import { InputWithButton } from "./InputWithButton"
import { excalidrawRef } from "../utills"
import { NonDeletedExcalidrawElement } from "@excalidraw/excalidraw/types/element/types"

type Props = {}
export function CollectionItem({ name, pages }: Props & Collection) {
  const [openCollectionName, setOpenCollection] = useAtom(activeCollectionAtom)
  const [value, setValue] = React.useState("")
  const updateCollections = useUpdateAtom(collectionsAtom)

  function handleAddPage() {
    setValue("")
    updateCollections(collections => {
      const collectionIndex = collections.findIndex(collection => collection.name === name)

      collections[collectionIndex] = {
        name: collections[collectionIndex].name,
        pages: [
          ...collections[collectionIndex].pages,
          {
            name: value,
            dataId: nanoid(),
          },
        ],
      }

      return [...collections]
    })
  }

  return (
    <div>
      <span className={tw`block px-4 py-2 bg-green-200 mt-4 text-black text-xl`} onClick={() => setOpenCollection(name)}>
        {name}
      </span>
      {name === openCollectionName && (
        <div className={tw`px-4`}>
          {pages.map(page => (
            <PageItem key={page.name} {...page} />
          ))}
          <InputWithButton value={value} title="Add Page" onChangeText={setValue} onSubmit={handleAddPage} />
        </div>
      )}
    </div>
  )
}

function PageItem(page: Page) {
  const [activePageId, setActivePageId] = useAtom(activePageAtom)

  return activePageId !== page.dataId ? (
    <span className={tw`block p-2 bg-blue-500 mt-2 text-white cursor-pointer`} onClick={() => setActivePageId(page.dataId)}>
      {page.name}
    </span>
  ) : (
    <ActivePageItem {...page} />
  )
}

function ActivePageItem(page: Page) {
  const [data, setData] = useAtom(dataAtomFamily(page.dataId))

  React.useEffect(() => {
    if (excalidrawRef.current?.ready) {
      excalidrawRef.current.updateScene({
        elements: data,
      })
    }
  }, [page.dataId])

  return (
    <div className={tw`flex block p-2 bg-green-300 mt-2 cursor-pointer`}>
      <span className={tw`flex-1`}>{page.name}</span>
      <button
        className={tw`px-2 text-black`}
        onClick={() => {
          if (excalidrawRef.current?.ready) {
            const data = excalidrawRef.current.getSceneElements() as NonDeletedExcalidrawElement[]
            setData(data)
          }
        }}
      >
        Save
      </button>

      <button
        className={tw`px-2 text-red-600`}
        onClick={() => {
          alert("todo")
        }}
      >
        Delete
      </button>
    </div>
  )
}
