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

export const setUser = (name , password , email) => {
    fetch("https://fanfics-pola.herokuapp.com/reg",  {
        method: 'GET',
        headers:{'Content-Type': 'application/json' , 'name' : name , 'password' : password , 'email' : email}
    }).then((response) => response.json()).then(res => {
    })
}

export const signIn = (name , password) => {
    fetch("https://fanfics-pola.herokuapp.com/auth",  {
        method: 'GET',
        headers:{'Content-Type': 'application/json' , 'name' : name , 'password' : password}
    }).then((response) => response.text()).then(res => {
        console.log(res)
        if(res!=="invalid" && res!== "blocked") {
            localStorage.setItem('jwt' , res)
            window.location = '/user'
        }
    })
}

export const addComment =(name , text , book) => {
    fetch("https://fanfics-pola.herokuapp.com/addComment",  {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({name : name , text: text , book : book})
    }).then((response) => response.text()).then(res => {
        console.log(res)
    })
}

export const getRating = (work) => {
        fetch("https://fanfics-pola.herokuapp.com/getRating",  {
            method: 'GET',
            headers:{'Content-Type': 'application/json' , 'book_name' : work.book_name},
        }).then((response) => response.json()).then(res => {
            console.log(res.rating)
            return res.rating
        })
}

export const addLike = (work , user_liked) => {
    console.log(user_liked)
    fetch("https://fanfics-pola.herokuapp.com/addLike",  {
        method: 'POST',
        headers:{'Content-Type': 'application/json' , 'book_name' : work , 'Auth' : localStorage.getItem('jwt')},
        body: JSON.stringify({user_liked: user_liked})
    }).then((response) => response.json()).then(res => {
        console.log(res)
    })
}

export const deleteFanfic = (work) => {
    fetch("https://fanfics-pola.herokuapp.com/deleteFanfic",  {
        method: 'GET',
        headers:{'Content-Type': 'application/json' , 'book_name' : work.book_name , 'Auth' : localStorage.getItem('jwt')},
    }).then((response) => response.json()).then(res => {})
}

export const deleteUser = (user_name) => {
    fetch("https://fanfics-pola.herokuapp.com/deleteUser",  {
        method: 'GET',
        headers:{'Content-Type': 'application/json' , 'user_name' : user_name , 'Auth' : localStorage.getItem('jwt')},
    }).then((response) => response.json()).then(res => {})
}

export const addInitialBook = (name , description , topic , tags) => {
    fetch("https://fanfics-pola.herokuapp.com/addBook",  {
        method: 'POST',
        headers:{'Content-Type': 'application/json' , 'name' : name , 'descr' : description , 'topic' : topic
            , 'Auth' : localStorage.getItem('jwt')},
        body : JSON.stringify({tags : tags} )
    }).then((response) => response.text()).then(res => {
        console.log(res)
    })
}

export const loginFacebook = (response)  => {
    console.log(response.authResponse)
    if(response.status === "connected") {
        console.log(response.authResponse.signedRequest)
        fetch("https://fanfics-pola.herokuapp.com/facebookAuth", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'} ,
            body : JSON.stringify({name : response.authResponse.signedRequest})
        }).then((response) => response.text()).then(result => {
            localStorage.setItem('jwt' , result)
            window.location = "/user"
            console.log(result)
        })
    }
}
export const addChapter = (name , text , book) => {
    fetch("https://fanfics-pola.herokuapp.com/addChapter", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'name': name,
            'text': text,
            'book_name': book,
            'Auth': localStorage.getItem('jwt')
        }
    }).then((response) => response.text()).then(res => {
        console.log(res)
    })
}

let book = ''

export const setCreatingBook = (curBook) => {
    book = curBook
}
export const getCreatingBook = () => {
    return book
}