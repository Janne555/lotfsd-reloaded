import { useEditMode } from "../hooks/useStorage"

export const FloatingSaveButton = () => {
  const { setEditModeOff, isEditMode } = useEditMode()
  if (!isEditMode) return null

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <button onClick={() => setEditModeOff()} className="px-4 py-2 bg-blue-500 text-white rounded-md border-none cursor-pointer">
        Save
      </button>
    </div>
  )
}
