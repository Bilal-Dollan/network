document.addEventListener('DOMContentLoaded', () => {
        id.forEach(link_func)

        function link_func(value){
        try{
          document.getElementById('edit_link_' + value).onclick = function(e){
            e.preventDefault()
            document.getElementById('edit_link_' + value).style.display = 'none'
            p_element = document.getElementById('edit_link_' + value + '_p')
            textarea_data = p_element.innerHTML
            textarea = document.getElementById('textarea_'+value)
            textarea.innerHTML = textarea_data
            let hide_p =  p_element.style.display = 'none'
            document.getElementById('form_'+value).style.display = 'block'
            form = document.getElementById('form_'+value)
            button = document.getElementById('button_'+value)
            form.action = `/edit/${value}`

            textarea.addEventListener('input', e => {
                textarea.innerHTML =  e.target.value
            })

            form.addEventListener('submit', (e) => {
            e.preventDefault();

            function getCookie(name){
            let cookieValue=null;
            }

            content = document.getElementById('textarea_'+value).innerHTML


            fetch(`edit/${value}`,{
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                    'Accept': 'application/javascript',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken':csrftoken,
            },
            body: JSON.stringify({'content': content})
            })
            .then (response => {
                console.log(response)
            })
            .catch( error => {
                console.log('Error: ' + error)
            })

            document.getElementById('form_'+value).style.display = 'none'
            document.getElementById('edit_link_' + value).style.display = 'inline-block'
             document.getElementById('edit_link_' + value + '_p').style.display = 'inline-block'
            document.getElementById('edit_link_' + value + '_p').innerHTML =  content
          })
        }}
        catch(error){
        }

         document.getElementById('like_link_' + value).onclick = function(e){
         e.preventDefault()
         console.log('clicked')
           fetch(`likes/counter/${value}`,{
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                    'Accept': 'application/javascript',
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken':csrftoken,
            },
            })
            .then (response => {
                console.log(response)
            })
            .catch( error => {
                console.log('Error: ' + error)
            })



         }

};
});