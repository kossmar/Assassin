import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'

const fetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null }
    })

export function useUser({ redirectIfUnauthorized, redirectIfFound, redirectWithCookie } = {}) {
  const { data, error } = useSWR('/api/profile/user', fetcher)
  const user = data?.user
  // console.log("DAG BUTTS: \n" + JSON.stringify(user.display_name))
  const finished = Boolean(data)
  const hasUser = Boolean(user)

  useEffect(() => {
    if (!redirectIfUnauthorized || !finished) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectIfUnauthorized && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectIfUnauthorized)
    }

    if (redirectWithCookie && !hasUser) {
      // create cookie
      Router.push(redirectWithCookie)
    }

  }, [redirectIfUnauthorized, redirectIfFound, redirectWithCookie, finished, hasUser])

  return error ? null : user
}

