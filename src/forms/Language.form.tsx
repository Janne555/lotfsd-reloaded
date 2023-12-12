import { Button, Checkbox, FormControl, FormLabel, TextField, Typography } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Language, LanguageSchema } from "../types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutateTempCharSheet } from "../hooks"
import { Add } from "@mui/icons-material"
import { nanoid } from "nanoid"

export const LanguageForm = () => {
  const { handleSubmit, control, formState: { errors }, register } = useForm<Language>({
    resolver: zodResolver(LanguageSchema),
    defaultValues: {
      name: "",
      isKnown: true,
      id: nanoid()
    }
  })
  const mutateCharSheet = useMutateTempCharSheet()

  const handleAdd: SubmitHandler<Language> = (data: Language) => {
    mutateCharSheet(draft => {
      draft.languages.push(data)
    })
  }

  return (
    <div className="">
      <Typography variant="h4">Add</Typography>
      <form onSubmit={handleSubmit(handleAdd)} className="flex flex-wrap gap-4 w-full pl-4">
        <input type="hidden" {...register("id")} />
        <Controller
          name="name"
          control={control}
          render={({ field }) => <TextField {...field} error={Boolean(errors.name)} label="Language" variant="standard" className="w-full" />}
        />
        <Controller
          name="isKnown"
          control={control}
          render={({ field }) =>
            <FormControl error={Boolean(errors.isKnown)}>
              <div className="flex flex-row items-center">
                <FormLabel htmlFor="isKnown">Known?</FormLabel>
                <Checkbox {...field} checked={field.value} id="isKnown" />
              </div>
            </FormControl>
          }
        />
        <Button type="submit" variant="contained" endIcon={<Add />}>Add</Button>
      </form>
    </div>
  )
}