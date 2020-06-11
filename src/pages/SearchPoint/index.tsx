import React, { useEffect, useState } from 'react';
import './styles.css';
import api from '../../services/api';
import { PointModel } from '../../interfaces/Point';
import Header from '../../components/Header';
import Point from '../../components/Point';

const SearchPoint = () => {
  const [points, setPoints] = useState<PointModel[]>([]);

  useEffect(() => {
    api.get<PointModel[]>('points').then((response) => {
      setPoints(response.data);
    });
  }, []);

  return (
    <div id="page-search-point">
      <Header />
      <main>
        <p className="count-points">
          <span>
            <strong>
              {points.length} ponto{points.length > 1 ? 's ' : ' '}
            </strong>
            encontrado{points.length > 1 ? 's' : ''}
          </span>
        </p>
        <div className="grid-points">
          {points.map((point) => (
            <Point point={point} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default SearchPoint;
