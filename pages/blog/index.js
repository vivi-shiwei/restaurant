import { Button } from 'antd'
import fetch from 'node-fetch'
// import Link from 'next/link'
const Blog = () => {
  return (
    <div>
      {/* <Link href='/api/restaurant/logout'> */}
      <Button
        onClick={async () => {
          try {
            const test = await fetch('/api/restaurant/logout', {
              method: 'post',
              headers: { 'Content-Type': 'application/json' }
            }).then(states => states.json())
            console.log(test)
          } catch (err) {
            console.log(err)
          }
        }}
      >
        登出
      </Button>
      {/* </Link> */}
    </div>
  )
}

export default Blog
