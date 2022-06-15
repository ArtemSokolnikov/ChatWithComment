import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Review = ({ index, userName, content, userPhoto, deleteTask, editTask, setTasks, tasks, setIsEditLastElem, isEditLastElem }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isRemove, setIsRemove] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [textAreaName, setTextAreaName] = useState('');
    const [textAreaComment, setTextAreaComment] = useState('');
    const [text, setText] = useState(false);
    let currentIndex = localStorage.getItem('index');

    const handlieClickEdit = () => {
        setIsEdit(false);
        setIsCorrect(true);
        setIsEditLastElem(true);


    }
    const handlieClickRemove = () => {
        setIsRemove(true);
        const lastElem = tasks.length - 1;
        deleteTask(lastElem);
        deleteTask(index);
        if (currentIndex <= 2) {
            console.log('Hello!');
            setIsEdit(false);
            setTextAreaName('');
            setTextAreaComment('');
        } else if (textAreaName === '' || textAreaComment === '') {
            console.log('Hello_2!');
            setIsEdit(false);
        }
        setTasks(prev => [...prev, ['']]);
        setTextAreaName('');
        setTextAreaComment('');
    }

    const handleChangeName = (e) => {
        setTextAreaName(e.target.value);
    }
    const handleChangeComment = (e) => {
        setTextAreaComment(e.target.value);
    }

    const handlieClickAdd = () => {
        const stateStorage = localStorage.getItem(`${textAreaName}`)
        if (textAreaName && textAreaComment && stateStorage) {
            const stateStorageParse = JSON.parse(stateStorage);
            editTask(index, textAreaName, textAreaComment, stateStorageParse);
            setIsEdit(true);
            setTasks(prev => [...prev, ['']]);
            console.log('part_1');
            localStorage.setItem('index', +`${currentIndex}` + 1);
        }
        else if (textAreaName && textAreaComment && !stateStorage) {
            editTask(index, textAreaName, textAreaComment);
            setIsEdit(true);
            setTasks(prev => [...prev, ['']])
            console.log('part_2');
            localStorage.setItem('index', +`${currentIndex}` + 1);
        } else if (textAreaName && textAreaComment && stateStorage && (index === tasks.length - 1)) {
            editTask(index, textAreaName, textAreaComment);
            setIsEdit(false);
            setTasks(prev => [...prev, ['']])
            console.log('part_3');
            localStorage.setItem('index', +`${currentIndex}` + 1);
        } else if (textAreaName && textAreaComment && !stateStorage && (index === tasks.length - 1)) {
            editTask(index, textAreaName, textAreaComment);
            setIsEdit(false);
            setTasks(prev => [...prev, ['']])
            console.log('part_4');
            localStorage.setItem('index', +`${currentIndex}` + 1);
        }
        else {
            alert('Please, fill in all the fields')
        }
    }

    const handlieClickSave = () => {
        const stateStorage = localStorage.getItem(`${textAreaName}`);
        const stateStorageParse = JSON.parse(stateStorage);
        if (textAreaName && textAreaComment && stateStorage && tasks.length <= 1) {
            editTask(index, textAreaName, textAreaComment, stateStorageParse);
            setIsEdit(true);
            setIsRemove(false);
            console.log('part_5');
            setTasks(prev => [...prev, ['']]);
        }
        else if (textAreaName && textAreaComment && !stateStorage && tasks.length <= 1) {
            editTask(index, textAreaName, textAreaComment);
            setIsEdit(true);
            console.log('part_55');
            setTasks(prev => [...prev, ['']]);
        }
        else if (textAreaName && textAreaComment && stateStorage && tasks.length >= 1) {
            editTask(index, textAreaName, textAreaComment, stateStorageParse);
            setIsEdit(true);
            console.log('part_6');
            setTasks(prev => [...prev, ['']]);
        }
        else if (textAreaName && textAreaComment && !stateStorage && tasks.length >= 1) {
            editTask(index, textAreaName, textAreaComment);
            setIsEdit(true);
            console.log('part_66');
            setTasks(prev => [...prev, ['']]);
        }
        else {
            alert('Please, fill in all the fields')
        }
         setIsEditLastElem(false);
    }



    // useEffect(() => {
    //     if ((index === tasks.length - 1&& tasks.length === 1)) {
    //         console.log('part_9');
    //         setIsRemove(false);
    //         setIsEdit(false);
    //     } else if ((index === tasks.length - 1 && tasks.length > 1&&isEditLastElem)) {
    //         console.log('part_99');
    //         setIsRemove(false);
    //         setIsEdit(true);
    //     }
    //     else if ((tasks.length === 1)) {
    //         console.log('part_10');
    //         setIsRemove(false);
    //         setIsEdit(false);
    //         // setTasks(['']);
    //     }
    //     else if (isRemove) {
    //         console.log('part_11');
    //         setIsRemove(false);
    //         setIsEdit(true);
    //     }
    //     setTextAreaName('');
    //     setTextAreaComment('');
    // }, [isRemove, index,setTasks, tasks.length,isEditLastElem])

    const renderNormal = () => {
        return (
            <div
                onMouseOut={() => { setText(false) }}
                onMouseOver={() => { setText(true) }}
                className="box">
                <div className="userProfile">
                    <div>
                        <img
                            src={userPhoto}
                            alt={userName} />
                    </div>
                    <div>
                        <div className="userName">{userName}</div>
                        <div className="commentOfUser">{content}</div>
                    </div>
                </div >
                <div className="btnRemoveEdit">
                    <span>{text ? <button className="btnInCorner" ><EditIcon onClick={handlieClickEdit} sx={{ fontSize: 20, mb: 0.8 }} /></button> : <div></div>}</span>
                    <span>{text ? <button className="btnInCorner" ><DeleteIcon onClick={handlieClickRemove} sx={{ fontSize: 20, mb: 0.8 }} /></button> : <div></div>}</span>
                </div>
            </div>
        );
    }
    const renderEdit = () => {
        return (
            <div className="boxEdit">
                <textarea className="boxText" onChange={handleChangeName} value={textAreaName || ''} placeholder="Your name"></textarea>
                <textarea className="boxText" onChange={handleChangeComment} value={textAreaComment || ''} placeholder="Your comment"></textarea>
                <span>{textAreaName.length === 0 || !isCorrect ? <button onClick={handlieClickAdd} className="btnSuccess"> Add</button> : <button onClick={handlieClickSave} className="btnSuccess"> Save</button>}</span>
                {/* <button onClick={handlieClickAdd} className="btnSuccess"> Add</button>
                <button onClick={handlieClickSave} className="btnSuccess"> Save</button> */}
            </div>
        );
    }
    return isEdit ? renderNormal() : renderEdit()
}

export default Review