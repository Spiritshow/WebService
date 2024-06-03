import React, { useState } from "react";
import axios from 'axios';
import "./AddOffer.css";
import { useNavigate } from "react-router-dom";

const AddOffer = () => {

    const Add = () => {

    }

    const [Header, setHeader] = useState("")
    const hChangeHeader = (e) =>{
        setHeader(e.target.value);
    }

    const [description, setDescription] = useState("");

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const fileSelectedHandler = event => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
            setPreviewUrl(reader.result);
            };
        reader.readAsDataURL(file);
        }
    };

    const [photo, setPhoto] = useState();

    const fileUploadHandler = async () => {
        if (!selectedFile) {
            console.log("No file selected!");
            return;
        }

        const newFileName = encodeURI(selectedFile.name);
        setPhoto(`/uploads/${newFileName}`);

        const formData = new FormData();
        formData.append('file', selectedFile);
        
        const res = await fetch('http://localhost:3001/update', {
            method: 'POST',
            body: formData
        });   
        const data = await res.json();

        console.log(data);
        console.log("File ready for upload:", selectedFile);
    };

    const [specializations, setSpecializations] = useState([])
    const checkMaster = (e) =>{
        let toggle = true

        if(!!specializations) specializations.map(
            specialization => e.target.name === specialization ? 
            toggle = false : {}
        )
        if(toggle) 
        setSpecializations([...specializations, e.target.name]);
        else{
            const index = specializations.findIndex(specialization => specialization === e.target.name);
            specializations.splice(index, 1)
            setSpecializations([...[],...specializations]);
        }
        textSpec();
    }
    const [textSpecializations, setTextSpecializations] = useState("")
    const textSpec = () =>{
        if(!!specializations)specializations.map(
            specialization => setTextSpecializations(textSpecializations+specialization+"; ")
        )
    }

    const [togglerMaster, setTogglerMaster] = useState(false)

    return(
        <div className="CustomBox">
            <h2>Здравствуйте, здесь вы можете создать свой заказ</h2>
            <div className="CustomText">
                <h3>Загаловок: <input type="text" onChange={hChangeHeader}/></h3>

                <h3>Описание: </h3>
                <textarea onChange={handleDescription}></textarea>
                <h3>Специализации:</h3>
                <div>
                    <input type="checkbox" id="painter" name="Маляр" onClick={checkMaster} />
                    <label for="painter">Маляр</label>
                </div>
                <div>
                    <input type="checkbox" id="electrician" name="Электрик" onClick={checkMaster} />
                    <label for="electrician">Электрик</label>
                </div>
                <div>
                    <input type="checkbox" id="plumber" name="Сантехник" onClick={checkMaster} />
                    <label for="plumber">Сантехник</label>
                </div>
                <div>
                    <input type="checkbox" id="installer" name="Монтажник" onClick={checkMaster} />
                    <label for="installer">Мотажник</label>
                </div>
                <div>
                    <input type="checkbox" id="tiler" name="Плиточник" onClick={checkMaster} />
                    <label for="tiler">Плиточник</label>
                </div>
                <div>
                    <input type="checkbox" id="ceilings" name="Натяжные потолки" onClick={checkMaster} />
                    <label for="ceilings">Натежные потолки</label>
                </div>
                <div>
                    <input type="checkbox" id="doors" name="Двери" onClick={checkMaster} />
                    <label for="doors">Двери</label>
                </div>
                <div>
                    <input type="checkbox" id="decoration" name="Отделка стен" onClick={checkMaster} />
                    <label for="decoration">Отделка стен</label>
                </div>
                <div>
                    <input type="file" onChange={fileSelectedHandler} accept="image/*" />
                    {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                    {selectedFile && <button onClick={fileUploadHandler}>Upload</button>}
                </div>

                <button className="CustomButton" onClick={Add}>Подтвердить</button>
            </div>
                {/* end */}

                

        </div>
        
    )
}

export default AddOffer;