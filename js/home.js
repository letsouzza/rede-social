'use strict'

const galeria = document.getElementById('galeria')
const fotosMain = document.getElementById('fotos')


async function pesquisarStorys(){
    const url = 'https://back-spider.vercel.app/storys/listarStorys' // url da api 

    const response  = await fetch(url) // fetch -> faz requisições web (conversa com o back)
    const data      = await response.json() // chamar apenas o json
    return data
}

// Função para criar as imgs dentro da DIV 
function criarStorys(link){ // Recebe o link da imagem 
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

async function pesquisarUser(id){
    const url = `https://back-spider.vercel.app/user/pesquisarUser/${id}`

    const response  = await fetch(url) 
    const data      = await response.json() 
    return data
}

function criarPosts(link, user){ 
    // Div que cria o Card
    const card = document.createElement('div')
    card.classList = 'card'

    const divPublicacao = document.createElement('div')
    divPublicacao.classList = 'divPublicacao'

    // Texto de descrição
    const divTextos = document.createElement('div')
    divTextos.className = 'divTextos'

    // Acrescentando o User
    const divUser = document.createElement('div')
    divUser.className = 'divUser'

    const userImg = document.createElement('img')
    userImg.src = user.imagemPerfil
    divUser.appendChild(userImg)

    const username = document.createElement('h3')
    username.textContent = user.nome
    divUser.appendChild(username)
    divTextos.appendChild(divUser)

    // Acrescentando Imagem no Card
    const novaImg = document.createElement('img') 
    novaImg.src = link.imagem
    divPublicacao.appendChild(novaImg)

    const descricao = document.createElement('p')
    descricao.textContent = link.descricao
    divTextos.appendChild(descricao)

    divPublicacao.appendChild(divTextos)
    card.appendChild(divPublicacao)

    fotosMain.appendChild(card)
}

async function preencherFotos(){
    const storys = await pesquisarStorys()
    const fotos = await pesquisarFotos()

    storys.forEach(criarStorys)

    fotos.forEach(async (userPost) => {
        const usuario = await pesquisarUser(userPost.idUsuario)
            console.log(usuario)
            criarPosts(userPost, usuario)   
    })
}


preencherFotos()
