import React from 'react'

const SECURITY_CODE = 'paradigma'

function UseReducer({ name }) {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    React.useEffect(() => {

        if (state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    dispatch({
                        type: 'CONFIRM',
                    })
                } else {
                    dispatch({
                        type: 'ERROR',
                    })
                }
            }, 3000)
        }
    }, [state.loading])

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>

                <p>Por favor, escribe el código de seguridad</p>

                {(state.error && !state.loading) && (
                    <p>Error: el código es incorrecto</p>
                )}

                {state.loading && (
                    <p>Cargando ...</p>
                )}

                <input
                    placeholder="Código de seguridad"
                    value={state.value}
                    onChange={(event) => {
                        dispatch({
                            type: 'WRITE',
                            payload: event.target.value
                        })
                    }}
                />
                <button
                    onClick={() => {
                        dispatch({
                            type: 'CHECK',
                        })
                    }}
                >Comprobar</button>
            </div>
        )
    } else if (!state.deleted && state.confirmed) {
        return (
            <React.Fragment>
                <p>¿ Esta seguro ?</p>
                <button
                    onClick={() => {
                        dispatch({
                            type: 'DELETE',
                        })
                    }}
                >
                    Si, Eliminar
                </button>

                <button
                    onClick={() => {
                        dispatch({
                            type: 'RESET',
                        })
                    }}
                >
                    No, volver
                </button>
            </React.Fragment>
        )

    } else {
        return (
            <React.Fragment>
                <p>Eliminado con éxito</p>


                <button
                    onClick={() => {
                        dispatch({
                            type: 'RESET',
                        })
                    }}
                >
                    Resetear, volver atrás
                </button>

            </React.Fragment>
        )
    }
}

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
}

const reducerObject = (state, payload) => ({
    'CONFIRM': {
        ...state,
        loading: false,
        error: false,
        confirmed: true,
    },
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'WRITE': {
        ...state,
        value: payload,
    },
    'CHECK': {
        ...state,
        loading: true,
    },
    'DELETE': {
        ...state,
        deleted: true,
    },
    'RESET': {
        ...state,
        confirmed: false,
        deleted: false,
        error: false,
        value: '',
    }
})

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type]
    } else {
        return state
    }
}


export { UseReducer }
