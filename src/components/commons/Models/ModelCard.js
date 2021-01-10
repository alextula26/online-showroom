import React from 'react';
import ModelImage from './ModelImage';
import ModelTitle from './ModelTitle';
import ModelPrice from './ModelPrice';

const ModelCard = ({ model, brand }) => {
  const {
    id, name, image, min_price: minPrice, has_shares: hasShares, has_discounts: hasDiscounts,
  } = model;

  const url = `/catalog/${brand.id}/model/${id}`;

  return (
    <div className="model-list-item-outer">
      <div className="model-list-item">

        <ModelTitle
          hasShares={hasShares}
          hasDiscounts={hasDiscounts}
          url={url}
          name={name}
        />

        <ModelImage
          url={url}
          src={image}
          alt={name}
        />

        <ModelPrice
          minPrice={Number(minPrice)}
          url={url}
        />

      </div>
    </div>
  );
};

export default ModelCard;
