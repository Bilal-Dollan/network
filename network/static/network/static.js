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
        link =  document.getElementById('like_link_' + value)
        link.onclick = function(e){
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
                return response.json()

            })
            .then (data => {
            console.log(data.body)
             if (data.body == 'add like'){
                a = document.getElementById('span_like_counter_' + value)
                like_counter = parseInt(a.innerHTML)
                like_counter = like_counter + 1
                a.innerHTML = like_counter
                icon = document.getElementById('like_icon'+value)
                icon.innerHTML = ''
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart-off" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                   <desc>Download more icon variants from https://tabler-icons.io/i/heart-off</desc>
                                   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                   <path d="M3 3l18 18"></path>
                                   <path d="M19.5 12.572l-1.5 1.428m-2 2l-4 4l-7.5 -7.428m0 0a5 5 0 0 1 -1.288 -5.068a4.976 4.976 0 0 1 1.788 -2.504m3 -1c1.56 .003 3.05 .727 4 2.006a5 5 0 1 1 7.5 6.572"></path>
                                </svg>`

             }
             else {
                a = document.getElementById('span_like_counter_' + value)
                like_counter = parseInt(a.innerHTML)
                like_counter = like_counter - 1
                a.innerHTML = like_counter
                icon = document.getElementById('like_icon' + value)
                icon.innerHTML = ''
                icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <desc>Download more icon variants from https://tabler-icons.io/i/heart-plus</desc>
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M13 19l-1 1l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 0 1 8.003 5.996"></path>
   <path d="M14 16h6"></path>
   <path d="M17 13v6"></path>
</svg>`
             }
            })
            .catch( error => {
                console.log('Error: ' + error)

            })
            .catch( error => {console.log('Error: ' + error)})
         let clicked_post = link.innerHTML



         }

};
});