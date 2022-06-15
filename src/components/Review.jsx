import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Review = ({ index, userName, content, userPhoto, deleteTask, editTask, setTasks, tasks, setIsEditLastElem, isUpdate, setIsUpdate, isDisableBtn, setIsDisableBtn }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [textAreaName, setTextAreaName] = useState('');
    const [textAreaComment, setTextAreaComment] = useState('');
    const [text, setText] = useState(false);
    let currentIndex = localStorage.getItem('index');

    const handlieClickEdit = () => {
        setIsDisableBtn(true);
        setIsEdit(false);
        setIsCorrect(true);
        setIsEditLastElem(true);
        setIsUpdate(true);
    }
    const handlieClickRemove = () => {
        deleteTask(index);
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
            localStorage.setItem('index', +`${currentIndex}` + 1);
        }
        else if (textAreaName && textAreaComment && !stateStorage) {
            editTask(index, textAreaName, textAreaComment);
            setIsEdit(true);
            setTasks(prev => [...prev, ['']]);
            localStorage.setItem('index', +`${currentIndex}` + 1);
        } else if (textAreaName && textAreaComment && stateStorage && (index === tasks.length - 1)) {
            editTask(index, textAreaName, textAreaComment);
            setIsEdit(false);
            setTasks(prev => [...prev, ['']]);
            localStorage.setItem('index', +`${currentIndex}` + 1);
        } else if (textAreaName && textAreaComment && !stateStorage && (index === tasks.length - 1)) {
            editTask(index, textAreaName, textAreaComment);
            setIsEdit(false);
            setTasks(prev => [...prev, ['']]);
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
        }
        else if (textAreaName && textAreaComment && !stateStorage && tasks.length <= 1) {
            editTask(index, textAreaName, textAreaComment);
            setIsEdit(true);
        }
        else if (textAreaName && textAreaComment && stateStorage && tasks.length >= 1) {
            editTask(index, textAreaName, textAreaComment, stateStorageParse);
            setIsEdit(true);
        }
        else if (textAreaName && textAreaComment && !stateStorage && tasks.length >= 1) {
            editTask(index, textAreaName, textAreaComment);
            setIsEdit(true);
        }
        else {
            alert('Please, fill in all the fields')
        }
        setIsDisableBtn(false);
        localStorage.setItem('index', +`${currentIndex}` + 1);
        setTasks(prev => [...prev, ['']]);
        setIsEditLastElem(false);
        setIsUpdate(false);
    }

    useEffect(() => {
        if ((index === tasks.length - 1 && !isUpdate)) {
            setIsEdit(false);
            setTextAreaName('');
            setTextAreaComment('');
        }
    }, [tasks.length, isUpdate])

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
                <div className="btnRemoveEdit">{!isDisableBtn ?
                    <span>
                        <span>{text ? <button className="btnInCorner" ><EditIcon onClick={handlieClickEdit} sx={{ fontSize: 20, mb: 0.8 }} /></button> : <div></div>}</span>
                        <span>{text ? <button className="btnInCorner" ><DeleteIcon onClick={handlieClickRemove} sx={{ fontSize: 20, mb: 0.8 }} /></button> : <div></div>}</span>
                    </span>
                    : <span> </span>}
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
            </div>
        );
    }
    return isEdit ? renderNormal() : renderEdit()
}

export default Review