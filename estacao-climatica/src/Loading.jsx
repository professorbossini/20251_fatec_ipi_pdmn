// rce
import React, { Component } from 'react'

export class Loading extends Component {
  render() {
    return (
        // .d-flex.justify-content-center.align-items-center.border.rounded.p-3
        <div className="d-flex flex-column justify-content-center align-items-center border rounded p-3 w-100">
            <div 
                className='spinner-border text-primary'
                style={{width: '3rem', height: '3rem'}}
                role='status'>
                    <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="mt-3 text-primary">
                {this.props.mensagem} 
            </p>
        </div>

    )
  }
}

Loading.defaultProps = {
    mensagem: 'Carregando...'    
}

export default Loading