import {CLIENT_SECRET} from "./config"
import CryptoJS from 'crypto-js';
let socket = new WebSocket("ws://localhost:8082");

socket.onmessage = function(event) {
  var incomingMessage = event.data;
  console.log(incomingMessage);
};

export const chaptersNav = async (chapters , curChapter) => {
    return new Promise((resolve , reject) => {
         chapters.forEach(ch => {
            if(ch.chapter_name === curChapter) {
                if(chapters.indexOf(ch) === 0) {
                    resolve("first")
                }
                else
                {
                    if(chapters.indexOf(ch) === chapters.length-1) {
                        resolve( "last")
                    }
                    else {
                        resolve( "middle")
                    }
                }
            }
        })
    })
}

export const register = (name , password , email) => {
    fetch("http://localhost:8081/users",  {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name,
            password: password,
            email: email
        })
    }).then((response) => response.json()).then(res => {
        if(!res.messageError) {
           window.location = "/";
        }
        else {
           const output = document.querySelector(".reg-output")
            setTimeout(() => {
                output.classList.remove("visible")
            }, 5000)
            output.innerText = res.messageError
            output.classList.add("visible")
        }
    })
}

export const signIn = (name , password) => {
    try {
        fetch("http://localhost:8081/login", {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: name,
            password: password,
        }),
    }).then((response) => response.json()).then(res => {
        if(!res.messageError && !res.error) {
            let curUser = CryptoJS.AES.encrypt(res.userId.toString() , CLIENT_SECRET).toString()
            console.log(curUser)
            localStorage.setItem('jwt' , res.accessToken)
            localStorage.setItem('curUser', curUser)
            if(res.admin == true) {
                let admin = CryptoJS.AES.encrypt("true" , CLIENT_SECRET).toString();
                localStorage.setItem("admin", admin)
            }
            window.location = "/user/" + localStorage.getItem("curUser");
        }
        else {
            const output = document.querySelector(".login-output")
            setTimeout(() => {
                output.classList.remove("visible")
            }, 5000)
            if(res.messageError) {
                output.innerText = res.messageError
            }
            if(res.error) {
                    output.innerText = res.error
            }
            output.classList.add("visible")
        }
    })
    }
    catch(er) {
        document.querySelector(".login-output").innerText = er
        document.querySelector(".login-output").classList.add("visible")
    }
}

export const addComment =(userId, text , bookId) => {
    fetch("http://localhost:8081/comments",  {
        method: 'POST',
        headers:{'Content-Type': 'application/json', 'Authorization': localStorage.getItem('jwt')},
        body: JSON.stringify({userId: userId, text: text , bookId  : bookId})
    })
}

export const getRating = (work) => {
        fetch("https://fanfics-pola.herokuapp.com/getRating",  {
            method: 'POST',
            headers:{'Content-Type': 'application/json', 'Authorization': localStorage.getItem("jwt")},
            body: JSON.stringify({book_name: work.book_name})
        }).then((response) => response.json()).then(res => {
            console.log(res.rating)
            return res.rating
        })
}

export const addLike = (id) => {
    fetch("http://localhost:8081/books/"+ id + "/like",  {
        method: 'POST',
        headers:{'Content-Type': 'application/json' , 'Authorization' : localStorage.getItem('jwt')},
    })
}

export const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:8081/users/" + id ,  {
            method: 'DELETE',
            headers:{'Content-Type': 'application/json' , 'Authorization' : localStorage.getItem('jwt')},
        }).then((response) => response.text()).then(res => {
            resolve(res)
        })
    })
}

export const blockUser = (id) => {
    return new Promise ((resolve, reject) => {
        fetch("http://localhost:8081/users/" + id + "/block",  {
            method: 'POST',
            headers:{'Content-Type': 'application/json' , 'Authorization' : localStorage.getItem('jwt')},
        }).then((response) => response.json()).then(res => {
            window.location.reload()
            resolve(res)
        })
    })
}

export const unblockUser = (id) => {
    return new Promise ((resolve, reject) => {
        fetch("http://localhost:8081/users/" + id + "/unlock",  {
            method: 'POST',
            headers:{'Content-Type': 'application/json' , 'Authorization' : localStorage.getItem('jwt')},
        }).then((response) => response.json()).then(res => {
            console.log(res)
            resolve(res)
            window.location.reload()
        })
    })
}

