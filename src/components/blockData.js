import taxiBicnes from "../img/bisnes.svg";
import taxiBus from "../img/bus.svg";
import taxiComfort from "../img/comfort.svg";
import taxiStandart from "../img/standart.svg";
import taxiEconomy from "../img/taxi 1.svg";
import taxiUniversal from "../img/universal.svg";

const blockData = [
  {
    imgSrc: taxiEconomy,
    alt: "Економ",
    title: "Економ",
    price: (distance) =>
      distance ? (distance / 1000).toFixed(0) * 8 + 50 : "-",
  },
  {
    imgSrc: taxiStandart,
    alt: "Стандарт",
    title: "Стандарт",
    price: (distance) =>
      distance ? (distance / 1000).toFixed(0) * 9 + 60 : "-",
  },
  {
    imgSrc: taxiUniversal,
    alt: "Універсал",
    title: "Універсал",
    price: (distance) =>
      distance ? (distance / 1000).toFixed(0) * 9 + 70 : "-",
  },
  {
    imgSrc: taxiComfort,
    alt: "Комфорт",
    title: "Комфорт",
    price: (distance) =>
      distance ? (distance / 1000).toFixed(0) * 9 + 80 : "-",
  },
  {
    imgSrc: taxiBicnes,
    alt: "Бізнес",
    title: "Бізнес",
    price: (distance) =>
      distance ? (distance / 1000).toFixed(0) * 11 + 150 : "-",
  },
  {
    imgSrc: taxiBus,
    alt: "Бус",
    title: "Бус",
    price: (distance) =>
      distance ? (distance / 1000).toFixed(0) * 11 + 180 : "-",
  },
];
export default blockData;
