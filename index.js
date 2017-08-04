// engine.io-client required
(function() {
    if (!eio) {
        throw new Error('engine.io-client librry required to be included')
    }
    function connect(url) {
        return new Promise(function(resolve, reject) {
            var client = eio('ws://localhost:3000')

            let result = {
                query: query,
                get: get,
                post: post,
                put: put,
                patch: patch,
                delete: deleteQuery,

                // fire: fire,

                // file: file,
            }
            let status = false
            let responseWaiting = {}

            client.on('open', function() {
                status = true
                resolve(result)

                client.on('message', function(data) {
                    let res = JSON.parse(data)
                    let requestId = res[0]

                    if (requestId in responseWaiting) {
                        responseWaiting[requestId](
                            Number(res[1]),
                            res[2],
                            res[3]
                        )
                        delete responseWaiting[requestId]
                    }
                })
            })
            client.on('error', function(err) {
                reject(err)
            })

            function get(path, options) {
                let headers = options ? options.headers : []
                return query(path, 'GET', headers)
            }
            function post(path, body, options) {
                let headers = options ? options.headers : []
                return query(path, 'POST', headers, body)
            }
            function put(path, body, options) {
                let headers = options ? options.headers : []
                return query(path, 'PUT', headers, body)
            }
            function patch(path, body, options) {
                let headers = options ? options.headers : []
                return query(path, 'PATCH', headers, body)
            }
            function deleteQuery(path, options) {
                let headers = options ? options.headers : []
                return query(path, 'DELETE', headers)
            }

            let queryUid = 0
            function query(path, method, headers, body) {
                if (!status) {
                    console.warn('Cannot delivery query, connection not established')
                }
                return new Promise(function(resolve, reject) {
                    let requestId = queryUid++
                    client.send(JSON.stringify([
                        requestId,
                        method,
                        path,
                        headers,
                        body
                    ]))

                    responseWaiting[requestId] = function(statusCode, headers, body) {
                        if (!statusCode) {
                            reject(new Error('response is incorrect'))
                        }
                        if (statusCode >= 200 && statusCode < 300) {
                            resolve({
                                statusCode: statusCode,
                                headers: headers,
                                body: body,
                            })
                        }
                        // 300 codes is redirect
                        if (statusCode >= 400 && statusCode < 500) {
                            reject({
                                message: 'User error. Code is ' + statusCode,
                                code: statusCode,
                                statusCode: statusCode,
                                body: body,
                            })
                        }
                        if (statusCode >= 500) {
                            reject({
                                message: 'Server error. Code is ' + statusCode,
                                code: statusCode,
                                statusCode: statusCode,
                                body: body,
                            })
                        }
                    }
                })
            }
        })
    }

    if (typeof require === 'undefined') {
        window.SockrestClient = connect
    }
    if (typeof module !== 'undefined') {
        module.exports = connect
    }
})()