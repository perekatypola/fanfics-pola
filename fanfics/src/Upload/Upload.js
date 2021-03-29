import React, {useEffect} from "react";
import './Upload.css'
import {switchTheme} from "../App";
import classNames from "classnames";
import {useDropzone} from 'react-dropzone';

const {useState} = require("react");
const {useMemo} = require("react");

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

function Upload(props) {
    const [uploadFiles , setFiles] = useState('')
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({accept: 'image/*' , onDrop: acceptedFiles => {
           let reader = new FileReader();
            reader.readAsDataURL(acceptedFiles[0]);
            reader.onloadend = function () {
                setFiles(reader.result)
                console.log(uploadFiles)
                uploadImage(reader.result).then()
            };
        }});

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    const files = acceptedFiles.map(file => (
        <li key={file.name}>
            {file.name} - {file.size} bytes
        </li>
    ));


    const uploadImage = async (encodedImage) => {
        console.log(encodedImage)
        const res = await fetch("https://fanfics-pola.herokuapp.com/upload",  {
            method: 'POST',
            headers:{'Content-Type': 'application/json' , 'Auth' : localStorage.getItem('jwt')},
            body: JSON.stringify({data: encodedImage , name: localStorage.getItem('curUser')})
         })
        const data = await res.json()
        console.log(data)
            // .then((response) => response.text()).then(res => {
        //     console.log(res)
        // })
    }

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
                <div id="modal" onClick={()=> {
                    props.setState("modal")
                }} className={props.active}>
                    <div className="container">
                        <div {...getRootProps({style})}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                        <aside>
                            <h4>Files</h4>
                            <ul>{files}</ul>
                        </aside>
                    </div>
                </div>
    );
}
export default Upload