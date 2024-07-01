import { useState, FormEvent } from "react"
import logo from "./assets/logo.png"
import "./App.css"

interface InfoProps{
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

export default function App(){
  const [gasolinaInput, setGasolinaInput] = useState(0)
  const [alcoolInput, setAlcoolInput] = useState(0)
  const [info, setInfo] = useState<InfoProps>()

  
  function calcular(event: FormEvent){
    event.preventDefault();

    const calculo = (alcoolInput / gasolinaInput)
    console.log(calculo)
    
    if(calculo <= 0.7){
      setInfo({
        title: "Compensa Usar Álcool",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      })
    } else{
      setInfo({
        title: "Compensa Usar Gasolina",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      })
    }
  }


  function formatarMoeda(valor: number): string {
    const valorFormatado = valor.toLocaleString("pt-br",{
      style: "currency",
      currency: "BRL"
    })
    return valorFormatado
  }

  return(
    <div>
      <main className="container">
        <img src={logo} alt="logo da calculadora da gasolina ou alcool" className="logo"/>

        <h1 className="title">Qual a Melhor Opção</h1>

        <form className="form" onSubmit={calcular}>
          <label>Gasolina (Preço por Litro): </label>
          <input placeholder="4,90"
          type="number"
          className="input"
          min={1}
          step={0.01}
          required
          value={gasolinaInput}
          onChange={(evento=>{
            setGasolinaInput(Number(evento.target.value))
          })}
          />

          <label>Álcool (Preço por Litro): </label>
          <input placeholder="4,90"
          type="number"
          className="input"
          min={1}
          step={0.01}
          required
          value={alcoolInput}
          onChange={(evento=>{
            setAlcoolInput((Number(evento.target.value)))
          })}
          />

          <input type="submit" className="button" value="Calcular"/>
        </form>

        {/* verificacao para mostrar esse campo abaixo so se o objeto info nao estiver vazio */}
        {info && Object.keys(info).length > 0 &&(
          <section className="result">
            <h2 className="result-title">{info.title}</h2>
            <span>Álcool {info.alcool}</span>
            <span>Gasolina {info.gasolina}</span>
          </section>
        )}

      </main>
    </div>
  )
}