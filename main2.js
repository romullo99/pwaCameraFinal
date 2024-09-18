document.addEventListener("DOMContentLoaded", () => {
    const newsForm = document.querySelector("#news-form");
    const openCameraButton = document.getElementById("open-camera");
    const chooseFileButton = document.getElementById("choose-file");
    const newsImageInput = document.getElementById("news-image-input");
    const imagePreview = document.getElementById("image-preview");
    const newsImageData = document.getElementById("news-image-data");

    
    openCameraButton.addEventListener("click", () => {
        newsImageInput.setAttribute("capture", "environment");
        newsImageInput.click(); 
    });

   
    chooseFileButton.addEventListener("click", () => {
        newsImageInput.removeAttribute("capture");
        newsImageInput.click(); 
    });

    
    newsImageInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";  
                newsImageData.value = e.target.result; 
            };

            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = "none"; 
            newsImageData.value = ""; 
        }
    });

    newsForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const userName = document.querySelector("#user-name-input").value.trim();
        const userEmail = document.querySelector("#user-email").value.trim();
        const title = document.querySelector("#title").value.trim();
        const content = document.querySelector("#content").value.trim();
        const image = newsImageData.value; 

        if (userName === "" || userEmail === "" || title === "" || content === "") {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        
        saveNewsToLocalStorage(userName, userEmail, title, content, image);
        alert("Notícia cadastrada com sucesso!");

        
        displayNews();

        
        setTimeout(() => {
            window.location.href = `index3.html?email=${encodeURIComponent(userEmail)}`;
        }, 1000);
    });

    function saveNewsToLocalStorage(userName, userEmail, title, content, image) {
        const news = getNewsFromLocalStorage();
        const timestamp = new Date().getTime(); 
        news.push({ userName, userEmail, title, content, image, timestamp });
        localStorage.setItem("news", JSON.stringify(news));
    }

    function getNewsFromLocalStorage() {
        return localStorage.getItem("news") ? JSON.parse(localStorage.getItem("news")) : [];
    }

    function displayNews() {
        const newsDisplay = document.querySelector("#news-display");
        newsDisplay.innerHTML = ""; 

        const news = getNewsFromLocalStorage();
        if (news.length > 0) {
            
            const latestNews = news.reduce((latest, item) => (item.timestamp > latest.timestamp ? item : latest), news[0]);

            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item", "card", "mb-3", "p-3", "bg-light", "text-dark");

            let imageHTML = latestNews.image ? `<img src="${latestNews.image}" alt="Imagem da notícia" style="max-width: 100%;">` : '';

            newsItem.innerHTML = `
                <h3 class="card-title">${latestNews.title}</h3>
                <p class="card-text">${latestNews.content}</p>
                ${imageHTML}
                <small class="text-muted">Publicado por: ${latestNews.userName} (${latestNews.userEmail})</small>
            `;
            newsDisplay.appendChild(newsItem);
        } else {
            newsDisplay.innerHTML = "<p class='text-center'>Nenhuma notícia cadastrada recentemente.</p>";
        }
    }
});
