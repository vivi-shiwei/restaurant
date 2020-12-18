import gql from 'graphql-tag'
import Link from 'next/link'
import { useQuery } from '@apollo/client'
import { initializeApollo } from '../apollo/client'
import { Button } from 'antd'
import fetch from 'node-fetch'

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      name
      status
    }
  }
`

const Index = () => {
  const {
    data: { viewer }
  } = useQuery(ViewerQuery)

  return (
    <div>
      You're signed in as {viewer.name} and you're {viewer.status} goto{' '}
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
}

export async function getStaticProps () {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ViewerQuery
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract()
    }
  }
}

export default Index
