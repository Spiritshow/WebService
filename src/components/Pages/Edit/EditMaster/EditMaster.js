import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./EditMaster.css";
import { useLoginDB } from "../../../Store/store";
import { useNavigate } from "react-router-dom";

const EditMaster = () => {
    const [photo, setPhoto] = useState();
    const navigate = useNavigate();
    const Master = useLoginDB((state) => state.user)
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post('http://localhost:3001/dataMaster',{id: Master.id});
            console.log(response.data[0])
            setFirstName(response.data[0].FirstName);
            setSecondName(response.data[0].SecondName);
            setPatronymic(response.data[0].Patronymic);
            setNumber(response.data[0].PhoneNumber);
            setLinkVK(response.data[0].LinkVK);
            setDescription(response.data[0].Description);
            setTextSpecializations(response.data[0].Specialization);
          } catch (error) {
            console.error('Ошибка получения данных:', error);
          }
        };
    
        fetchData();
    }, []);

    const Edit = async () =>{
        //проблема с фотографиями надо пофиксить! !!!)
        const response = await axios.post('http://localhost:3001/EditMaster',{
            id: Master.id,
            firstName: firstName,
            secondName: secondName,
            patronymic: patronymic,
            phoneNumber: number,
            linkVK: linkVK,
            description: description,
            specializations: textSpecializations,
            photo: photo,
            quality: "5"
        });
        console.log(response)



        const resp = await axios.post('http://localhost:3001/dataMaster',{id: Master.id});
        navigate(`/Masters/${Master.id}`, {state: resp.data[0]});
    }

    const Back = () => {
        navigate(-1);
    }

    const [firstName, setFirstName] = useState()
    const hChangeFirst = (e) =>{
        setFirstName(e.target.value);
    }
    const [secondName, setSecondName] = useState()
    const hChangeSecond = (e) =>{
        setSecondName(e.target.value);
    }
    const [patronymic, setPatronymic] = useState()
    const hChangePatronymic = (e) =>{
        setPatronymic(e.target.value);
    }

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
    const [textSpecializations, setTextSpecializations] = useState()
    const textSpec = () =>{
        if(!!specializations)specializations.map(
            specialization => setTextSpecializations(textSpecializations+specialization+"; ")
        )
    }

    const [number, setNumber] = useState();
    const hChangePhoneNumber = (e) =>{
        setNumber(e.target.value);
    }
    const [linkVK, setLinkVK] = useState();
    const hChangeLinkVK = (e) =>{
        setLinkVK(e.target.value);
    }

    const [description, setDescription] = useState();

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

    const fileUploadHandler = async () => {
        if (!selectedFile) {
            console.log("No file selected!");
            return;
        }
        //
        const newFileName = encodeURI(selectedFile.name);
        setPhoto(`/uploads/${newFileName}`)

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

    return(
        <div className="CustomBox">
            <h2>Здравствуйте, пожалуйста зарегистрируйтесь, <br/> чтобы добавить своё предложение или резюме</h2>
            <div className="CustomText">
                <h3>Имя: <input type="text" onChange={hChangeFirst} value={firstName}/></h3>
                <h3>Фамилия: <input type="text" onChange={hChangeSecond} value={secondName}/></h3>
                <h3>Отчество: <input type="text" onChange={hChangePatronymic} value={patronymic}/></h3>
                
                <h3>Номер телефона: <input type="text" onChange={hChangePhoneNumber} value={number}/></h3>
                <h3>Ссылка на ваш ВК: <input type="text" onChange={hChangeLinkVK} value={linkVK}/></h3>

                <div>
                <h3>Описание: </h3>
                <textarea onChange={handleDescription}>{description}</textarea>
                    <h3>Специализации:</h3>
                    <div>
                        <input type="checkbox" id="painter" name="painter" onClick={checkMaster} />
                        <label for="painter">Маляр</label>
                    </div>
                    <div>
                        <input type="checkbox" id="electrician" name="electrician" onClick={checkMaster} />
                        <label for="electrician">Электрик</label>
                    </div>
                    <div>
                        <input type="checkbox" id="plumber" name="plumber" onClick={checkMaster} />
                        <label for="plumber">Сантехник</label>
                    </div>
                    <div>
                        <input type="checkbox" id="installer" name="installer" onClick={checkMaster} />
                        <label for="installer">Мотажник</label>
                    </div>
                    <div>
                        <input type="checkbox" id="tiler" name="tiler" onClick={checkMaster} />
                        <label for="tiler">Плиточник</label>
                    </div>
                    <div>
                        <input type="checkbox" id="ceilings" name="ceilings" onClick={checkMaster} />
                        <label for="ceilings">Натежные потолки</label>
                    </div>
                    <div>
                        <input type="checkbox" id="doors" name="doors" onClick={checkMaster} />
                        <label for="doors">Двери</label>
                    </div>
                    <div>
                        <input type="checkbox" id="decoration" name="decoration" onClick={checkMaster} />
                        <label for="decoration">Отделка стен</label>
                    </div>
                    <div>
                        <input type="file" onChange={fileSelectedHandler} accept="image/*" />
                        {previewUrl && <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                        {selectedFile && <button onClick={fileUploadHandler}>Upload</button>}
                    </div>
                </div>

                <button className="CustomButton" onClick={Edit}>Подтвердить</button>
                <button className="Custom__" onClick={Back}>Назад</button>
            </div>
        </div>
    )
}

export default EditMaster;