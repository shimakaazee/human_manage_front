import React, {useState} from 'react';
import axios from 'axios';
import {message} from "antd";
import {BACK_URL} from "../../constant";

function FileUpload(props) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            axios.post(BACK_URL  + '/upload', formData)
                .then((response) => {
                    props.onUploadSuccess(response.data.data);
                    message.success("上传成功！")
                });
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileSelect}/>
            <button onClick={handleFileUpload}>Upload</button>
        </div>
    );
}

export default FileUpload