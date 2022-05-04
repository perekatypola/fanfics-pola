function checkStatus(){
    if(localStorage.getItem("jwt")) {
        return "anonymous"
    }
    else {
        return "sign-in"
    }
}

function hideNodesWithUserStatusName() {
    let status = checkStatus()
  document.querySelectorAll('[data-user-status]')
    .forEach(el => {
      el.dataset.userStatus == status ? el.classList.add("hidden") : el.classList.remove("hidden");
    })
}


export {hideNodesWithUserStatusName}