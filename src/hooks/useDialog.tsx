import { Close } from "@mui/icons-material"
import { Button, IconButton, Modal } from "@mui/material"
import { createContext, useCallback, useContext, useMemo, useState } from "react"


export const useDialog = () => {
  const dialogContext = useContext(DialogContext)
  if (!dialogContext) throw new Error('useDialog must be used within a DialogProvider')

  type ConfirmationProps = {
    title?: string
    content?: React.ReactNode
  }
  const getConfirmation = useCallback(({
    title = 'Are you sure?',
    content = 'Are you sure you want to do this?'
  }: ConfirmationProps): Promise<boolean> => {
    return new Promise((resolve) => {
      dialogContext.open({
        title,
        content,
        actions: {
          cancel: {
            label: 'Cancel',
            onClick: () => {
              dialogContext.close()
              resolve(false)
            }
          },
          confirm: {
            label: 'Confirm',
            onClick: () => {
              dialogContext.close()
              resolve(true)
            }
          }
        }
      })
    })
  }, [])

  return useMemo(() => ({
    getConfirmation
  }), [getConfirmation])
}

type ModalContent = {
  title: string
  content: React.ReactNode
  actions: {
    cancel: {
      label?: React.ReactNode
      onClick: () => void
    }
    confirm: {
      label: React.ReactNode
      onClick: () => void
    }
  }
}

type ModalProps = {
  close: () => void
  open: (content: ModalContent) => void
}

const DialogContext = createContext<ModalProps>({} as any)

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalContent, setModalContent] = useState<ModalContent>()

  const value = useMemo(() => ({
    close: () => setModalContent(undefined),
    open: (content: ModalContent) => setModalContent(content)
  }), [])

  return (
    <DialogContext.Provider value={value}>
      <Modal
        open={!!modalContent}
        onClose={modalContent?.actions.cancel.onClick}
        aria-labelledby="modal-title"
        aria-describedby="modal-content"

      >
        <div className="bg-white p-4 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col gap-4 w-11/12 max-w-xl">
          <div className="absolute right-0 top-0">
            <IconButton aria-label="close modal"><Close /></IconButton>
          </div>
          <h2 id="modal-title" className="text-xl">{modalContent?.title}</h2>
          <div id="modal-content">
            {modalContent?.content}
          </div>
          <div className="flex gap-4 w-full justify-between">
            {modalContent?.actions.cancel.label &&
              <Button onClick={modalContent.actions.cancel.onClick}>
                {modalContent.actions.cancel.label}
              </Button>
            }
            <Button variant="contained" onClick={modalContent?.actions.confirm.onClick}>
              {modalContent?.actions.confirm.label}
            </Button>
          </div>
        </div>
      </Modal>
      {children}
    </DialogContext.Provider>
  )
}
