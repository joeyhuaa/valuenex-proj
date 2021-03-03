import React from 'react'
import {HiOutlineUpload} from 'react-icons/hi'

export default function Upload({
    file,
    updateState,
}) {
    let handleFileLoad = () => {
        // store file in App state
        let file = document.getElementById('upload').files[0]

        // get array columns for processer
        let fr = new FileReader()
        fr.onload = function(e) {
            let text = e.target.result
            let firstLine = text.split('\n')[0]
            if (file.type === 'text/csv') {
                let cols = firstLine.split(',').map(c => c.trim())
                updateState(file, cols)
            } else if (file.type === 'text/tab-separated-values') {
                let cols = firstLine.split('\t').map(c => c.trim())
                updateState(file, cols)
            }
        }
        fr.readAsText(file)
    }

    return (
        <div>
            <p>Upload your dataset and click next when you finish.</p>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                <HiOutlineUpload size={200} color={'#008eff'} />
                <div style={{paddingLeft:'65px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <input 
                        id='upload'
                        type='file'
                        accept='.csv, .tsv, .txt, .xls, .xlsx'
                        onChange={handleFileLoad}
                        onDrop={e => console.log('dropped')}
                        style={{color:'transparent'}}
                    />
                    <label 
                        for='file'
                        style={{position:'absolute', marginLeft:'60px', fontSize:'14px', textAlign:'left'}}
                    >
                        {file ? file.name : 'No file chosen'}
                    </label>
                </div>
            </div>
        </div>
    )
}