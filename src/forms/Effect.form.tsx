import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AttributesSchema, Effect, EffectSchema } from '../types'
import { FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material'
import { deCamel } from '../utils/utils'
import { nanoid } from 'nanoid'
import { useMemo } from 'react'
import { useMutateCharSheet } from '../hooks'

type Props = {
  onClose?: () => void
}

export const EffectForm = ({ onClose }: Props) => {
  const { handleSubmit, control, formState: { errors }, watch } = useForm<Effect>({
    resolver: zodResolver(EffectSchema)
  })

  const mutateCharSheet = useMutateCharSheet()

  const effectId = useMemo(() => nanoid(), [])
  const targetCategory = watch().targetCategory

  const onSubmit: SubmitHandler<Effect> = async (data) => {
    await mutateCharSheet((draft) => {
      draft.effects.push(data)
    })
    onClose?.()
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center pointer-events-none">
      <form onSubmit={handleSubmit(onSubmit)} className="w-screen p-4 bg-white flex flex-col gap-4 pointer-events-auto">
        <Controller
          name="id"
          defaultValue={effectId}
          control={control}
          render={({ field }) => (
            <input type="hidden" {...field} />
          )}
        />
        <Controller
          name="name"
          defaultValue=''
          control={control}
          render={({ field }) => (
            <TextField error={Boolean(errors.name)} helperText={errors.name?.message} inputProps={field} label="Name" variant='standard' />
          )}
        />
        <FormControl>
          <FormLabel error={Boolean(errors.effect)} id="effect-form-effect">Effect</FormLabel>
          <RadioGroup
            aria-labelledby="effect-form-effect"
            row
          >
            <Controller
              name="effect"
              control={control}
              render={({ field: { value, ...field } }) => (
                <FormControlLabel value="add" control={<Radio {...field} />} label="Add" />
              )}
            />
            <Controller
              name="effect"
              control={control}
              render={({ field: { value, ...field } }) => (
                <FormControlLabel value="replace" control={<Radio {...field} />} label="Replace" />
              )}
            />
            <Controller
              name="effect"
              control={control}
              render={({ field: { value, ...field } }) => (
                <FormControlLabel value="unknown" control={<Radio {...field} />} label="Non-effect" />
              )}
            />
          </RadioGroup>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel id="effect-form-category">Category</InputLabel>
          <Controller
            name="targetCategory"
            control={control}
            render={({ field: { value, ...field } }) => (
              <Select
                className="capitalize"
                error={Boolean(errors.targetCategory)}
                labelId="effect-form-category"
                label="Category"
                defaultValue="none"
                {...field}
              >
                <MenuItem value="none" className="capitalize"></MenuItem>
                {Object.keys(EffectSchema.shape.targetCategory.Values).map((category) => (
                  <MenuItem key={category} value={category} className="capitalize">{deCamel(category)}</MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
        {(targetCategory === 'attributes' || targetCategory === 'attributeModifier') && (
          <>
            <FormControl variant="standard">
              <InputLabel id="effect-form-attribute">Attribute</InputLabel>
              <Controller
                name="targetSubCategory"
                defaultValue='none'
                control={control}
                render={({ field: { value, ...field } }) => (
                  <Select
                    className="capitalize"
                    error={Boolean(errors.targetSubCategory)}
                    labelId="effect-form-attribute"
                    label="Attribute"
                    defaultValue="none"
                    {...field}
                  >
                    <MenuItem value="none" className="capitalize"></MenuItem>
                    {Object.keys(AttributesSchema.shape).map((attribute) => (
                      <MenuItem key={attribute} value={attribute} className="capitalize">{deCamel(attribute)}</MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
            <Controller
              name="value"
              defaultValue=""
              control={control}
              render={({ field }) => (
                <TextField type="number" error={Boolean(errors.value)} helperText={errors.value?.message} inputProps={field} label="Value" variant='standard' />
              )}
            />
          </>
        )}
        <button>submit</button>
      </form>
    </div>
  )
}
