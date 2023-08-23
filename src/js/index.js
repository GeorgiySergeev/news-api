import axios from 'axios';
console.log('test');

axios.defaults.baseURL = 'https://newsapi.org/v2/everything';

const navBar = document.querySelector('.js-nav');
const gallery = document.querySelector('.article-card');
console.log(navBar, gallery);

navBar.addEventListener('click', onLinkClik);

function onLinkClik(e) {
  console.log(e.target.textContent);
  gallery.innerHTML = '';

  const query = e.target.textContent;
  fatchArticles(query).then(data => {
    const arrayOfArticles = data.articles;
    console.log(arrayOfArticles);
    createThumbnailMarkUp(arrayOfArticles);
  });
}

function createThumbnailMarkUp(arr) {
  const markup = arr.map(article => {
    return `  <div class="card-item" style="width: 18rem">
      <img
      src="${article.urlToImage}"
      class="card-img-top"
      alt="..."
    />
    <div class="card-item-body">
      <h5 class="card-item-title">"${article.title}"</h5>
      <h6 class="card-item-subtitle">"${article.source.name}"</h6>
    
      <p class="card-item-text">
          ${article.description}
          
        </p>
     
      <p class="author">${article.author}</p>
      <p class="date">${article.publishedAt}</p>
      <a href="${article.url}">
          <p>Go to article...</p>
      </a>
    </div>
  </div>`;
  });
  return gallery.insertAdjacentHTML('beforeend', markup.join(''));
}

async function fatchArticles(searchQuery, page) {
  const params = {
    apiKey: 'dcce7845e2254ee59f37860fb5526946',
    q: `${searchQuery}`,
    pageSize: 20,
    page: `${page}`,
    language: 'en',
  };
  const response = await axios.get('', { params });
  const articlesData = response.data;
  console.log(articlesData);
  return articlesData;
//   try {
    
//   } catch (error) {
//     console.log(error.message);
//   }
}

