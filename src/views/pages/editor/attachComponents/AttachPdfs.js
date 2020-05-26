import React, {Fragment, useState} from 'react';
import Dropzone from 'react-dropzone-uploader'
import {getDroppedOrSelectedFiles} from 'html5-file-selector';
import 'react-dropzone-uploader/dist/styles.css'

import {Container, ListGroup, ListGroupItem} from 'reactstrap';
import {IconDelete, IconAdd,IconLoad,IconPDF} from '../config/select_config';
const AttachPdfs = ({noticia, setNoticia}) => {

    const [lastStatus,
        setLastStatus] = useState('done');

        

        const saveState = (new_noticia) => {

            sessionStorage.setItem('nueva_noticia', JSON.stringify(new_noticia));
            setNoticia(new_noticia);
        }    
    

    const setPdfFile = (file) => {


        let new_noticia = {

            ...noticia
        }

        new_noticia
            .pdfs
            .list
            .push(file);

            saveState(new_noticia);
    }

    const removePdFile = (id) => {

       

        let new_list = noticia
            .pdfs
            .list
            .filter((value) => value.id !== id);

        let new_noticia = {

            ...noticia,
            pdfs: {

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

                setPdfFile(meta);
                setLastStatus(status);
            }, 1000);
        else 
            setLastStatus(status);
        }
    
    const handleSubmit = (files, allFiles) => {

      
        console.log(files.map(f => f.meta))
        
    }

    return (
        <Container fuid="true" className="EditorFormPage m-0 mt-1 p-0">
            <div className="m-0 p-1 dropzone">
                <div className="label float-left">Adjuntar ficheros PDF:</div>
                <Dropzone
                    getUploadParams={getUploadParams}
                    onChangeStatus={handleChangeStatus}
                    InputComponent={NewInput}
                    LayoutComponent={NewLayout}
                    accept=".pdf"/>

                <div>
                    {noticia.pdfs.list.length >= 1
                        ? <ListGroup className="listGroup m-0 p-0 ">

                                {noticia
                                    .pdfs
                                    .list
                                    .map((val, key) => {
                                        return <ListGroupItem className="m-0 p-1" key={val.id}>
                                            <div className="d-flex">
                                                <div>{IconPDF}{val.name}</div>
                                                <div className="float-right" onClick={e => removePdFile(val.id)}>{IconDelete}</div>
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

export default AttachPdfs;