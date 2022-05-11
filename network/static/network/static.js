document.addEventListener('DOMContentLoaded', () => {
        id.forEach(link_func)

        function link_func(value){

          document.getElementById('edit_link_' + value).onclick = function(){
            p_element = document.getElementById('edit_link_' + value + '_p')
            textarea_data = p_element.innerHTML
            document.getElementById('textarea_'+value).innerHTML = textarea_data
            content = document.getElementById('textarea_'+value).innerHTML
            let hide_p =  p_element.style.display = 'none'
            document.getElementById('form_'+value).style.display = 'block'
            form = document.getElementById('form_'+value)
            button = document.getElementById('button_'+value)
            form.action = `/edit/${value}`
            form.addEventListener('submit', (e) => {
            e.preventDefault();
            function getCookie(name){
    let cookieValue=null;

    }


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
                console.log(typeof response)
            })
            .then (data=> {
                console.log(content);
            })

            .catch( error => {
                console.log('Error: ' + error)
            })


          })


        }



//    document.querySelectorAll('[id^="edit_form_"]').forEach(form => {
//        console.log([id^="edit_form_"])
//        form.onsubmit = function (e) {
//            e.preventDefault();
//            this.querySelector('#div_buttons').style.display = "none";
//            var formData = $(this).serialize();
//            let csrftoken = this.querySelector("input[name='csrfmiddlewaretoken']").value;
//            fetch(/edit/${this.dataset.id}, {
//                    method: 'POST',
//                    headers: {
//                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,/;q=0.8',
//                        'Content-Type': 'application/x-www-form-urlencoded',
//                        "X-CSRFToken": csrftoken
//                    },
//                    body: formData
//                })
//                .then(response => response.json())
//                .then(data => {
//
//
//                    console.log(data.result)
//                    this.querySelector('#div_buttons').style.display = "";
//                })
//                let p = document.querySelector('#post_text_' + this.dataset.id);
//            let form1 = document.querySelector('#edit_form_' + this.dataset.id);
//            p.innerHTML  =form1.querySelector('#id_post_edit_text').value  ;
//
//                hideform(form);
//        }
//
//
//    });
//    document.querySelectorAll("[id^='like_']").forEach(a=>{
//        a.onclick= function (e){
//            e.preventDefault
//            fetch(/like/${this.dataset.id})
//            .then(response => response.json())
//            .then(data => {
//                console.log(data.count);
//                document.querySelector('#like_count_'+this.dataset.id).innerHTML=data.count
//                if (data.result==='removed')
//                {
//                    this.classList.remove("bg-dark");
//                    this.classList.add('bg-white');
//            };
//            if (data.result==='added')
//            {
//                this.classList.remove("bg-white");
//                this.classList.add('bg-dark');
//        };
//
//            })
//        }
//    })
//
//    document.querySelectorAll("[id^='edit_link_']").forEach(a => {
//
//        a.onclick = function () {
//            if (last_form != null) {
//                hideform(last_form);
//                        console.log(this)
//            }
//            last_form = this;
//
//            let p = document.querySelector('#post_text_' + this.dataset.id);
//            let form = document.querySelector('#edit_form_' + this.dataset.id);
//            p.style.display = 'none';
//            form.querySelector('#id_post_edit_text').value = p.innerHTML;
//            form.style.display = '';
//
//        };
//
//    });
//
//
//function hideform(element) {
//
//    let p = document.querySelector('#post_text_' + element.dataset.id);
//
//
//    let form = document.querySelector('#edit_form_' + element.dataset.id);
//    p.style.display = '';
//    form.style.display = 'none';
//
};
});