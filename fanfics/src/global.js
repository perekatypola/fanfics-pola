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
    fetch("http://localhost:8080/auth",  {
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
    fetch("http://localhost:8080/addComment",  {
        method: 'GET',
        headers:{'Content-Type': 'application/json' , 'name' : name , 'text' : text , 'book' : book}
    }).then((response) => response.text()).then(res => {
        console.log(res)
    })
}

export const getRating = (work) => {
        fetch("http://localhost:8080/getRating",  {
            method: 'GET',
            headers:{'Content-Type': 'application/json' , 'book_name' : work.book_name},
        }).then((response) => response.json()).then(res => {
            console.log(res.rating)
            return res.rating
        })
}

export const addLike = (work , user_liked) => {
    fetch("http://localhost:8080/addLike",  {
        method: 'GET',
        headers:{'Content-Type': 'application/json' , 'book_name' : work , 'user_liked' : user_liked , 'Auth' : localStorage.getItem('jwt')},
    }).then((response) => response.json()).then(res => {
        console.log(res)
    })
}

export const deleteFanfic = (work) => {
    fetch("http://localhost:8080/deleteFanfic",  {
        method: 'GET',
        headers:{'Content-Type': 'application/json' , 'book_name' : work.book_name , 'Auth' : localStorage.getItem('jwt')},
    }).then((response) => response.json()).then(res => {})
}

export const addInitialBook = (name , description , topic , tags) => {
    fetch("http://localhost:8080/addBook",  {
        method: 'POST',
        headers:{'Content-Type': 'application/json' , 'name' : name , 'descr' : description , 'topic' : topic
            , 'Auth' : localStorage.getItem('jwt')},
        body : JSON.stringify({tags : tags} )
    }).then((response) => response.text()).then(res => {
        console.log(res)
    })
}

export const addChapter = (name , text , book) => {
    fetch("http://localhost:8080/addChapter", {
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