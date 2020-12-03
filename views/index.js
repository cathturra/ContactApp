const handleForm = (e) => {
    console.log(e)
    e.preventDefault
    var form = e.currentTarget
    var formDataObj = Object.fromEntries(new FormData(form).entries())
    axios.post('/signup', formDataObj).then(res => {
       console.log(res)
    })
}

// const handleClick = (e) => {
//     e.preventDefault
//     var login = document.getElementById('login')
// }

