import React from 'react'
import { useData } from 'utils/data'

const YearSelect = () => {
  const { years, year, setYear } = useData()

  return (
    <select
      value={year}
      onChange={e => setYear(e.target.value)}
    >
      {years.map(year => (
        <option key={year} value={year}>
          {year}년
        </option>
      ))}
    </select>
  )
}

export default YearSelect
