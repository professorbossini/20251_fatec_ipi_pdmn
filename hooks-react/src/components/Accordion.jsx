// rafce
import './Accordion.css'
import React, { useState } from 'react'
import { Card } from 'primereact/card'
// desestruturar a coleção de itens no parâmetro da af
const Accordion = ({itens}) => {

  // const [indiceAtivo, setIndiceAtivo] = useState(null) 
  const [indiceAtivo, setIndiceAtivo] = useState(null)
  const itemClicado = (indice) => {
    //atualize a variável indiceAtivo, atribuindo a ela, o valor do indice clicado, causando impacto visual
    setIndiceAtivo(indice)

  }

  const expressaoJSX = itens.map((item, indice) => {
    //escolher entre a palavra down e a palavra em função de o item da vez ter sido o ultimo clicado ou não, usando as variaveis de indice ativo e do indice da vez
    //operador ternario
    const classExibirIcone = indice === indiceAtivo ? 'down' : 'right'
    //escolher entre hidden e a cadeia vazia
    const classExibirConteudo =  indice === indiceAtivo ? '' : 'hidden'
    return (
      <Card id="accordion" key={indice} className='border-1 border-400'>
        <div onClick={() => itemClicado(indice)}>
          <i className={`pi pi-angle-${classExibirIcone}`}></i>
          <h5 className='inline ml-3'>{item.titulo}</h5>
        </div>
        <p className={classExibirConteudo}>
          {item.conteudo}
        </p>
      </Card>
    )
  })
  return (
    <div>
      {
        expressaoJSX
      }
    </div>
  )
}

export default Accordion