'use client'

export default function Home() {
  function testCall() {
    fetch('/api/getUser?rar=wowh', {
      method: 'POST',
      body: JSON.stringify({ shit: 'hole' }),
    })
      .then((res) => console.log(res.json()))
      .catch((error) => console.log(error))
  }
  function testCreateUser() {
    fetch('/api/createUser', {
      method: 'POST',
      body: JSON.stringify({ username: 'Rowen' }),
    })
      .then((res) => console.log(res.json()))
      .catch((error) => console.log(error))
  }

  async function testPost() {
    try {
      const user = await (await fetch('/api/getUser?username=JOHNNO')).json()
      console.log('user', user)
      const group_info = {
        users: [user],
        leader: user,
        arrangement_period: [],
        blahdfks: "sjdkfjdk"
      }
      console.log('group_info', group_info)

      const newGroup = await fetch('/api/createGroup', {
        method: 'POST',
        body: JSON.stringify(group_info),
      })
      console.log(newGroup.json())
    } catch (e) {
      console.log('error:', e)
    }
  }

  return (
    <div>
      <h1 className="font-bold text-center">balls</h1>
      <button
        onClick={() => {
          testCall()
        }}
      >
        Test API Button
      </button>
      <button
        onClick={() => {
          testPost()
        }}
      >
        Test Post
      </button>
      <button
        onClick={() => {
          testCreateUser()
        }}
      >
        TestCreateUser
      </button>
    </div>
  )
}
