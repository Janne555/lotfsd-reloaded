import { useState } from 'react'
import { range } from '../utils/utils'
import styled, { css } from 'styled-components'

type Props = {
  value: number
  isEditMode?: boolean
  onChange?: (value: number) => void
  name: string
}

export function DieFace({ value, isEditMode, onChange, name }: Props) {
  const [selected, setSelected] = useState(value)

  if (selected !== value && !isEditMode) {
    setSelected(value)
  }

  const handleChange = (value: number) => {
    setSelected(value)
    onChange?.(value)
  }

  return (
    <div
      style={{ height: '5rem', width: '4rem' }}
      className="border rounded-md grid grid-cols-2 grid-rows-3 gap-x-4 gap-y-2 p-2"
      aria-label={value.toString()}
    >
      {range(6).map(i => i + 1).map(value => (
        <Container key={value} $filled={selected >= value}>
          {isEditMode
            ?
            <input
              name={name}
              type="radio"
              value={value}
              checked={value === selected}
              className={`w-4 h-4`}
              onChange={() => handleChange(value)}
            />
            : <DummyInput className={`w-4 h-4`} />
          }
        </Container>
      ))}
    </div>
  )
}

const Container = styled.div<{ $filled: boolean }>`
  ::after {
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    background-color: black;
    pointer-events: none;
    border-radius: 100%;
    ${({ $filled }) => !$filled && css`
      background-color: transparent;
      border: 1px solid black;
    `}
  }
`

const DummyInput = styled.div`
`