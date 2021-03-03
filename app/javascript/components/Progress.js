import React from 'react'

let circleStyle = {
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    border: 'solid gray 1px',
}

let circleCurrStyle = {
    ...circleStyle,
    backgroundColor: '#008eff'
}

let labelStyle = {
    fontSize: '10px'
}

export default function Progress({
    currView, 
}) {
    let viewLabelMap = {
        'upload': 'Upload Dataset',
        'processer': 'Adjust Settings',
        'validation': 'Confirm Details'
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100px',
            borderBottom: 'solid #dadada 2px'
        }}>
            <h1 style={{width:'300px'}}>{viewLabelMap[currView]}</h1>
            {Object.keys(viewLabelMap).map(view =>
                <div key={view} style={{
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    flexDirection:'column',
                    paddingTop:'20px'
                }}>
                    <div style={currView === view ? circleCurrStyle : circleStyle} />
                    <p style={labelStyle}>{viewLabelMap[view]}</p>
                </div>
            )}
        </div>
    )
}