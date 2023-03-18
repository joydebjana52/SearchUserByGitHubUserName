const fetchData = async () => {
    const username = document.getElementById("username").value;

    // fetch user data
    const userDataResponse = await fetch(`https://api.github.com/users/${username}`);
    const userData = await userDataResponse.json();

    // fetch user repos
    const userReposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
    const userRepos = await userReposResponse.json();

    // display user image
    const userImage = document.getElementById("user-image");
    userImage.innerHTML = `<img src="${userData.avatar_url}"