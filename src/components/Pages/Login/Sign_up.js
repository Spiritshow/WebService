import React, { useState } from "react";
import "./Sign_up.css";

const Sign_up = () => {

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    var user = new Object();
    user.id = getRandomInt(99);
    user.login = "";
    user.password = "";
    user.isWorker=false;
    user.idClient =getRandomInt(99)

    var client = new Object();
    client.id = user.idClient;
    client.firstName ="";
    client.secondName="";
    client.patronymic="";
    client.phoneNumber="";
    client.linkVK=""
    client.isWorker=false;
    client.description="";
    client.specializations="";
    client.photo = 0;

    client.setPhoto = function(photo) {
        this.photo = photo;
    };
    client.setSpecializations = function(specs) {
        specs.map(spec =>{
            this.specializations = this.specializations + "; " + spec;
        })
    };

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

    //надо пофиксить чекбокс... галочки не работают
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
    const handleChange = (e) => {
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

    const fileUploadHandler = () => {
        if (!selectedFile) {
            console.log("No file selected!");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        // Здесь отправьте formData на сервер, который ожидает longblob

        console.log("File ready for upload:", selectedFile);
    };

    const Sign = () =>{

    }

    const [togglerMaster, setTogglerMaster] = useState(false)

    const Sign_Master = () => {

        return(
            <div>
                <h3>Описание: </h3>
                <textarea onChange={handleChange}></textarea>
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
        )
    }

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

                {togglerMaster &&<Sign_Master/>}

                <button className="CustomButton" onClick={Sign}>Зарегистрировать</button>

            </div>
        </div>
    )
}

export default Sign_up;