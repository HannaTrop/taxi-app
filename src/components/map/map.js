import {
  DirectionsRenderer,
  GoogleMap,
  LoadScript,
} from "@react-google-maps/api";

import React, { useEffect, useState } from "react";
import blockData from "../blockData";
import Preloader from "../preloader/preloader";
import "./map.css";

const MapContainer = () => {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [directions, setDirections] = useState(null);
  const [startPlace, setStartPlace] = useState("");
  const [endPlace, setEndPlace] = useState("");
  const [distance, setDistance] = useState(null);
  const [durationText, setDurationText] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(100); // Количество пикселей для прокрутки
  const [activeBlockIndex, setActiveBlockIndex] = useState(-1);
  const selectedCar =
    activeBlockIndex !== -1 ? blockData[activeBlockIndex] : null;

  useEffect(() => {
    if (startPlace && endPlace) {
      handleCalculateRoute();
    }
  }, [startPlace, endPlace]);

  const handleOrderClick = () => {
    if (!directions) {
      alert(
        "Введіть початкову та кінцеву точку, щоб побудувати маршрут на карті."
      );
      return;
    }

    if (activeBlockIndex !== -1) {
      const selectedBlock = blockData[activeBlockIndex];
      const price = selectedBlock.price(distance);
      alert(
        `Ви обрали: ${selectedCar.title}, вартість поїзки буде коштувати ${price} ₴`
      );
    } else {
      alert("Виберіть клас авто перед замовленням");
    }
  };

  const handleBlockClick = (direction) => {
    const blocksContainer = document.querySelector(".blocks");
    if (blocksContainer) {
      if (direction === "right") {
        blocksContainer.scrollLeft += scrollAmount;
      } else if (direction === "left") {
        blocksContainer.scrollLeft -= scrollAmount;
      }
    }
  };
  const handleBlockOnClick = (index) => {
    setActiveBlockIndex(index);
  };
  useEffect(() => {
    // Эмуляция загрузки карты
    setTimeout(() => {
      setMapLoaded(true);
    }, 2000);
  }, []);

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const onMapLoad = (map) => {
    // Получение местоположения пользователя через браузерный API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setUserLocation({ lat: userLat, lng: userLng });

        // Задание начальных координат для карты
        map.setCenter({ lat: userLat, lng: userLng });
      });
    }
  };

  const calculateDirections = (directionsService, start, end) => {
    directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);

          const route = result.routes[0];
          if (route && route.legs.length > 0) {
            const leg = route.legs[0];
            const distanceValue = leg.distance.value; // Получаем числовое значение километража
            const duration = leg.duration.text;
            setDistance(distanceValue);
            setDurationText(duration);
          }
        }
      }
    );
  };

  const center = {
    userLat: 0,
    lng: 0,
  };

  const handleCalculateRoute = () => {
    const directionsService = new window.google.maps.DirectionsService();
    calculateDirections(directionsService, startPlace, endPlace);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCHL7arcwBJJu_Q743jPmwS_j7jpiiu0Fs">
      {mapLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          onLoad={onMapLoad}
          options={{
            disableDefaultUI: true, // Отключаем все элементы управления
            styles: [
              {
                featureType: "all",
                elementType: "labels",
              },
            ],
          }}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      ) : (
        <Preloader /> // Отображение прелоадера, пока карта загружается
      )}
      <div className="search">
        <div>
          <input
            className="input"
            type="text"
            value={startPlace}
            onChange={(e) => setStartPlace(e.target.value)}
            placeholder="Введіть початкову точку"
          />
        </div>
        <div>
          <input
            className="input"
            type="text"
            value={endPlace}
            onChange={(e) => setEndPlace(e.target.value)}
            placeholder="Введіть кінцеву точку"
          />
          <h1 className="time">{durationText}</h1>
        </div>
        <div className="i">
          <div className="blocks">
            {blockData.map((block, index) => (
              <div
                key={index}
                className={`block ${
                  activeBlockIndex === index ? "active" : ""
                }`}
                onClick={() => handleBlockOnClick(index)}
              >
                <img src={block.imgSrc} className="carImg" alt={block.alt} />
                <h3 className="class">{block.title}</h3>
                <h2 className="prise">{block.price(distance)} ₴</h2>
              </div>
            ))}
          </div>
          <div className="buttons">
            <button
              className="scroll-button"
              onClick={() => handleBlockClick("left")}
            >
              Влево
            </button>
            <button
              className="scroll-button"
              onClick={() => handleBlockClick("right")}
            >
              Вправо
            </button>
          </div>
        </div>

        <button className="order" onClick={handleOrderClick}>
          Замовити
        </button>
      </div>
    </LoadScript>
  );
};

export default MapContainer;
