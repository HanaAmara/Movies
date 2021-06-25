function getInput(){
    return userInput.value;
}

async function apiCall(input){
    return await fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
    .then(response => response.json());
}

function drawData(data){
    results.style.display = "block";
    error.style.display = "none";
    results.innerHTML = '';

    for(let {show} of data){
        var div = document.createElement("div");
        div.innerHTML = 
        `<h2>${show.name}</h2>
        ${show?.image?.medium ?
        `<img src="${show.image.medium}" />` : 'No Image Found'}
        <p>${show.genres.join(", ")}</p>
        <a href="${show.url}">Go to site</a>
        `;
        results.appendChild(div);
    }
}

function drawError(){
    results.style.display = "none";
    error.style.display = "block";
}

async function fetchData(){
    let input = getInput();
    let data = await apiCall(input);
    try{
        return drawData(data);
    }
    catch(e){
        return drawError();		
    }
}

function debounce(func, wait){
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
