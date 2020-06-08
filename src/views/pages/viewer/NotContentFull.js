import React, { Fragment } from 'react';

import { Card, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import { Html5Entities } from 'html-entities';

const NotContentFull = ({ item }) => {
  let format_data = '';
  if (item.fields.fh_public != null) {
    const d = new Date(item.fields.fh_public);

    const dtf = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(d);

    format_data = `${da}-${mo}-${ye}`;
  }

  const comp_descr =
    item.fields.contenido_html != null ? (
      <div dangerouslySetInnerHTML={{ __html: item.fields.contenido_html }} />
    ) : (
      <div />
    );
  const comp_entradilla =
    item.fields.entradilla != null ? <div dangerouslySetInnerHTML={{ __html: item.fields.entradilla }} /> : <div />;

  const comp_titular =
    item.fields.titular != null ? <div dangerouslySetInnerHTML={{ __html: item.fields.titular }} /> : <div />;

  return (
    <Card className="NotContentFull m-0 p-0">
      <CardBody>
        <CardTitle className="m-0 p-0">{comp_titular}</CardTitle>

        <CardSubtitle className="mt-2 d-flex">
          <label className="mr-1">VADEMECUM</label>
          <label>{format_data}</label>
        </CardSubtitle>

        <CardText className="mt-2">
          {comp_entradilla}
          {comp_descr}
        </CardText>
      </CardBody>
    </Card>
  );
};

export default NotContentFull;
