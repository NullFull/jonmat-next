import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'

const INITIAL_VALUES = {}

const DataContext = createContext(INITIAL_VALUES)

const DataProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const [year, setYear] = useState('')
  const [years, setYears] = useState([])
  const [restaurants, setRestaurants] = useState([])

  useLayoutEffect(() => {
    const fetchYears = async () => {
      const response = await fetch('/data/years.json')
      const data = await response.json()

      setYears(data.reverse())
      setYear(data[0])
    }
    fetchYears()
  }, [])

  useEffect(() => {
    if (!year) return

    const fetchRestaurants = async () => {
      setLoading(true)

      const response = await fetch(`/data/${year}.json`)
      const data = await response.json()

      setRestaurants(data)
      setLoading(false)
    }
    fetchRestaurants()
  }, [year])

  return (
    <DataContext.Provider
      value={{
        loading,
        year,
        years,
        setYear,
        restaurants,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

const useData = () => useContext(DataContext)

export {
  useData,
  DataProvider,
}
