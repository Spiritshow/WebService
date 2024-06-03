import React, { useState } from "react";
import axios from 'axios';
import "./Sign_up.css";
import { useNavigate } from "react-router-dom";
import { useLoginDB } from "../../Store/store";

const Sign_up = () => {

    const addUser = useLoginDB((state) => state.addUser)
    //const user = useLoginDB((state) => state.user);

    const navigate = useNavigate();
    const SignMaster = async () =>{
        const response = await axios.post('http://localhost:3001/data',{
            id: null,
            firstName: firstName,
            secondName: secondName,
            patronymic: patronymic,
            phoneNumber: number,
            linkVK: linkVK,
            description: description,
            specializations: textSpecializations,
            photo: photo,
            quality: "5",
            login: number,
            password: password,
        });
        
        addUser({id: response.data[0].ID ,user: "Master"})
        const resp = await axios.post('http://localhost:3001/dataMaster',{id: response.data[0].ID});
        navigate(`/Masters/${response.data[0].ID}`, {state: resp.data[0]});
        
    }

    const SignClient = async () => {
        const response = await axios.post('http://localhost:3001/dataClient',{
            id: null,
            firstName: firstName,
            secondName: secondName,
            patronymic: patronymic,
            phoneNumber: number,
            quality: "5",
            login: number,
            password: password,
        });
        
        addUser({id: response.data[0].ID ,user: "Client"})
    } 




    const Sign = () => {
        if(togglerMaster){
            SignMaster();

        }else{
            SignClient()
            navigate('/')
        }
    }

    const [firstName, setFirstName] = useState("")
    const hChangeFirst = (e) =>{
        setFirstName(e.target.value);
    }
    const [secondName, setSecondName] = useState("")
    const hChangeSecond = (e) =>{
        setSecondName(e.target.value);
    }
    const [patronymic, setPatronymic] = useState("")
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
    const [textSpecializations, setTextSpecializations] = useState("")
    const textSpec = () =>{
        if(!!specializations)specializations.map(
            specialization => setTextSpecializations(textSpecializations+specialization+"; ")
        )
    }

    const [number, setNumber] = useState("");
    const hChangePhoneNumber = (e) =>{
        setNumber(e.target.value);
    }
    const [linkVK, setLinkVK] = useState("");
    const hChangeLinkVK = (e) =>{
        setLinkVK(e.target.value);
    }
    const [password, setPassword] = useState("");
    const hChangePassword = (e) =>{
        setPassword(e.target.value);
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

    const [togglerMaster, setTogglerMaster] = useState(false)

    return(
        <div className="CustomBox">
            <h2>Здравствуйте, пожалуйста зарегистрируйтесь, <br/> чтобы добавить своё предложение или резюме</h2>
            <div className="CustomText">
                <h3>Имя: <input type="text" onChange={hChangeFirst}/></h3>
                <h3>Фамилия: <input type="text" onChange={hChangeSecond}/></h3>
                <h3>Отчество: <input type="text" onChange={hChangePatronymic}/></h3>
                
                <h3>Номер телефона: <input type="text" onChange={hChangePhoneNumber}/></h3>
                <h3>Ссылка на ваш ВК: <input type="text" onChange={hChangeLinkVK}/></h3>
                <h3>Придумайте пароль: <input type="text" onChange={hChangePassword}/></h3>
                <div>
                    <input type="checkbox" id="master" name="master" checked={togglerMaster} onChange={() => setTogglerMaster(!togglerMaster)} />
                    <label for="master">Вы мастер по ремеонту?</label>
                </div>

                {/* {togglerMaster && <Sign_Master/>} */}
                {togglerMaster && <div>
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
                </div>}
                {/* end */}

                <button className="CustomButton" onClick={Sign}>Зарегистрировать</button>

            </div>
        </div>
    )
}

export default Sign_up;