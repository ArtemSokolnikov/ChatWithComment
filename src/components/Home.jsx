import React, { useEffect, useState } from 'react';
import Review from './Review';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditLastElem, setIsEditLastElem] = useState(false);
  console.log(tasks);
  const elem = Math.trunc(Math.random() * 100);
  const baseUrl = `https://randomuser.me/api/portraits/women/${elem}.jpg`;
  const [photo, setPhoto] = useState(baseUrl);
  const imgGen = require('@dudadev/random-img');
  let currentIndex = localStorage.getItem('index');

  const removeTask = (index) => {
    setTasks(prev => prev.filter((t, i) => i !== index));
    if (tasks.length > 0) {
      localStorage.setItem('index', +`${currentIndex}` - 1);
    }
  }

  const changeTask = (index, userName, content, double) => {
    if (!double && localStorage.length < 1) {
      console.log('1 part');
      imgGen().then(avatarUrl => setPhoto(avatarUrl));
      setTasks(prev => {
        const tasks = [...prev];
        tasks[index] = [userName, content, photo];
        localStorage.setItem(`${userName}`, JSON.stringify(photo));
        return tasks;
      })
    } else if (!double && localStorage.length >= 1) {
      console.log('2 part');
      imgGen().then(avatarUrl => setPhoto(avatarUrl));
      setTasks(prev => {
        const tasks = [...prev];
        tasks[index] = [userName, content, photo];
        localStorage.setItem(`${userName}`, JSON.stringify(photo));
        return tasks;
      })
    } else if (double && localStorage.length < 1) {
      console.log('3 part');
      setTasks(prev => {
        const tasks = [...prev];
        tasks[index] = [userName, content, photo];
        return tasks;
      })
    } else if (double && localStorage.length >= 1) {
      console.log('4 part');
      imgGen().then(avatarUrl => setPhoto(avatarUrl));
      setTasks(prev => {
        const tasks = [...prev];
        tasks[index] = [userName, content, double];
        return tasks;
      })
      // if (tasks.length <= 1) {
      //   setTasks(prev => {
      //     const tasks = [...prev];
      //     tasks[index] = [userName, content, double];
      //     return tasks;
      //   }) 
      // }else{
      //   setTasks(prev => {
      //     const tasks = [...prev].pop();
      //     tasks[index] = [userName, content, double];
      //     return tasks;
      //   }) 
      // }

    }
  }

  // const handlieClickAddTask = () => {
  //   setTasks(prev => [...prev, ['']])
  // }

  useEffect(() => {
    const lastElem = tasks.length - 1;
    if (tasks.length < 1) {
      setTasks(['']);
    }
    if (isEditLastElem) {
      removeTask(lastElem);
      // setIsEditLastElem(false);
    }
    if (!isEditLastElem && tasks.length === 2) {
      setTasks(prev => [...prev, ['']]);
      console.log('HI');
    }

  }, [isEditLastElem])

  return (
    <div className='field'>
      <h1 className='field-title'>Reviews</h1>
      {/* <button onClick={handlieClickAddTask} className="btnNew">Add comment</button> */}
      {tasks.map((item, index) => (
        <Review
          key={index + 1}
          index={index}
          userName={item[0]}
          content={item[1]}
          userPhoto={item[2]}
          deleteTask={removeTask}
          editTask={changeTask}
          setTasks={setTasks}
          tasks={tasks}
          isEditLastElem={isEditLastElem}
          setIsEditLastElem={setIsEditLastElem}
        />
      ))}
    </div>
  )
}

export default Home