import React from 'react';
import { PointProps } from './PointProps';
import './styles.css';
import { urlBase } from '../../services/api';

const Point: React.FC<PointProps> = ({ point }) => {
  return (
    <div id="point-card">
      <img
        src={urlBase + '/uploads/' + point.image}
        alt="Imagem do ponto de coleta"
      />
      <strong className="name">{point.name}</strong>
      <span className="items">
        {point.items.map((item) => item.title).join(', ')}
      </span>
      <span className="address">{`${point.address}, ${point.number}`}</span>
      <span className="address">{`${point.city}, ${point.uf}`}</span>
    </div>
  );
};

export default Point;
