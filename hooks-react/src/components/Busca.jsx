// rafce
import axios from 'axios'
import striptags from 'striptags'
import React, { useEffect, useState } from 'react'
import { Button } from 'primereact/button'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
const Busca = () => {
  const [termoDeBusca, setTermoDeBusca] = useState('React')
  const [resultados, setResultados ] = useState([])

  // useEffect(() => {
  //   console.log("Causando um efeito colateral qualquer...")
  //   //essa é a função de limpeza
  //   return () => {
  //     console.log("Limpando coisas...desalocando recursos...por exemplo,destruindo um timer...")
  //   }
  // })

  useEffect(() => {
    const fazerBusca = async () => {
      const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          format: 'json',
          origin: '*',
          srsearch: termoDeBusca
        }
      })
      //corrigir, alterando aquilo que está sendo atribuído à variável resultados, conforme a estrutura da resposta devolvida pela wikipedia
      setResultados(data.query.search)
    }
    if(termoDeBusca && resultados.length === 0){
      fazerBusca()  
    }
    else{
      const timeoutID = setTimeout(() => {
        if(termoDeBusca)
          fazerBusca()
      }, 1000)
      return () => {
        clearTimeout(timeoutID)
      }
    }
  }, [termoDeBusca])

  return (
    <div>
      <IconField iconPosition='left'>
        <InputIcon className='pi pi-search'/>
        <InputText 
          placeholder='Buscar...'
          onChange={(e) => {setTermoDeBusca(e.target.value)}}
          value={termoDeBusca} />
      </IconField>
      {/* para cada item, produzir um p que exibe seu snippet */}
      {
        resultados.map((resultado) => (
          <div 
            key={resultado.pageid}
            className='my-2 border border-1 border-400'>
              <div
                className='border-bottom border border-1 border-400 p-2 text-center font-bold'>
                  {resultado.title}
                  <span>
                    <Button 
                      icon="pi pi-send"
                      className='ml-3 p-button-rounded p-button-secondary'
                      onClick={() => {
                        window.open(`https://en.wikipedia.org?curid=${resultado.pageid}`)
                      }}/>
                  </span>
              </div>
              <div className='p-2'>
                {/* {striptags(resultado.snippet)} */}
                <span dangerouslySetInnerHTML={{__html: resultado.snippet}}></span>
              </div>
          </div>
        ))
      }
    </div>
  )
}

export default Busca