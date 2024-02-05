import { useEffect, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs'

function CustomDatePicker({
  value: initialValue,
  onChange,
  debounce = 500,
  label,
  className
}: {
    value: string
    onChange: (value: string) => void
    debounce?: number
    label: string | undefined
    className: string | undefined
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState<Dayjs | null>(dayjs(initialValue))

  useEffect(() => {
    setValue(dayjs(initialValue))
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(dayjs(value).format("YYYY/MM/DD"))
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <DatePicker
      label={label}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      format="YYYY/MM/DD"
      className={className}
    />
  )
}

export default CustomDatePicker