const ramenMenu = document.getElementById('ramen-menu')
const ramenHost = 'http://localhost:3000/ramens'
const ramenDetail = document.getElementById('ramen-detail')
const detailImage = document.getElementsByClassName('detail-image')
const detailName = document.getElementsByClassName('name')
const detailRestaurant = document.getElementsByClassName('restaurant')
const rating = document.getElementById('rating-display')
const comment = document.getElementById('comment-display')
const ramenForm = document.getElementById('new-ramen')

document.addEventListener('DOMContentLoaded', fetchRamen())
ramenForm.addEventListener('submit', event => createRamen(event))

function fetchRamen() {
    fetch(ramenHost)
    .then(res => res.json())
    .then(images => {
        images.forEach(element => {
            const img = document.createElement('img')
            img.src = element.image
            ramenMenu.append(img)
            img.addEventListener('click', event => handleRamen(element))
        })
    })
}

function handleRamen(ramen) {
    detailImage[0].src = ramen.image;
    detailImage[0].alt = ramen.name;
    detailName[0].textContent = ramen.name;
    detailRestaurant[0].textContent = ramen.restaurant
    rating.textContent = ramen.rating
    comment.textContent = ramen.comment
}

function createRamen(event) {
    event.preventDefault();
    const newRamen = {
        name: event.target.name.value,
        restaurant: event.target.restaurant.value,
        image: event.target.image.value,
        rating: event.target.rating.value,
        comment: event.target['new-comment'].value
    }
    const img = document.createElement('img')
    img.src = newRamen.image
    ramenMenu.append(img)
    img.addEventListener('click', event => handleRamen(newRamen))
}