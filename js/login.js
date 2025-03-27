'use strict'

const login = async () => {
    let username = document.getElementById('username').value
    let senha = document.getElementById('senha').value
    let url = "https://back-spider.vercel.app/login"

    if( username            == '' || username            == null || username            == undefined || 
        senha               == '' || senha               == null || senha               == undefined 
    )
    {
        alert('Dados não preenchidos corretamente!')
    }else{
        let data = {
            email: username,
            senha: senha
        }
    
        let options = {
            method: 'Post',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    
        const response = await fetch(url, options)
        console.log(response)
        
        if(response.status == 200){
            window.location.href = "../../home.html"
        }else{
            alert('Dados inválidos')
        }
        
    }
}

document.getElementById('entrar').addEventListener('click', login)
