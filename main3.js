document.addEventListener("DOMContentLoaded", () => {
    // Exibir notícias na página
    displayNews();
});

function getNewsFromLocalStorage() {
    return localStorage.getItem("news") ? JSON.parse(localStorage.getItem("news")) : [];
}



function displayNews(userEmail) {
    const newsList = document.querySelector("#news-list");
    newsList.innerHTML = ""; 

    const news = getNewsFromLocalStorage();
    news.forEach((item) => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item", "card", "mb-3", "p-3", "bg-light", "text-dark");

        
        const deleteButton = userEmail === item.userEmail
            ? `<button class="btn btn-danger btn-sm float-right" onclick="deleteNews('${item.title}')">Excluir</button>`
            : '';

        newsItem.innerHTML = `
            <h3 class="card-title">${item.title}</h3>
            <p class="card-text">${item.content}</p>
            ${item.image ? `<img src="${item.image}" alt="Imagem da notícia" style="max-width: 100%;">` : ''}
            <small class="text-muted">Publicado por: ${item.userName} (${item.userEmail})</small>
            ${deleteButton}
        `;

        newsList.appendChild(newsItem);
    });

    if (news.length === 0) {
        newsList.innerHTML = "<p class='text-center'>Não há notícias cadastradas.</p>";
    }
}

function deleteNews(title) {
    let news = getNewsFromLocalStorage();
    news = news.filter(item => item.title !== title);
    localStorage.setItem("news", JSON.stringify(news));

    location.reload();
}
