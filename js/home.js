'use strict'

const galeria = document.getElementById('galeria')
const fotosMain = document.getElementById('fotos')

async function pesquisarStories(){
    const url = 'https://back-spider.vercel.app/storys/listarStorys' // url da api 

    const response  = await fetch(url) // fetch -> faz requisições web (conversa com o back)
    const data      = await response.json() // chamar apenas o json
    return data
}

// Função para criar as imgs dentro da DIV 
function criarStories(link){ // Recebe o link da imagem 
    const novaImg = document.createElement('img') // criando nova imagem 
    novaImg.src = link.imagem// Cria a nova image, com a link da foto do API 

    galeria.appendChild(novaImg)
}

//*********************************Main**********************************************************************

async function pesquisarFotos(){
    const url = 'https://back-spider.vercel.app/publicacoes/listarPublicacoes' 

    const response  = await fetch(url) 
    const data      = await response.json() 
    return data
}

function criarPosts(link){ 
    const divPublicacao = document.createElement('div')
    divPublicacao.classList = 'divPublicacao'

    const card = document.createElement('div')
    card.classList = 'card'

    const novaImg = document.createElement('img') 
    novaImg.src = link.imagem

    const divTextos = document.createElement('div')
    divTextos.classList = 'divTextos'

    const nome = document.createElement('h3')
    nome.textContent = link.idUsuario

    const descricao = document.createElement('p')
    descricao.textContent = link.descricao

    divTextos.appendChild(nome)
    divTextos.appendChild(descricao)

    divPublicacao.appendChild(novaImg)
    divPublicacao.appendChild(divTextos)

    card.appendChild(divPublicacao)

    fotosMain.appendChild(card)
}

//*********************************User**********************************************************************

async function pesquisarUser(id) {
    const url = `https://back-spider.vercel.app/user/pesquisarUser/${id}`

    const response = await fetch(url)
    const data = await response.json()
    return data
}

function criarUser(link) {

}

async function preencherFotos(){
    const storys = await pesquisarStories()
    const fotos = await pesquisarFotos()
    const usuarios = await

    storys.forEach (criarStories)

    fotos.forEach(idUserPost => {
        usuarios.forEach(idUser => {
            if (idUserPost.id == idUser) {
                console.log(user)
                criarUsuario(user)
            }
        })
    })
}


preencherFotos()