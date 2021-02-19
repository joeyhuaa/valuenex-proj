import React, {useRef} from 'react'
const papa = require('papaparse')

export default function Upload({
    retrieveData
}) {

    const ref = useRef()

    let handleOpenDialog = e => {
        if (ref.current) ref.current.open(e)
    }

    let handleFileLoad = () => {
        // data format
        // array of objs
        // data[0] holds column names
        // everything after that is the actual data

        let file =  document.getElementById('upload').files[0]
        console.log(file.type)

        // if csv use papaparse
        if (file.type === 'text/csv') {
            papa.parse(file, {
                complete: results => retrieveData(results)
            })
        } else if (file.type === 'text/tab-separated-values') {
            // if tsv then read using filereader
            let fr = new FileReader()
            let data = []
            fr.onload = function(e) {
                let text = e.target.result
                let firstLine = text.split('\n')[0]
                let nCols = firstLine.length
                let delimited = text.split('\t')

                // last column always has \n so break it off
                for (let i = nCols - 1; i < delimited.length; i += nCols + 1) {
                    // console.log(delimited[i])
                    // let lastCol = delimited[i].split('\n') 
                    // console.log(lastCol)
                    // delimited.splice(i, 1, lastCol[0])
                    // delimited.splice(i+1, 0, lastCol[1])
                }
                // console.log(delimited)
                for (let i = 0; i < delimited.length; i != nCols) {
                    data.push(delimited.slice(i, i + nCols))
                }
            }
            fr.readAsText(file)
            // console.log(data)
            // retrieveData(data)
        }
    }

    let handleRemoveFile= e => {
        if (ref.current) ref.current.removeFile(e)
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
                {/* <CSVReader 
                    ref={ref}
                    onFileLoad={handleFileLoad}
                    onRemoveFile={handleRemoveFile}
                >
                    {({ file }) => (
                        <aside
                            style={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginBottom: 10
                            }}
                        >
                            <button
                            type='button'
                            onClick={handleOpenDialog}
                            style={{
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                width: '40%',
                                paddingLeft: 0,
                                paddingRight: 0
                            }}
                            >
                                Browse file
                            </button>
                            <div
                            style={{
                                borderWidth: 1,
                                borderStyle: 'solid',
                                borderColor: '#ccc',
                                height: 45,
                                lineHeight: 2.5,
                                marginTop: 5,
                                marginBottom: 5,
                                paddingLeft: 13,
                                paddingTop: 3,
                                width: '60%'
                            }}
                            >
                            {file && file.name}
                            </div>
                            <button
                            style={{
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                paddingLeft: 20,
                                paddingRight: 20
                            }}
                                onClick={handleRemoveFile}
                            >
                                Remove
                            </button>
                        </aside>
                    )}
                </CSVReader> */}
            </div>
        </div>
    )
}