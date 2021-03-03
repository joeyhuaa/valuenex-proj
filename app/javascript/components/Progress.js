import React from 'react'
import {AiOutlineCheck} from 'react-icons/ai'

let circleStyle = {
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    border: 'solid gray 1px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
}

let circleCurrStyle = {
    ...circleStyle,
    border: 'solid #008eff 1px',
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

    let views = () => {
        if (currView === 'upload') return ['upload']
        if (currView === 'processer') return ['upload', 'processer']
        if (currView === 'validation') return ['upload', 'processer', 'validation']
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
                }}>
                    <div style={views().includes(view) ? circleCurrStyle : circleStyle}>
                        <AiOutlineCheck 
                            size={25} 
                            color={'white'} 
                            style={views().indexOf(view) < views().length-1 ? null : {display:'none'}} 
                        />
                    </div>
                    <p style={labelStyle}>{viewLabelMap[view]}</p>
                </div>
            )}
        </div>
    )
}