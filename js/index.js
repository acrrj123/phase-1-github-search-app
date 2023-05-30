// First, make sure the html will load before the script tag. If the tag is in the beginning of the body, we need to add the DOMContentLoaded event listener.

document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector('#github-form');

  form.addEventListener('submit', e => {
    e.preventDefault()
    //console.log(e.target[0].value)
    //console.log(form.search.value)
    //console.log(e.target.search.value) 
    fetch(`https://api.github.com/search/users?q=${e.target.search.value}`)
    .then(resp => resp.json())
    //.then(data => console.log(data.items))
    .then(data => data.items.forEach(item => renderLogin(item)))
    
    //Render in the DOM login and image  
    function renderLogin(item) {
      //console.log(item.login)
      const userList = document.querySelector('#user-list')
      userList.innerHTML = ''
      const li = document.createElement('li')
      const h2 = document.createElement('h2')
      const img = document.createElement('img')
      img.src = item.avatar_url
      h2.textContent = item.login

      li.append(h2, img)
      userList.append(li)

      h2.addEventListener('click', e => renderRepos(item.login, e))

      e.target.reset()
    }
  })

  // Show repos when clicking on user
  function renderRepos(login, e) {
    const reposList = document.getElementById('repos-list')
    reposList.innerHTML = '' 
    e.preventDefault()
    fetch(`https://api.github.com/users/${login}/repos`)
    .then(resp => resp.json())
    .then(dataRepo => dataRepo.forEach(repo => {
      //console.log(repo.name)
      const li = document.createElement('li')
      li.textContent = repo.name
      reposList.append(li)
      })
    )
  } 
})







