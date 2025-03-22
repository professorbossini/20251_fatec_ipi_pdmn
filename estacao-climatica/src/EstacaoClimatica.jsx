// rce
import React, { Component } from 'react'

export class EstacaoClimatica extends Component {

    state = {
        data: null
    }

    timer = null

    componentDidMount(){
        this.timer = setInterval(() => {
            //não faça assim
            // this.state.data = new Date().toLocaleTimeString()    
            //faça assim
            this.setState({
                data: new Date().toLocaleTimeString()
            })
            console.log('setState foi chamado')

        }, 1000)
        console.log(this.timer)
    }

    componentWillUnmount(){
        clearInterval(this.timer)
    }

    render() {
        return (
            <div className="card w-100">
                <div className="card-body">

                    <div
                        className="d-flex align-items-center border rounded mb-2 p-5"
                        style={{ height: '10rem' }}>
                        <i className={`fas fa-5x fa-${this.props.icone}`}></i>
                        <p className="w-75 ms-3 text-center fs-1">
                            {this.props.estacao}
                        </p>
                    </div>

                    <div>
                        {/* renderização condicional */}
                        <p className="text-center">
                            {
                                this.props.latitude ?
                                    `Coordenadas: ${this.props.latitude},${this.props.longitude}. Data: ${this.state.data}.`
                                    :
                                    this.props.mensagemDeErro ?
                                        `${this.props.mensagemDeErro}`
                                        :
                                        'Clique no botão para saber a sua estação climática'
                            }
                        </p>
                    </div>

                    {/* button.btn.btn-outline-primary.w-100.mt-2{Qual a minha estação?} */}
                    <button
                        onClick={this.props.obterLocalizacao}
                        className="btn btn-outline-primary w-100 mt-2">
                        Qual a minha estação?
                    </button>

                </div>
            </div>
        )
    }
}

export default EstacaoClimatica