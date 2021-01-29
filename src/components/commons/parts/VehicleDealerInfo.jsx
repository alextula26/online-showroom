import React from 'react';

const VehicleDealerInfo = ({ dealership }) => (
  <div className="dealer-info-block" itemScope itemType="http://schema.org/Organization">
    <div className="dealer-info-block--name">
      <span itemProp="name">{dealership.name}</span>
    </div>
    <span className="sr-only">Контакты:</span>
    <div className="dealer-info-block--adress" itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
      <span className="sr-only">Адрес:</span>
      <span className="dealer-info-block--adress--street" itemProp="streetAddress">
        {dealership.address}
      </span>
      <span className="dealer-info-block--postal" itemProp="postalCode" />
      <span className="dealer-info-block--adress--city" itemProp="addressLocality">
        Выборг
      </span>,
    </div>
    <div className="dealer-info-block--email">
      <span className="sr-only">Электронная почта:</span>
      <span itemProp="email">{dealership.email}</span>,<br />
    </div>
    <div className="dealer-info-block--phone">
      <span className="dealer-info-block--phone--icon">
        <span className="svg--icon svg--phone" data-grunticon-embed />
        <span className="sr-only">Телефон: </span>
      </span>
      <a className="dealer-info-block--phone--value" href={`${dealership.phone}`} itemProp="telephone">
        {dealership.phone}
      </a>
    </div>
  </div>
);

export default VehicleDealerInfo;
