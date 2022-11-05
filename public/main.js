var rateBtn = document.getElementsByClassName("btn");

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

// Array.from(thumbDown).forEach(function(element) {
//   element.addEventListener('click', function(){
//     const name = this.parentNode.parentNode.childNodes[1].innerText
//     const msg = this.parentNode.parentNode.childNodes[3].innerText
//     const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//     const id = this.parentNode.parentNode.getAttribute('data-objectId')
//     fetch('messages', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': name,
//         'msg': msg,
//         'thumbUp':thumbUp -2,
//         'id': id
//       })
//     })
//     .then(response => {
//       if (response.ok) return response.json()
//     })
//     .then(data => {
//       console.log(data)
//       window.location.reload(true)
//     })
//   });
// });

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const id = this.parentNode.parentNode.getAttribute('data-objectId')
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'id': id
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
