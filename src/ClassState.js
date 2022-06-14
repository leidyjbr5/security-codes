import React from 'react'
import { Loading } from './loading'

class ClassState extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            error: false,
            loading: false,
        };
    }

    componentDidUpdate() {
        console.log('actualización')

        if (this.state.loading) {
            setTimeout(() => {
                this.setState({ loading: false})
            }, 3000)
        }
    }
    render() {
        return (
            <div>
                <h2>Eliminar {this.props.name}</h2>

                <p>Por favor, escribe el código de seguridad</p>

                {this.state.error && (
                    <p>Error: el código es incorrecto</p>
                )}
                {this.state.loading && (
                    <Loading />
                )}
                <input placeholder="Código de seguridad"/>
                <button
                    onClick={() => 
                        this.setState({ loading: true })
                    }
                >Comprobar</button>
            </div>
        )
    }
}

export { ClassState }
