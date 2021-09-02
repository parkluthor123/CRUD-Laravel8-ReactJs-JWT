import React from 'react'

export default ()=>{
    const textStyle={
        color: "#fff",
        textTransform: "uppercase",
    }
    return(
        <header>
            <nav style={{backgroundColor: "#000",}} className="navbar navbar-inverse">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">
                            <h1 style={textStyle}>{"Crud</>"}</h1>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}