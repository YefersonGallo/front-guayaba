import React, {useState} from 'react';
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

    const changeButton = (option: number) => {
        if (option === 1) {
            setButtons(1)
        } else if (option === 2) {
            setButtons(2)
        }
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
                            <button className="button is-primary" onClick={() => changeButton(1)}>Iniciar</button>
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
            <div className="container" hidden={buttons !== 1}>

            </div>
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
