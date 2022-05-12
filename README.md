# Demo of sending and receiving JSON

This project uses fetch() in the browser and express.json() in the server.

In the browser, the header "Content-Type": "application/json" is set explicitly, so that [express.json()](https://expressjs.com/en/5x/api.html) will be able to convert the `request.body` to a JSON object.

The `.body` property of both the `request` object on the server and the `response` object in the browser is a [ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream). As such, it needs to be read asynchronously and can only be used when the complete stream has been read.

In this example the `response.text()` method is used in the browser and the `express.json()` middleware is used in the server.

For more details, see:
* https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
* https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch