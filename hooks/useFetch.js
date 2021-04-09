import { useEffect, useState } from 'react'

const useFetch = (url, options) => {
  const [result, setResult] = useState(null)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const abortController = new AbortController()
    const { signal } = abortController

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        if (!signal.aborted) setResult(json)
      })
      .catch((err) => {
        if (!signal.aborted) setError(err)
      })
      .finally(() => {
        if (!signal.aborted) setLoading(false)
      })

    return () => {
      abortController.abort()
    }
  }, [])

  return { result, loading, error }
}

export default useFetch
