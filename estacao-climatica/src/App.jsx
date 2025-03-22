// rafce
import React from 'react'
import EstacaoClimatica from './EstacaoClimatica'
import Loading from './Loading'

class App extends React.Component {

  // constructor(props){
  //   super(props)
  //   this.state = {
  //     latitude: null,
  //     longitude: null,
  //     estacao: null,
  //     data: null,
  //     icone: null,
  //     mensagemDeErro: null
  //   }
  //   console.log('constructor')
  // }
  state = {
    latitude: null,
    longitude: null,
    estacao: null,
    data: null,
    icone: null,
    mensagemDeErro: null
  }

  componentDidMount(){
    console.log('componentDidMount')
    this.obterLocalizacao()
  }

  componentDidUpdate(){
    console.log('componentDidUpdate')
  }

  componentWillUnmount(){
    console.log('componentWillUnmount')
  }

  obterEstacao = (data, latitude) => {
    const anoAtual = data.getFullYear()
    //21/06 (contagem do mês começa do zero)
    const d1 = new Date(anoAtual, 5, 21)
    //24/09
    const d2 = new Date(anoAtual, 8, 24)
    //22/12
    const d3 = new Date(anoAtual, 11, 22)
    //21/03
    const d4 = new Date(anoAtual, 2, 21)
    const estaNoSul = latitude < 0
    if(data >= d1 && data < d2)
      return estaNoSul ? 'Inverno' : 'Verão'
    if(data >= d2 && data < d3)
      return estaNoSul ? 'Primavera' : 'Outono'
    if(data >= d3 || data < d4)
      return estaNoSul ? 'Verão' : 'Inverno'
    return estaNoSul ? 'Outono' : 'Primavera'
  }

  icones = {
    'Primavera': 'flower',
    'Verão': 'umbrella-beach',
    'Outono': 'leaf',
    'Inverno': 'snowflake'
  }

  obterLocalizacao = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const data = new Date()
        const estacao = this.obterEstacao(data, position.coords.latitude)
        const icone = this.icones[estacao]
        //errado, atualiza a variável mas não atualiza a tela
        //this.state.latitude = position.coords.latitude
        //certo, pois atualiza a tela também
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          estacao: estacao,
          data: data.toLocaleTimeString(),
          icone: icone
        })
      }, 
      error => {
        this.setState({
          mensagemDeErro: 'Tente novamente mais tarde'
        })  
      }
    )
  }


  
  render(){
    console.log('render')
    return (
      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-sm-12 col-md-8 col-xxl-6">
            <div
              className='d-flex align-items-center vh-100'>
              {
                (!this.state.latitude && !this.state.mensagemDeErro) ?
                  <Loading 
                    mensagem="Por favor, responda à solicitação de localização"/>  
                :
              
                  this.state.mensagemDeErro ?
                    // p.border.rounded.p-2.fs-1.text-center
                    <p className="border rounded p-2 fs-1 text-center w-100">
                      É preciso permitir acesso à localização para que seja possível mostrar a sua estação climática.
                    </p>
                  :
                    <EstacaoClimatica 
                      icone={this.state.icone}
                      estacao={this.state.estacao}
                      latitude={this.state.latitude}
                      longitude={this.state.longitude}
                      data={this.state.data}
                      mensagemDeErro={this.state.mensagemDeErro}
                      obterLocalizacao={this.obterLocalizacao}/>  
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App