/**
 * script.js
 *
 * This script reads in the data from the HTML form and sends
 * it in JSON format to the server (server.js). The server
 * may respond with data in JSON format, or with plain text.
 *
 * The response from a server may be a single byte, or it may
 * be many megabytes (for example: a high-resolution image).
 * For this reason, the `response.body` property is a
 * ReadableStream:
 *   https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
 *
 * Before the final value of the stream can be determined,
 * it needs to be read. It can only be read once. See below
 * for details.
 */


"use strict"

// Wrapping the JavaScript in an IIFE (Immediately Invoked
// Function Expression) makes debugging easier, because all
// variables are in local scope and not set as globals.

;(function localScope(){
  // <<< HARD-CODED values
  const POST_URL = "http://localhost:3000"
  const formIds = ["name", "team", "goal"]
  const button = document.getElementById("submit")
  const response = document.getElementById("response")
  // HARD-CODED >>>

  button.addEventListener("click", send)

  function send(event) {
    event.preventDefault()

    const json = getJSON()

    sendByFetch(json) // <<< returns a promise

      // response.body is a ReadableStream. It needs to be read
      // in asynchronously and converted to text or json or some
      // other type, using one of the following methods, all of
      // which return a promise:
      //
      // * response.arrayBuffer()
      // * response.blob()
      // * response.formData()
      // * response.json()
      // * response.text()
      //
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#body

      // response.text() will return a promise which resolves
      // to a string, even if the data was sent in JSON format.
      // Since we might receive data in plain text format, we
      // can't use response.json() every time, because it might
      // throw an error. Below is a solution that avoids this.

      .then(response => response.text())
      // All response.xxxx() functions return a second promise
      // which resolves to the actual data that was sent.

      .then(data => {
        try {
          // If the data was in JSON format, we can parse it...
          const json = JSON.parse(data)
          console.log("Data received:", json);
          return json

        } catch(error) {
          // If not, return the raw text
          return data
        }
      })
      
      .then(data => {
        if (typeof data === "object") {
          // ... but we have to stringify json again to show it
          // in the browser
          data = JSON.stringify(data, null, "  ")
        }
        response.innerHTML = data
      })
  }


  function getJSON() {
    const json = {}
    formIds.forEach( formId => {
      const element = document.getElementById(formId)
      json[formId] = formId === "goal"
                  ? element.checked
                  : element.value
    })
    return JSON.stringify(json)
  }


  // An async function always returns a promise
  async function sendByFetch(json) {
    const message = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json
    }

    const promise = await fetch (
      POST_URL,
      message
    )

    return promise;
  }
})()