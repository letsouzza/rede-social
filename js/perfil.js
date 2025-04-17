'use strict'

const galeria = document.getElementById('galeria')
const header = document.getElementById('barraCima')
const modal = document.querySelector('dialog')
const divModal = document.getElementById('divModal')


async function pesquisarFotos(){
    const url = `https://back-spider.vercel.app/publicacoes/listarPublicacoes` // url da api 

    const response  = await fetch(url) // fetch -> faz requisições web (conversa com o back)
    const data      = await response.json() // chamar apenas o json
    return data
}

async function pesquisarUser() {
    const url = `https://back-spider.vercel.app/user/listarUsers`

    const response = await fetch(url)
    const data = await response.json()
    return data 
}

// Função para criar as imgs dentro da DIV 
function criarImagem(link){ // Recebe o link da imagem 
    const novaImg = document.createElement('img') // criando nova imagem 
    novaImg.src = link.imagem // Cria a nova image, com a link da foto do API
    novaImg.addEventListener('click', () => mostrarDetales(link))

    galeria.appendChild(novaImg)
}

function mostrarDetales(link){
    modal.showModal()

    const novaImg = document.createElement('img')
    novaImg.src = link.imagem
    divModal.appendChild(novaImg)
    
    const descricao = document.createElement('span')
    descricao.textContent = link.descricao
    divModal.appendChild(descricao)

    const coracao = document.createElement('img')
    coracao.src = 'https://png.pngtree.com/png-vector/20190909/ourmid/pngtree-red-heart-icon-isolated-png-image_1726594.jpg' 
    divModal.appendChild(coracao)

    // const comentario = document.createElement('img')
    // comentario.src = '../src/imgs/comentarios.png'
    // comentario.appendChild(comentario)

    modal.appendChild(divModal)
}

function criarUsuario(link){
    const divUser = document.createElement('div')
    divUser.className = 'divUser'

    const userImg = document.createElement('img')
    userImg.src = link.imagemPerfil
    divUser.appendChild(userImg)

    const username = document.createElement('h3')
    username.textContent = link.nome
    divUser.appendChild(username)

    header.appendChild(divUser)
}

async function preencherTela(){
    const fotos = await pesquisarFotos()
    const usuarios = await pesquisarUser()
    const idUser = localStorage.getItem('idUser')

    fotos.forEach(item => {
        console.log(item);
        console.log(idUser);
        
        
        if(item.idUsuario == idUser){
            criarImagem(item)
        }
    })

    usuarios.forEach(user => {
        if(user.id == idUser){
            console.log(user)
            criarUsuario(user)
        }
    })
}

preencherTela()