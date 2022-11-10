var rateBtn = document.getElementsByClassName("btn");
let heart = document.getElementsByClassName('fa-heart')
var trash = document.getElementsByClassName("fa-trash");

Array.from(rateBtn).forEach(function(element) {
      element.addEventListener('click', function(){
        const id = this.parentNode.parentNode.getAttribute('data-objectId')
        console.log(id)
        const rating = parseInt(this.parentNode.querySelector('input[name="star"]:checked').value)
        fetch('reviews', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            "rating": rating,
            "id": id
            
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(heart).forEach(function(element) {
  element.addEventListener('click', function(){
     const id = this.parentNode.parentNode.getAttribute('data-objectId')
    // const rating = parseInt(this.parentNode.parentNode.querySelector('input[name="star"]:checked').value)
    const heartIc = this.dataset.heart === "true"
    fetch('favorites', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        
            "id": id,
        "heart": heartIc
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        //const name = this.parentNode.parentNode.childNodes[1].innerText
        //const msg = this.parentNode.parentNode.childNodes[3].innerText
        const id = this.parentNode.parentNode.getAttribute('data-objectId')
        
        fetch('reviews', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'id': id
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
