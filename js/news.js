class NewsGenerate {
    #url = 'https://newsapi.org/v2/everything?q=ukraine&sortBy=popularity&apiKey=3c0a771f45234c76a6f0a996adb1d43a';
    #articles = [];

    // create an object with objects with news
    constructor() {
        fetch(this.#url)
            .then(obj =>obj.json())
            .then(json => json['articles'].forEach(obj => {
                this.#articles.push({
                    title: obj['title'],
                    description: obj['description'],
                    url: obj['url'],
                    urlToImage: obj['urlToImage'],
                })
            }))
            .catch(error => {
                console.log(error)
                this.#articles = articleGit
                document.querySelector('#loadedNews').hidden = ''
            })
            .then(this.init)
    }

    // add articles to the page
    init = () => {
        this.#articles.forEach(article => {
            let newNewsDiv = document.createElement('div');
            newNewsDiv.classList.add('newNewsBlock');

            let textDiv = document.createElement('div');
            textDiv.classList.add('textDiv');

            let header = document.createElement('a');
            (article.title.indexOf('|') !== -1) ? header.textContent = article.title.slice(article.title.indexOf('|')+2).
            substring(0, 19)+'...': header.textContent = article.title.substring(0, 19)+'...';
            header.href = article['url'];
            header.target = '_blank';
            header.classList.add('articleHeader');

            let img = new Image(140, 115);
            img.src = article['urlToImage'];
            let p = document.createElement('p');
            p.textContent = article.description;
            p.classList.add('descriptions');
            (article.description.length > 100) ? p.textContent = article['description'].substring(0, 101)+'...': p.textContent = article['description'];

            textDiv.append(header, p);
            newNewsDiv.append(textDiv,img);
            document.querySelector('.news').append(newNewsDiv);
        })

    }
}

window.addEventListener('DOMContentLoaded', () => new NewsGenerate())
