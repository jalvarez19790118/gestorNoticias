import React, {Fragment, useState} from 'react';
import Dropzone from 'react-dropzone-uploader'
import {getDroppedOrSelectedFiles} from 'html5-file-selector';
import 'react-dropzone-uploader/dist/styles.css'
import {Container, ListGroup, ListGroupItem} from 'reactstrap';
import {IconDelete, IconAdd,IconLoad,IconHTML} from '../config/select_config';

const AttacthFiles = ({type, noticia, setNoticia}) => {

    const [lastStatus,
        setLastStatus] = useState('done');


        

    const saveState = (new_noticia) => {

        sessionStorage.setItem(type, JSON.stringify(new_noticia));
        setNoticia(new_noticia);
    }    



    const setHtmlFile = (file) => {

        //  console.log(file);

        let new_noticia = {

            ...noticia
        }

        new_noticia
            .files
            .list
            .push(file);

        saveState(new_noticia);
    }

    const removeHtmlFile = (id) => {

       

        let new_list = noticia
            .files
            .list
            .filter((value) => value.id !== id);

        let new_noticia = {

            ...noticia,
            files: {

                list: new_list
            }

        }

        saveState(new_noticia);
    }

    const NewInput = ({accept, onFiles, files}) => {

        const getFilesFromEvent = e => {
            return new Promise(resolve => {
                getDroppedOrSelectedFiles(e).then(chosenFiles => {
                    resolve(chosenFiles.map(f => f.fileObject))
                })
            })
        }

        const text = files.length > 0
            ? 'Añadir'
            : 'Añadir'
        const last_status = files.length > 0
            ? files[files.length - 1].meta.status
            : 'done';

        return (
            <label
                className="btnaddfiles m-0"
                style={last_status === 'done'
                ? {
                    'opacity': '1'
                }
                : {
                    'opacity': '0.5'
                }}>
                {IconAdd}{text}
                <input
                    style={{
                    display: 'none'
                }}
                    disabled={lastStatus === 'done'
                    ? false
                    : true}
                    type="file"
                    accept={accept}
                    multiple
                    onChange={e => {
                    getFilesFromEvent(e).then(chosenFiles => {
                        onFiles(chosenFiles)
                    })
                }}/>
            </label>
        )
    }

    const NewLayout = ({input, previews}) => {

        const last_file_name = previews.length > 0
            ? previews[previews.length - 1].props.meta.name
            : '';

        const LoadingMsg = () => (
            <Fragment><br/>
                <div className="loadingMsg my-1 p-1">{IconLoad}Subiendo Fichero: {last_file_name}....</div>
            </Fragment>
        );

        return (
            <Fragment>

                <div className="float-right">{input}</div>
                <div>

                    {lastStatus !== 'done'
                        ? <LoadingMsg/>
                        : null}

                </div>
            </Fragment>
        )

    };

    const getUploadParams = ({meta}) => {
        return {url: 'https://httpbin.org/post'}
    }

    const handleChangeStatus = ({
        meta,
        file
    }, status) => {

        if (status === 'done') 
            setTimeout(() => {

                setHtmlFile(meta);
                setLastStatus(status);
            }, 1000);
        else 
            setLastStatus(status);
        }
    
    const handleSubmit = (files, allFiles) => {

        // console.log(data);
        console.log(files.map(f => f.meta))
        // allFiles.forEach(f => f.remove())
    }

    return (
        <Container fuid="true" className="EditorFormPage m-0 mt-1 p-0">
            <div className="m-0 p-1 dropzone">
                <div className="label float-left">Adjuntar ficheros:</div>
                <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    InputComponent={NewInput}
                    LayoutComponent={NewLayout}
                    accept=".html, .pdf, .doc, .xml, image/*"/>

                <div>
                    {noticia.files.list.length >= 1
                        ? <ListGroup className="listGroup m-0 p-0 ">

                                {noticia
                                    .files
                                    .list
                                    .map((val, key) => {
                                        return <ListGroupItem className="m-0 p-1" key={val.id}>
                                            <div className="d-flex">
                                                <div>{IconHTML}{val.name}</div>
                                                <div className="float-right" onClick={e => removeHtmlFile(val.id)}>{IconDelete}</div>
                                            </div>
                                        </ListGroupItem>
                                    })
}

                            </ListGroup>

                        : null}

                </div>
            </div>
        </Container>
    );
}

export default AttacthFiles;