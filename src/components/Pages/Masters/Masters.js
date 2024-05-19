import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useStoreDB } from "../../Store/store";
import Card from "./components/card";
import './components/Masters.css';

function Masters() {
    const store = useStoreDB((state) => state.data)
    const addData = useStoreDB((state) => state.addData)
    const [posts, setPosts] = useState([]);
    const [pos, setPos] = useState('1')

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3001/data');
            addData(response.data)
            setPosts(response.data)
          } catch (error) {
            console.error('Ошибка получения данных:', error);
          }
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        if(pos === '1'){
          const ascendingFilms = [...store].sort((a, b) => a.Quality - b.Quality);
          setPosts(ascendingFilms);
        }else{
          const descendingFilms = [...store].sort((a, b) => b.Quality - a.Quality);

          setPosts(descendingFilms);
        }
      }, [pos]) //[pos, posts]

      const handleChange = (event) =>  {
        event.target.value === '1' ? setPos('1') : setPos('2')
      }

      const List = () =>{
        if(!!posts)
        return(posts.map(post =>(
          <Card store={post}/>)))
        else 
        return(<h4>Загрузка...</h4>)
      }

      console.log(posts)
    return(
        <div className="CustomTextMasters">
          <h2>Здесь вы можете выбрать мастера!</h2>
          <div>
            <select onChange={handleChange}>
              <option value='1'>По возрастанию рейтинга</option>
              <option value='2'>По убыванию рейтинга</option>
            </select>
          </div>
          <List/>
        </div>
    )
}

export default Masters;