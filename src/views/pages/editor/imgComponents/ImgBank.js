import React, {useEffect, useState, useContext, Fragment} from 'react';
import {Container, Col, Row} from 'reactstrap';
import {FormContext} from '../../../../context/FormContext';
import Carousel, {Dots} from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import MyIcon from '../../../../vibe/components/SidebarNav/components/MyIcon';

const ImgBank = ({keywords}) => {


    const entries = Object.entries(keywords).length > 0  ? Object.entries(keywords) : [];

    const terms = entries.filter((v,k)=> v[1].length > 1);

  

    return (
        <Container className="EditorFormPage m-0 mt-1 p-0">
            <div className="label m-0 p-1 px-2">Banco de imagenes</div>
            <Row className="m-0 p-0">

                {terms.map((v, k) => <Col xs='12' md='6' className="m-0 p-2"><ImgBankCarrosuel key={k} obj={v}/></Col>)}

            </Row>

        </Container>
    );
}

const ImgBankCarrosuel = ({obj}) => {


   

    const {obtieneImgs} = useContext(FormContext);

    const dataNew = () => {

        obtieneImgs(obj[1]).then((data) => {

            setLoading(true);
            fSetSlide(data);
        });

    }

    useEffect(() => {

        dataNew();

    }, [obj[1]])

  
    const [loading,
        setLoading] = useState(true);

    const [select,
        setSelect] = useState(0);
    const [slides,
        setSlides] = useState([]);
    const [thumbs,
        setThumbs] = useState([]);

    const fSetSlide = (list) => {

        let newSlide = [];
        let newThumb = [];

        try
        {
            list.map((v, k) => {

                newSlide.push(<img src={v.url}/>);
                newThumb.push(<img src={v.thumb}/>);

            })
            setSlides(newSlide);
            setThumbs(newThumb);
          
            setTimeout(() => setLoading(false), 2000);
        } catch (e) {


console.log(e)

setLoading(false)
        }

  

    }

    const ObjCarrusel = (obj[1].length > 0 &&  slides.length > 0
        ? <Fragment>

                <div className="label m-0 p-0 pl-1">{`${obj[0]}:`}</div>
                <div className="label mb-1 p-0 pl-1">
                    <i>{obj[1]}</i>
                </div>
                <div className="carrousel">

                    <Carousel
                        slides={slides}
                        value={select}
                        centered
                        draggable={false}
                        onChange={e => setSelect(e)}
                        slidesPerScroll={1}
                        slidesPerPage={1}/> {slides.length > 1
                        ? <Dots
                                className="d-inline-grid"
                                number={thumbs.length}
                                thumbnails={thumbs}
                                value={select}
                                onChange={e => setSelect(e)}
                                number={slides.length}/>
                        : null}

                </div>
            </Fragment>
        : null);

    return (
        <div>

            {!loading
                ? ObjCarrusel
                : <ImgBankSearching term={obj[1]}/>}

        </div>
    )

}

const ImgBankSearching = ({term}) => {

    const IconLoad = <MyIcon
        item={{
        class: "fa-pulse",
        lib: 'Fa',
        name: 'FaSpinner',
        style: {
            'fontSize' : '35px',
            'color' : '#162c50'
        }
    }}/>;

    return (
        <div className="ImgBankSearching ml-auto mr-auto mt-auto mb-auto p-2 w-100">
            <div className="margin-auto">
            {IconLoad}
            </div>
         
            <div className="text-center mt-1">Buscando imagenes para el termino:
                <i>{term}</i>
            </div>
        </div>
    )

}

export default ImgBank;