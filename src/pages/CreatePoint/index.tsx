import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { CityModel } from '../../interfaces/City';
import { ItemModel } from '../../interfaces/Item';
import { PointModel } from '../../interfaces/Point';
import { UfModel } from '../../interfaces/Uf';
import api, { urlBase } from '../../services/api';
import './styles.css';
import Dropzone from '../../components/Dropzone';

const CreatePoint = () => {
  const [items, setItems] = useState<ItemModel[]>([]);
  const [ufs, setUfs] = useState<UfModel[]>([]);
  const [cities, setCities] = useState<CityModel[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [selectedUf, setSelectedUf] = useState<UfModel>();
  const [selectedCity, setSelectedCity] = useState<CityModel>();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const [formData, setFormData] = useState<PointModel>({
    name: '',
    email: '',
    whatsapp: '',
    items: [],
  });

  const history = useHistory();

  useEffect(() => {
    api.get<ItemModel[]>('items').then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<UfModel[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      )
      .then((response) => {
        console.log(response.data);
        setUfs(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get<CityModel[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf?.sigla}/municipios`
      )
      .then((response) => {
        setCities(response.data);
      });
  }, [selectedUf]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = ufs.find((i) => i.id === +event.target.value);
    setSelectedUf(uf);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = cities.find((i) => i.id === +event.target.value);
    setSelectedCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSelectItem(id: number) {
    const alreadySelected = selectedItems.findIndex((item) => item === id);
    const newItems = [...selectedItems];

    if (alreadySelected >= 0) {
      newItems.splice(alreadySelected, 1);
    } else {
      newItems.push(id);
    }
    setSelectedItems(newItems);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();

    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('whatsapp', formData.whatsapp);
    data.append('uf', selectedUf?.sigla || '');
    data.append('city', selectedCity?.nome || '');
    data.append('address', formData?.address || '');
    data.append('number', formData?.number || '');
    data.append('latitude', String(selectedPosition[0]));
    data.append('longitude', String(selectedPosition[1]));
    data.append('items', selectedItems.join(','));

    if (selectedFile) {
      data.append('image', selectedFile);
    }
    await api.post('points', data);

    history.push('/');
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para o início
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro do <br />
          ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">WhatsApp</label>
              <input
                type="number"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Dropzone onFileUploaded={setSelectedFile} />
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onclick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            {/* Endereço */}
            <div className="field">
              <label htmlFor="endereco">Endereço</label>
              <input
                type="text"
                name="address"
                id="address"
                onChange={handleInputChange}
              />
            </div>
            {/* Número */}
            <div className="field">
              <label htmlFor="numero">Número</label>
              <input
                type="number"
                name="number"
                id="number"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="field-group">
            {/* UF */}
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf" onChange={handleSelectUf}>
                <option value="0">Selecione um estado</option>
                {ufs.map((uf) => (
                  <option
                    key={uf.id}
                    value={uf.id}
                  >{`${uf.nome}/${uf.sigla}`}</option>
                ))}
              </select>
            </div>
            {/* City */}
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city" onChange={handleSelectCity}>
                <option value="0">Selecione um estado</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
        {/* Ítens de coleta */}
        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={selectedItems.includes(item.id) ? 'selected' : ''}
              >
                <img src={urlBase + '/uploads/'+ item.image} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default CreatePoint;
