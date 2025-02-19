import React from 'react';
import '../App.css';
import Slider from '../components/Slider';

const Home = () => {
  return (
    <div className="home">
        {/*
         <div className='intro'>
            <div className='logo-intro'>
                <img src='https://decostickerstore.com/wp-content/uploads/2024/08/batman-5-1.svg' alt='logo' className='logo-img' />
            </div>
            <div className='intro-titolo'>
                <h1>Lorem Ipsum dolor si amet</h1>
            </div>
            <div className='intro-descrizione'>
                <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum blandit urna at consequat. Nunc euismod metus sit amet pretium varius. </h3>
            </div>
            <div className='bottone-prenota'>
                <button>Prenota</button>
            </div>
        </div>*/}
        <Slider />
    </div>
  );
};

export default Home;