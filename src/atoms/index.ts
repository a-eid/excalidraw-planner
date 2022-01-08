import { NonDeletedExcalidrawElement } from "@excalidraw/excalidraw/types/element/types"
import { atomWithStorage, atomFamily } from "jotai/utils"
import deepEqual from "fast-deep-equal"

export const activeCollectionAtom = atomWithStorage<string>("__storage-open-collection", "")
export const activePageAtom = atomWithStorage<string>("__storage-open-collection", "")

export const drawerVisibilityAtom = atomWithStorage("__storage_drawer", false)

export const sceneElementsAtom = atomWithStorage<NonDeletedExcalidrawElement[]>("__storage_sceneElements", [])

export const pagesAtomForCollection = (collectionName: string) => atomWithStorage<string[]>(`__storage-collection-${collectionName}-pages`, [])
export const elementsAtomForPage = (collectionName: string, pageName: string) =>
  atomWithStorage<NonDeletedExcalidrawElement[]>(`__storage-collection-${collectionName}-page-${pageName}-elements`, [])

export type Collection = {
  name: string
  pages: Page[]
}

export type Page = {
  name: string
  dataId: string
}

export const collectionsAtom = atomWithStorage<Collection[]>("___storage_collections", [])

export const dataAtomFamily = atomFamily((dataId: string) => atomWithStorage<NonDeletedExcalidrawElement[]>(dataId, []), deepEqual)
