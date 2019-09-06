import React, { useState, useEffect } from 'react';
import './../App.css';
import { async } from 'q';
import axios from 'axios';

export default function UploadForm(props) {

    const [fileNotUploaded, setFileNotUploaded] = useState(false);
    const [fileName, setFileName] = useState('Name');
    const [formFile, setFormFile] = useState('');

    // normal fetch POST api call for file upload --not using this in here--
    const uploadFileFunc = async () => {
        try {
            alert("ok");
            const resp = await fetch("http://localhost:8383/api/v1/vidToAud", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formFile
            });
            const fileData = await resp.json();
            console.log(fileData);
        } catch (e) {
            // console.log(e)
        }
    }    

    function onChangeHandler(event) {
        // setting file name
        setFileName(event.target.files[0].name);

        //setting the file in formFile in state
        setFormFile(event.target.files[0]);

        setFileNotUploaded(true);
    }

    useEffect(() => {

        //simple get method to chech wether server is working or not
        const fetchData = async () => {
            const response = await fetch("http://localhost:8383/api/v1");
            const data = await response.json();
            console.log(data);
        }
        
    }, []);

    // create FormData object and append our file to it **.appen() first para MUST be the name of you input file
    const axiosFileData = new FormData()
    axiosFileData.append('file_upload', formFile);

    function uploadButtonClick (event) {

        for(var pair of axiosFileData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
         }

         // axios post method for file upload
         axios({
             method: 'post',
             url: 'http://localhost:8383/api/v1/vidToAud',
             data: axiosFileData,
             config: { headers: { 'Content-Type': 'multipart/form-data' } }
         });

        event.preventDefault();

    }
    
    return (
        <div className="container" >
            <div className="row justify-content-md-center">
                <div className="col-md-6">
                    <form onSubmit={uploadButtonClick} encType="multipart/form-data">
                        <div className="form-group">
                            <input onChange={onChangeHandler} type="file" className="custom-file-input" name="file_upload" id="customFile"/>
                            <label className="custom-file-label margin-top-50" htmlFor="customFile">{fileNotUploaded? <p> {fileName} </p>: <p> Choose file</p>}</label>
                        </div>
                        <div className="row margin-top-14 justify-content-md-center">
                            <button type="submit" className="btn btn-info">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}