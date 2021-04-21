import React, {useEffect, useState} from 'react';
import './App.css';
import 'bulma/css/bulma.css';

function App() {
    const [nBoxPerDay, setNBoxPerDay] = useState(14)
    const [muState1, setMuState1] = useState(40);
    const [muState2, setMuState2] = useState(65);
    const [muState3, setMuState3] = useState(25);
    const [muState4, setMuState4] = useState(25);
    const [muState42, setMuState42] = useState(120);
    const [muState5, setMuState5] = useState(50);
    const [days, setDays] = useState(25);
    const [buttons, setButtons] = useState(0);
    const [option1, setOption1] = useState(0);
    const [option2, setOption2] = useState(0);
    const [option3, setOption3] = useState(0);
    const [option4, setOption4] = useState(0);
    const [option5, setOption5] = useState(0);
    const [ping, setPing] = useState();
    const [station, setStation] = useState(0);
    const [modal, setModal] = useState("");
    const [day, setDay] = useState(-1);
    const [button, setButton] = useState(false);
    const [info, setInfo] = useState();
    const [daysRender, setDaysRender] = useState();

    useEffect(() => {
        if (!ping) {
            fetch('https://guayaba-back.herokuapp.com/ping')
                .then(res => res.json())
                .then(res => setPing(res))
            let aux = []
            for (let i = 0; i < days; i++) {
                aux.push(i)
            }
            setDaysRender(aux)
        }
    }, [ping, days])

    const changeButton = (option) => {
        if (option === 1) {
            setButtons(1)
        } else if (option === 2) {
            setButtons(2)
        }
    }

    const send_info = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                nBoxPerDay, muState1, muState2, muState3, muState4, muState42, "sigma": 20, muState5, days
            })
        };
        const response = await fetch('https://guayaba-back.herokuapp.com/init_production', requestOptions)
        const res = await response.json();
        setInfo(res)
        setOption1(res["bocadillos_finish"])
        setOption2(res["guava_used"])
        setOption3(res["guava_fail"])
        setOption4(res["guava_store"])
        setOption5(res["guava_production"])
        console.log(res)
    }

    const onClickButton = (station, day) => {
        setButton(true)
        setModal("is-active")
        setStation(station)
        setDay(day)
    }

    const getTitle = (station) => {
        if (station === 4) {
            return "4 (Corte)"
        } else if (station === 42) {
            return "4 (Empacado)"
        }
        return station
    }

    return (
        <div className="App">
            <nav className="navbar tile is-parent box" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <h1 className="navbar-item title">
                        Fábrica de Bocadillos "El Dulzón"
                    </h1>
                </div>
            </nav>
            <div className="tile is-ancestor">
                <div className="tile is-parent is-vertical">
                    <article className="tile is-child notification is-primary">
                        <p>En la siguiente aplicación se muestra una simulación sobre el proceso de producción del
                            bocadillo, para
                            iniciar el proceso se puede iniciar de manera automática o ingresando nuevos valores para
                            los tiempos de
                            cada estación. </p>
                    </article>
                    <div className="container tile is-parent content is-text is-multiline">
                        <article className="tile is-child notification is-success">
                            <h1 className="subtitle">Los tiempos para la simulación son los siguientes:</h1>
                            <ul>
                                <li>- Cajas de guayaba que llegan al día: {nBoxPerDay} cajas de 20 Kg</li>
                                <li>- Tiempo de recepción, lavado y preparación: {muState1} minutos</li>
                                <li>- Tiempo de despulpado y cocción: {muState2} minutos</li>
                                <li>- Tiempo de punteo y moldeo: {muState3} minutos</li>
                                <li>- Tiempo de corte: {muState4} minutos</li>
                                <li>- Tiempo de empacado: {muState42} minutos</li>
                                <li>- Tiempo de embalado y etiquetado: {muState5} minutos</li>
                                <li>- Días de trabajo: {days} días</li>
                            </ul>
                        </article>
                    </div>
                    <div hidden={buttons !== 0}>
                        <div className="tile is-child buttons">
                            <button className="button is-primary" onClick={() => {
                                send_info()
                                changeButton(1)
                            }}>Iniciar
                            </button>
                            <button className="button is-link" onClick={() => changeButton(2)}>Modificar Tiempos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container" hidden={buttons !== 2}>
                <h1 className="title">Modificar tiempos de producción</h1>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Cajas por día</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" value={nBoxPerDay} onChange={(e) => {
                                    setNBoxPerDay(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Estación 1 (Tiempo de recepción)</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" value={muState1} onChange={(e) => {
                                    setMuState1(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Estación 2 (Tiempo de despulpado y cocción)</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" value={muState2} onChange={(e) => {
                                    setMuState2(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Estación 3 (Tiempo de punteo y moldeo)</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" value={muState3} onChange={(e) => {
                                    setMuState3(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Estación 4 (Tiempo de corte)</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" value={muState4} onChange={(e) => {
                                    setMuState4(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Estación 4 (Tiempo de empacado)</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" value={muState42} onChange={(e) => {
                                    setMuState42(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Estación 5 (Tiempo de embalado y etiquetado)</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" value={muState5} onChange={(e) => {
                                    setMuState5(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Días de trabajo</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" value={days} onChange={(e) => {
                                    setDays(Number(e.target.value.toString().replace(/[^0-9]+/, '')))
                                }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label">
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <button className="button is-primary" onClick={() => {
                                    setButtons(0)
                                }}>
                                    Guardar tiempos
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div hidden={buttons !== 1}>
                {
                    info && <div className="container is-center">
                        <h1 className="title">Resultados</h1>
                        <div className="container tile is-parent content is-text is-multiline">
                            <article className="tile is-child notification is-link">
                                <ol>
                                    <ul>Cajas de bocadillos (Cada caja de 30 unidades)
                                        hechos: {option1}</ul>
                                    <ul>Cajas de guayabas (cada caja de 20 kg) usadas: {option2}</ul>
                                    <ul>Cajas de guayabas dañadas: {option3}</ul>
                                    <ul>Cajas de guayabas en bodega : {option4}</ul>
                                    <ul>Cajas de guayabas en producción: {option5}</ul>
                                </ol>
                            </article>
                        </div>
                        <div className="columns is-multiline">
                            {
                                daysRender.map((i) => {
                                    return (
                                        <div className="column">
                                            <div className="card" key={i}>
                                                <header className="card-header">
                                                    <p className="card-header-title">
                                                        Día {i + 1}
                                                    </p>
                                                </header>
                                                <div className="card-content">
                                                    <div className="container">
                                                        <button className="button is-info"
                                                                onClick={() => onClickButton(1, i)}>Estación
                                                            1
                                                        </button>
                                                        <button className="button is-success"
                                                                onClick={() => onClickButton(2, i)}>Estación
                                                            2
                                                        </button>
                                                        <button className="button is-warning"
                                                                onClick={() => onClickButton(3, i)}>Estación
                                                            3
                                                        </button>
                                                        <button className="button is-danger"
                                                                onClick={() => onClickButton(4, i)}>Estación
                                                            4 (Corte)
                                                        </button>
                                                        <button className="button is-danger"
                                                                onClick={() => onClickButton(42, i)}>Estación
                                                            4 (Empacado)
                                                        </button>
                                                        <button className="button is-link"
                                                                onClick={() => onClickButton(5, i)}>Estación
                                                            5
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <button className="button is-link is-large is-fullwidth"
                                onClick={() => setButtons(0)}>Volver al inicio
                        </button>
                    </div>
                }
            </div>
            {
                button && <div className={`modal ${modal}`}>
                    <div className="modal-background"/>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Estación {getTitle(station)} - día {day + 1}</p>
                            <button className="delete" aria-label="close" onClick={() => {
                                setModal("");
                                setButton(false)
                            }}/>
                        </header>
                        <section className="modal-card-body">
                            <h1 className="title">Los resultados de la estación {getTitle(station)} en el
                                día {day + 1} son:</h1>
                            <h2 className="subtitle">Quedaron esperando {info[`station_${station}_day_${day}`]["station"]} por entrar y
                                entraron {Object.keys(info[`station_${station}_day_${day}`]["info"]).length} a la estación</h2>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th><abbr title="at">Tiempo de llegada</abbr></th>
                                    <th><abbr title="start">Inicio</abbr></th>
                                    <th><abbr title="et">Et</abbr></th>
                                    <th><abbr title="exit">Salida</abbr></th>
                                    <th><abbr title="wt">Tiempo de espera</abbr></th>
                                    <th><abbr title="day">Día de ingreso</abbr></th>
                                    <th><abbr title="mold">Moldeo</abbr></th>
                                    <th><abbr title="cut">Corte</abbr></th>
                                    <th><abbr title="finish_cut">Empacado</abbr></th>
                                </tr>
                                </thead>
                                <tfoot>
                                <tr>
                                    <th><abbr title="at">Tiempo de llegada</abbr></th>
                                    <th><abbr title="start">Inicio</abbr></th>
                                    <th><abbr title="et">Et</abbr></th>
                                    <th><abbr title="exit">Salida</abbr></th>
                                    <th><abbr title="wt">Tiempo de espera</abbr></th>
                                    <th><abbr title="day">Día de ingreso</abbr></th>
                                    <th><abbr title="mold">Moldeo</abbr></th>
                                    <th><abbr title="cut">Corte</abbr></th>
                                    <th><abbr title="finish_cut">Empacado</abbr></th>
                                </tr>
                                </tfoot>
                                <tbody>
                                {
                                    Object.values(info[`station_${station}_day_${day}`]["info"]).map((iter, value) => {
                                        return (
                                            <tr>
                                                <td>{info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["at"]}</td>
                                                <td>{info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["start"]}</td>
                                                <td>{info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["et"]}</td>
                                                <td>{info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["exit"]}</td>
                                                <td>{info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["wt"]}</td>
                                                <td>{info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["day"] !== -1 ? info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["day"] + 1 : info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["day"]}</td>
                                                <td>{info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["dayMold"] !== -1 ? info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["dayMold"] + 1 : info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["dayMold"]}</td>
                                                <td>{info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["dayCut"] !== -1 ? info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["dayCut"] + 1 : info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["dayCut"]}</td>
                                                <td>{info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["dayFinishCut"] !== -1 ? info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["dayFinishCut"] + 1 : info[`station_${station}_day_${day}`]["info"][`station_${station}_day_${day}_${value}`]["dayFinishCut"]}</td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                            *Cuando aparece un valor negativo, es porque aún no llega a la estación del proceso
                        </section>
                    </div>
                    <button className="modal-close is-large" aria-label="close"
                            onClick={() => {
                                setModal("");
                                setButton(false)
                            }}/>
                </div>
            }
            <footer className="footer is-fixed-bottom">
                <div className="content has-text-centered is-fixed-bottom">
                    <p>
                        Simulación por Computador
                        <br/>
                        Escuela de Ingeniería de Sistemas y Computación
                        <br/>
                        Universidad Pedagógica y Tecnológica de Colombia
                        <br/>
                        Tunja
                        <br/>
                        2021
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default App;
