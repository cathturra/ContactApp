function addContact() {

    const url = '/contact'
    var contact = e.currentTarget
    var contactDataObj = Object.formEntries(new formData(contact).entries())
    axios.post('/contact', contactDataObj).then(res => {
        console.log(res)
    })
}

function addToFirebase() {
var firstName = document.getElementById('firstName').value()
var lastName = document.getElementById('lastName').value()
var phone = document.getElementById('phone').value()
var address = document.getElementById('address').value()
var add = document.getElementById('add').value()

add.addEventListener('click', () => {
        var contactData = {
            "First Name": firstName,
            "Last Name": lastName,
            "Phone Number": phone,
            "Address": address
        }
    })
}





