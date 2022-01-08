import { useAtom } from "jotai"
import * as React from "react"
import { tw } from "twind"
import { collectionsAtom } from "../atoms"
import { CollectionItem } from "./Collection"
import { InputWithButton } from "./InputWithButton"

export function CollectionList() {
  const [value, setValue] = React.useState("")
  const [collections, setCollections] = useAtom(collectionsAtom)

  function handleAddCollection() {
    if (collections.find(collection => collection.name.trim() === value.trim())) {
      alert("Collection already exists")
      return
    }

    setCollections(c => [
      ...c,
      {
        name: value,
        pages: [],
      },
    ])
    setValue("")
  }

  return (
    <>
      <ul className={tw`mx-2`}>
        {collections.map(collection => (
          <CollectionItem key={collection.name} name={collection.name} pages={collection.pages} />
        ))}
      </ul>
      <InputWithButton value={value} title="Add Collection" onChangeText={setValue} onSubmit={handleAddCollection} />
    </>
  )
}
