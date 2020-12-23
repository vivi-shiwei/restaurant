import { useEffect } from 'react'
import { useRouter } from 'next/router'
import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
// import { initializeApollo } from '../apollo/client'
import { Button } from 'antd'
import fetch from 'node-fetch'

const UserQuery = gql`
  query UserQuery {
    currentUser {
      id
      name
    }
  }
`

const Index = () => {
  const router = useRouter()
  const { data, loading, error } = useQuery(UserQuery)
  const currentUser = data?.currentUser
  const shouldRedirect = !(loading || error || currentUser)

  useEffect(() => {
    if (shouldRedirect) {
      router.push('/login')
    }
  }, [shouldRedirect])

  if (error) {
    router.push('/login')
    return <p>{error.message}</p>
  }

  if (loading) return 'loading...'

  return (
    !!currentUser && (
      <div>
        You're signed in as {currentUser.name} and you're  goto{' '}
        <Link href='/about'>
          <a>static</a>
        </Link>{' '}
        page.

        <Button type='primary' loading>
          Loading
        </Button>

        <form action='/api/restaurant/login' method='post'>
          <div>
            <label>Username:</label>
            <input type='text' name='username' />
          </div>
          <div>
            <label>Password:</label>
            <input type='password' name='password' />
          </div>
          <div>
            <Button
              type='primary'
              onClick={async () => {
                try {
                  const test = await fetch('/api/restaurant/login', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      username: 'rainwildest@163.com',
                      password: '123456'
                    })
                  }).then(states => states.json())
                  console.log(test)
                } catch (err) {
                  console.log('error')
                }
              }}
            >
              Log In
            </Button>
            <input type='submit' value='Log In' />
          </div>
        </form>
      </div>
    )
  )
}

// export async function getStaticProps (context) {
//   const apolloClient = initializeApollo()

//   await apolloClient.query({
//     query: UserQuery
//   })

//   return {
//     props: {
//       initialApolloState: apolloClient.cache.extract()
//     }
//   }
// }

export default Index
