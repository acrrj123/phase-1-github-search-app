// First, make sure the html will load before the script tag. If the tag is in the beginning of the body, we need to add the DOMContentLoaded event listener.

document.addEventListener("DOMContentLoaded", () => {

  const formRepo = document.createElement('form')
  formRepo.innerHTML = `
  <form id='github-form'>
      <input id='search' type='text' name='search' placeholder='Type repo'>
      <input type='submit' name='submit'/>
    </form>`
  const div = document.getElementById('main')
  div.appendChild(formRepo)

  formRepo.addEventListener('submit', e => {
    e.preventDefault()
    fetch(`https://api.github.com/search/repositories?q=${e.target.search.value}`)
    .then(resp => resp.json())
    //.then(data => console.log(data.items)) 
    .then(data => data.items.forEach(item => renderRepoSearch(item))) 
  })
  
  function renderRepoSearch(item) {
    const reposList = document.getElementById('repos-list')
    const li = document.createElement('li')
      li.textContent = item.name
      reposList.append(li)
  }

  const form = document.querySelector('#github-form');
  document.getElementById('search').placeholder = 'Type username'
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
      const a = document.createElement('a')
      const link = document.createTextNode('Link to profile')
      a.append(link)
      a.title = 'Link to profile'
      a.href = `${item.html_url}`
      h2.textContent = item.login
      img.src = item.avatar_url
      li.append(h2, a, img)
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







