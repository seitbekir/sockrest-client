# sockrest-client

Realtime client that works to support protocol defined by [sockrest](https://github.com/seitbekir/sockrest)

## How to use

Client side implementation

```js
import SockrestClient from 'sockrest-client'

let client = SockrestClient('ws://127.0.0.1:3000')

client.on('error', (err) => {
    console.error('connection error', err.message)
})

client.on('open', () => {
    client
        .get('/')
        // 2xx
        .then(res => {
            console.info('Just got response')
            console.info('Status Code:', res.statusCode)
            console.info('Body:', res.body)
        })
        // 4xx
        .catch(err => {
            console.error('Response was not get')
            console.error('Status Code:', err.statusCode);
        })

    client
        .post('/posts', { robot: 'I`m a client' })
        // 2xx
        .then(res => {
            console.info('Just got response')
            console.info('Status Code:', res.statusCode)
            console.info('Body:', res.body)
        })
        // 4xx
        .catch(err => {
            console.error('Response was not get')
            console.error('Status Code:', err.statusCode);
        })
})
```