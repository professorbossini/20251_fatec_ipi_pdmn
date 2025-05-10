// rafce
import React from 'react'

const Imagem = ({src, alt, imgStyle}) => {
  // const { src, alt } = props 
  // const src = props.src
  // const alt = props.alt
  return (
    <div className={`${imgStyle} flex justify-content-center`}>
      <img src={src} alt={alt} />
    </div>
  )
}

export default Imagem