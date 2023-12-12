import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Spell, SpellSchema } from "../types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutateTempCharSheet } from "../hooks"
import { Button, TextField } from "@mui/material"

type Props = {
  defaultValues?: Partial<Spell>
  onClose: () => void
}

export const SpellForm = ({ defaultValues, onClose }: Props) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<Spell>({
    defaultValues: {
      level: "",
      name: "",
      ...defaultValues,
    },
    resolver: zodResolver(SpellSchema)
  })

  const mutateCharSheet = useMutateTempCharSheet()

  const onSubmit: SubmitHandler<Spell> = (data) => {
    console.log(data)
    mutateCharSheet((draft) => {
      const index = draft.spells.findIndex((spell) => spell.id === defaultValues?.id)
      if (index >= 0) {
        draft.spells[index] = data
      } else {
        draft.spells.push(data)
      }
      draft.spells.sort((a, b) => Number(a.level) - Number(b.level))
    })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 py-4">
      <input type="hidden" {...register('id')} />
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField defaultValue={field.value} error={Boolean(errors.name)} helperText={errors.name?.message} inputProps={field} label="Name" variant='standard' />
        )}
      />
      <Controller
        name="level"
        control={control}
        render={({ field }) => (
          <TextField
            error={Boolean(errors.level)}
            helperText={errors.level?.message}
            inputProps={field}
            label="Level"
            variant="standard"
            type="number"
          />
        )}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            multiline
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
            inputProps={field}
            label="Description"
            variant="standard"
          />
        )}
      />
      <div className="flex gap-4 justify-center">
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button type="submit" variant="contained">Save</Button>
      </div>
    </form>
  )
}