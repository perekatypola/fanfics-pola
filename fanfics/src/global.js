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
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({book_name: work.book_name})
        }).then((response) => response.json()).then(res => {
            console.log(res.rating)
            return res.rating
        })
}

export const getTags = (work) => {

}

export const addLike = (work , user_liked) => {
    console.log(user_liked)
    fetch("https://fanfics-pola.herokuapp.com/addLike",  {
        method: 'POST',
        headers:{'Content-Type': 'application/json' , 'Auth' : localStorage.getItem('jwt')},
        body: JSON.stringify({user_liked: user_liked , book_name : work})
    }).then((response) => response.json()).then(res => {
        console.log(res)
    })
}

export const deleteFanfic = (work) => {
    return new Promise ((resolve , reject) => {
        fetch("https://fanfics-pola.herokuapp.com/deleteFanfic",  {
            method: 'GET',
            headers:{'Content-Type': 'application/json' , 'book_name' : work.book_name , 'Auth' : localStorage.getItem('jwt')},
        }).then((response) => response.json()).then(res => {
            resolve("deleted")
            deleteIndex(work)
        })
    })
}

const deleteIndex = (work) => {
    fetch("https://fanfics-pola.herokuapp.com/deleteIndex",  {
        method: 'POST',
        headers:{'Content-Type': 'application/json' , 'Auth' : localStorage.getItem('jwt')},
        body : JSON.stringify({id: work.book_id})
    }).then((response) => response.json()).then(res => {})
}

export const updateUser = (name , prevName , contacts , info) => {
    return new Promise ((resolve , reject) => {
        console.log(prevName)
        fetch("https://fanfics-pola.herokuapp.com/updateUser",  {
            method: 'POST',
            headers:{'Content-Type': 'application/json' , 'Auth' : localStorage.getItem('jwt')},
            body: JSON.stringify({name: name , prevName : prevName , contacts: contacts , info: info})
        }).then((response) => response.text()).then(res => {
            console.log(res)
            resolve("updated")
        })
    })
}

export const deleteUser = (user_name) => {
    return new Promise((resolve, reject) => {
        fetch("https://fanfics-pola.herokuapp.com/deleteUser",  {
            method: 'POST',
            headers:{'Content-Type': 'application/json' , 'Auth' : localStorage.getItem('jwt')},
            body: JSON.stringify({user_name : user_name})
        }).then((response) => response.text()).then(res => {
            resolve(res)
        })
    })
}

export const blockUser = (user_name , user_status) => {
    return new Promise ((resolve, reject) => {
        fetch("https://fanfics-pola.herokuapp.com/block",  {
            method: 'POST',
            headers:{'Content-Type': 'application/json' , 'Auth' : localStorage.getItem('jwt')},
            body: JSON.stringify({user_name : user_name , status:  user_status})
        }).then((response) => response.json()).then(res => {
            console.log(res)
            resolve(res)
        })
    })
}

export const addInitialBook = (name , description , topic ,suggestions ,tags , user_name) => {
    console.log(user_name)
    fetch("https://fanfics-pola.herokuapp.com/addBook",  {
        method: 'POST',
        headers:{'Content-Type': 'application/json' , 'Auth' : localStorage.getItem('jwt')},
        body : JSON.stringify({name: name , descr: description , topic: topic ,tags : tags , user:user_name , suggestions : suggestions} )
    }).then((response) => response.text()).then(res => {
        console.log(res)
    })
}

export const editBook = (name , description, tags ,prevName , suggestions , newTopic) => {
    fetch("https://fanfics-pola.herokuapp.com/editBook",  {
        method: 'POST',
        headers:{'Content-Type': 'application/json' , 'Auth' : localStorage.getItem('jwt')},
        body : JSON.stringify({tags : tags , prevName :prevName, name : name ,descr : description , suggestions: suggestions , topic: newTopic})
    }).then((response) => response.text()).then(res => {
        if(localStorage.getItem('curUser') === "admin") {
            window.location = "/admin"
        }
        else {
            window.location = "/user"
        }
        console.log(res)
    })
}

export const editChapter = (name , text, book_name ,prevName) => {
    fetch("https://fanfics-pola.herokuapp.com/editChapter",  {
        method: 'POST',
        headers:{'Content-Type': 'application/json' , 'Auth' : localStorage.getItem('jwt')},
        body : JSON.stringify({prevName :prevName, name : name , text: text , book_name: book_name})
    }).then((response) => response.text()).then(res => {
        console.log(res)
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


export const addChapter = (name , text , book) => {
    fetch("https://fanfics-pola.herokuapp.com/addChapter", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' , 'Auth': localStorage.getItem('jwt')
        },
        body : JSON.stringify({name: name , text: text , book_name: book})
    }).then((response) => response.text()).then(res => {
        console.log(res)
        addIndex()
    })
}

const addIndex = () => {
      fetch("https://fanfics-pola.herokuapp.com/addIndex", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json' , 'Auth': localStorage.getItem('jwt')
        }
    }).then((response) => response.text()).then(res => {
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