const submitBtn = document.getElementById("submit-btn");
const resultDiv = document.getElementById("result");

submitBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const apiUrl = `https://api.github.com/users/${username}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                resultDiv.innerHTML = `<p id="error-message">${data.message}</p>`;
            } else {
                const reposUrl = data.repos_url;
                const imageSrc = data.avatar_url;
                const repoList = document.createElement("ul");
                
                fetch(reposUrl)
                    .then(response => response.json())
                    .then(reposData => {
                        for (const repo of reposData) {
                            const repoItem = document.createElement("li");
                            const repoLink = document.createElement("a");
                            repoLink.href = repo.html_url;
                            repoLink.textContent = repo.name;
                            repoItem.appendChild(repoLink);
                            repoList.appendChild(repoItem);
                        }
                        resultDiv.innerHTML = `<img src="${imageSrc}" alt="User Image"><h2>Repositories:</h2>`;
                        resultDiv.appendChild(repoList);
                    });
            }
        })
        .catch(error => {
            resultDiv.innerHTML = `<p id="error-message">${error.message}</p>`;
        });
});