export const addInitialBook = (name , description , genreId, tags, fandomId, categoryId, userId) => {
    console.log(name, description, genreId, tags, fandomId, categoryId, userId)
    fetch("http://localhost:8081/books",  {
        method: 'POST',
        headers:{'Content-Type': 'application/json' , 'Authorization' : localStorage.getItem('jwt')},
        body : JSON.stringify({name: name, genreId: genreId, fandomId: fandomId, categoryId: categoryId, userId: userId, tags: tags, description: description} )
    }).then((response) => response.text()).then(res => {
        window.location = "/user" + userId
    })
}

export const editBook = (userId, name , description, tags , bookId , genre , fandom, category) => {
    console.log(name, description, tags, bookId, genre, fandom, category)
    fetch("http://localhost:8081/books/" + bookId , {
        method: 'PATCH',
        headers:{'Content-Type': 'application/json' , 'Authorization' : localStorage.getItem('jwt')},
        body : JSON.stringify({"genreId" : genre , "fandomId": fandom, "categoryId": category , tags : tags, description: description, name: name})
    }).then((response) => response.text()).then(res => {
        if(res.status == "200") {
            window.location = "/user/" + userId
        }
    })
}

export const editUser = (userId, password, contactInfo, about) => {
    fetch("http://localhost:8081/users/" + userId , {
        method: 'PATCH',
        headers:{'Content-Type': 'application/json' , 'Authorization' : localStorage.getItem('jwt')},
        body : JSON.stringify({password: password, contactInfo: contactInfo, about: about})
    }).then((response) => response.text()).then(res => {
        window.location.reload()
    })
}

export const editChapter = (userId,id, name, text) => {
    fetch("http://localhost:8081/chapters/" + id,  {
        method: 'PATCH',
        headers:{'Content-Type': 'application/json' , 'Authorization' : localStorage.getItem('jwt')},
        body : JSON.stringify({name: name, text: text})
    }).then((response) => response.text()).then(res => {
        window.location = '/user/' + userId
    })
}


export const loginVk = (name) => {
    fetch("https://fanfics-pola.herokuapp.com/facebookVkAuth", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'} ,
        body : JSON.stringify({name : name , email: "vk" , password: "vk"})
    }).then((response) => response.text()).then(res => {
        if(res!=="invalid" && res!== "blocked") {
            localStorage.setItem('jwt' , res)
            localStorage.setItem('curUser' , name)
            if(name === "admin") {
                window.location = '/admin'
            }
            else {
                window.location = '/user'
            }
        }
    })
}
export const loginFacebook = (response)  => {
    if(response) {
        fetch("https://fanfics-pola.herokuapp.com/facebookVkAuth", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'} ,
            body : JSON.stringify({name : response.name , email : response.email , password : "facebook"})
        }).then((response) => response.text()).then(res => {
            console.log(res)
            if(res!=="invalid" && res!== "blocked") {
                localStorage.setItem('jwt' , res)
                localStorage.setItem('curUser' , response.name)
                    window.location = '/user'
            }
        })
    }
}

export const deleteImage = (name) => {
    return new Promise ((resolve, reject) => {
        fetch("https://fanfics-pola.herokuapp.com/deleteImage", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' , 'Auth': localStorage.getItem('jwt')
            },
            body : JSON.stringify({name: name})
        }).then((response) => response.text()).then(res => {
            console.log(res)
        })
    })
}


export const addChapter = (name , text , bookId) => {
    fetch("http://localhost:8081/chapters", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' , 'Authorization': localStorage.getItem('jwt')
        },
        body : JSON.stringify({number: "1", name: name , text: text , bookId: bookId})
    }).then((response) => response.text()).then(res => {
        console.log(res)
    })
}

export const search = (searchText) => {
    fetch("https://fanfics-pola.herokuapp.com/search",  {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({searchText: searchText})
    }).then((response) => response.json()).then(res => {
        console.log(res.result)
        localStorage.setItem('results' ,  JSON.stringify(res.result))
        window.location = "/results"
    })
}

let book = ''

export const setCreatingBook = (curBook) => {
    book = curBook
}
export const getCreatingBook = () => {
    return book
}

export default socket