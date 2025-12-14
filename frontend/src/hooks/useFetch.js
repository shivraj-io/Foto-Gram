import { useEffect, useState } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false
    async function load() {
      setLoading(true)
      const res = await fetch(url)
      const json = await res.json()
      if (!ignore) setData(json)
      setLoading(false)
    }
    load()
    return () => {
      ignore = true
    }
  }, [url])

  return { data, loading }
}
