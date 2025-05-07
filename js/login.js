const BASE_URL = "https://dummyjson.com"
const formEl = document.querySelector(".form")
const loginEl = document.querySelector("#login")
const passwordEl = document.querySelector("#password")

formEl.addEventListener("submit", (e) => {
    e.preventDefault()
    const user = {
        username : loginEl.value,
        password : passwordEl.value,
        expiresInMins: 10,
    }
    fetch(`${BASE_URL}/auth/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(res => {
        if(!res.ok){
            throw new Error("username or password is incorrect")
        }
        return res.json()        
    })
    .then(data => {
        localStorage.setItem("access_token", data.accessToken)
        location.replace("./admin.html");
    })
    .catch(err => {
        document.getElementById("auth-error").style.display = "block";
        document.getElementById("form-error-border").style.display = "block";
    })
})
