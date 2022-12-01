const ramenMenu = document.getElementById('ramen-menu')
const ramenHost = 'http://localhost:3000/ramens'
const ramenDetail = document.getElementById('ramen-detail')
const detailImage = document.getElementsByClassName('detail-image')
const detailName = document.getElementsByClassName('name')
const detailRestaurant = document.getElementsByClassName('restaurant')
const rating = document.getElementById('rating-display')
const comment = document.getElementById('comment-display')
const ramenForm = document.getElementById('new-ramen')
const editRamenForm = document.getElementById('edit-ramen')

document.addEventListener('DOMContentLoaded', fetchRamen())
ramenForm.addEventListener('submit', event => createRamen(event))
editRamenForm.addEventListener('submit', event => editRamen(event))
const btn = document.createElement('button')
btn.textContent = 'Delete Ramen'
const body = document.querySelector('body')

body.appendChild(btn)

btn.addEventListener('click', event => {
    deleteThisRamen(event)
    ramenMenu.innerHTML = ''
    window.location.reload()
})

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
        const firstImage = images[0];
        detailImage[0].src = firstImage.image;
        detailImage[0].alt = firstImage.id;
        detailName[0].textContent = firstImage.name;
        detailRestaurant[0].textContent = firstImage.restaurant
        rating.textContent = firstImage.rating
        comment.textContent = firstImage.comment
    })
}

function handleRamen(ramen) {
    detailImage[0].src = ramen.image;
    detailImage[0].alt = ramen.id;
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

function editRamen(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/ramens/${detailImage[0].alt}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: event.target.name.value,
            rating: parseInt(event.target.rating.value),
            comment: event.target['new-comment'].value
        })
    })
    .then(res => res.json())
    .then(data => handleRamen(data))
}

function deleteThisRamen() {
    fetch(`http://localhost:3000/ramens/${detailImage[0].alt}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
}