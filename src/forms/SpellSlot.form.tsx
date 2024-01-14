import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { SpellSlot, SpellSlotSchema } from "../types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutateTempCharSheet } from "../hooks/useStorage"
import { IconButton, TextField } from "@mui/material"
import { nanoid } from "nanoid"
import { Add } from "@mui/icons-material"

type Props = {
}

export const SpellSlotForm = ({ }: Props) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<SpellSlot>({
    defaultValues: {
      id: nanoid(),
      level: "1",
      used: false,
    },
    resolver: zodResolver(SpellSlotSchema.omit({ used: true }))
  })

  const mutateCharSheet = useMutateTempCharSheet()

  const onSubmit: SubmitHandler<SpellSlot> = (data) => {
    mutateCharSheet((draft) => {
      draft.spellSlots.push(data)
      draft.spells.sort((a, b) => Number(a.level) - Number(b.level))
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 items-center">
      <input type="hidden" {...register('id')} />
      <Controller
        name="level"
        control={control}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.level)}
            helperText={errors.level?.message}
            inputProps={field}
            label="Level"
            variant="outlined"
            type="number"
          />
        )}
      />
      <div className="flex gap-4 justify-center">
        <IconButton type="submit"><Add /></IconButton>
      </div>
    </form>
  )
}