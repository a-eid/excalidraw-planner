import { tw } from "twind"

type Props = {
  value: string
  onChangeText(text: string): void
  onSubmit(): void
  title?: string
}

export function InputWithButton({ value, onChangeText, onSubmit, title = "Add" }: Props) {
  return (
    <div className={tw`flex justify-center mt-4`}>
      <input
        value={value}
        onChange={e => onChangeText(e.target.value)}
        className={tw`border-none outline-none px-2`}
        onKeyDown={e => {
          e.key === "Enter" && onSubmit()
        }}
      />
      <button className={tw`border-none px-3 py-1 bg-blue-800 text-white`} onClick={onSubmit}>
        {title}
      </button>
    </div>
  )
}
