// rafce
import React from 'react'

const Imagem = ({src, alt}) => {
  // const { src, alt } = props 
  // const src = props.src
  // const alt = props.alt
  return (
    <div>
      <img src={src} alt={alt} />
    </div>
  )
}

export default Imagem