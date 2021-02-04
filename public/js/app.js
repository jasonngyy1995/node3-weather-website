// client side js which would run on browser

// console.log('Testing')

// fetch('http://puzzle.mead.io/puzzle).then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })



// select the html element to work with
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// 2nd arg. is a callback function to run everytime the form is submitted
// e = event
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = search.value

    fetch('weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
        
    })
    
})

