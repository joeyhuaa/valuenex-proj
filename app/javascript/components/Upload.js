import React, {useRef} from 'react'
const papa = require('papaparse')

export default function Upload({
    retrieveFile,
    retrieveCols
}) {
    let handleFileLoad = () => {
        // store file in App state
        let file = document.getElementById('upload').files[0]
        retrieveFile(file)

        // get array columns for processer
        let fr = new FileReader()
        fr.onload = function(e) {
            let text = e.target.result
            let firstLine = text.split('\n')[0]
            if (file.type === 'text/csv') {
                let cols = firstLine.split(',').map(c => c.trim())
                retrieveCols(cols)
            } else if (file.type === 'text/tab-separated-values') {
                let cols = firstLine.split('\t').map(c => c.trim())
                retrieveCols(cols)
            }
        }
        fr.readAsText(file)
    }

    return (
        <div style={{height:'75%'}}>
            <h3>Upload your dataset and click next when you finish.</h3>
            <div>
                <input 
                    id='upload'
                    type='file'
                    accept='.csv, .tsv, .txt, .xls, .xlsx'
                    onChange={handleFileLoad}
                />
            </div>
        </div>
    )
}