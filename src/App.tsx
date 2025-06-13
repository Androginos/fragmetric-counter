import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #1a1a1a; /* Daha koyu ve düz bir arka plan */
  color: #e0e0e0; /* Açık gri metin rengi */
  font-family: 'Montserrat', sans-serif; /* Modern bir font */
  padding: 2rem;
  box-sizing: border-box;

  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');
`;

const LogoImage = styled.img`
  max-width: 350px; /* Logoyu biraz büyüt */
  margin-bottom: 3rem; /* Logodan sonraki boşluğu artır */
  filter: drop-shadow(0 0 15px rgba(0, 255, 127, 0.7)); /* Neon yeşili gölge */
`;

const Title = styled.h1`
  font-size: 3.5rem; /* Daha büyük başlık */
  margin-bottom: 2.5rem;
  text-align: center;
  color: #00ff7f; /* Neon yeşili başlık */
  text-shadow: 0 0 10px rgba(0, 255, 127, 0.5); /* Başlığa gölge */
  letter-spacing: 2px; /* Harfler arasına boşluk */
`;

const CountdownContainer = styled.div`
  display: flex;
  gap: 2.5rem; /* Birimler arasındaki boşluğu artır */
  margin-bottom: 3rem;
  flex-wrap: wrap; /* Küçük ekranlar için kaydırma */
  justify-content: center;
`;

const TimeUnit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(40, 40, 40, 0.7); /* Daha koyu şeffaf kutu */
  padding: 1.5rem 3rem;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 255, 127, 0.3); /* Parlak kutu gölgesi */
  border: 1px solid rgba(0, 255, 127, 0.5); /* İnce neon yeşili çerçeve */
  transition: transform 0.3s ease-in-out; /* Hover efekti */

  &:hover {
    transform: translateY(-5px); /* Üzerine gelindiğinde hafifçe yüksel */
  }
`;

const TimeValue = styled.div`
  font-size: 4.5rem; /* Daha büyük rakamlar */
  font-weight: bold;
  color: #00ff7f; /* Neon yeşili rakamlar */
  text-shadow: 0 0 8px rgba(0, 255, 127, 0.8);
  min-width: 120px;
  text-align: center;
`;

const TimeLabel = styled.div`
  font-size: 1.2rem; /* Daha büyük etiketler */
  margin-top: 1rem;
  color: #a0a0a0; /* Açık gri etiket rengi */
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const LocalTime = styled.div`
  font-size: 1.4rem;
  color: #b0b0b0;
  margin-top: 2rem;
  text-align: center;
`;

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetDate = new Date();
      
      // Set target time to UTC 17:43
      targetDate.setUTCHours(17, 43, 0, 0);
      
      // If target time has passed, set to next day
      if (now > targetDate) {
        targetDate.setUTCDate(targetDate.getUTCDate() + 1);
      }

      const difference = targetDate.getTime() - now.getTime();
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Container>
      <LogoImage src="/Screenshot 2025-06-13 at 10.47.32.png" alt="Fragmetric Logo" />
      <Title>You know what's coming in</Title>
      <CountdownContainer>
        <TimeUnit>
          <TimeValue>{timeLeft.days}</TimeValue>
          <TimeLabel>Days</TimeLabel>
        </TimeUnit>
        <TimeUnit>
          <TimeValue>{timeLeft.hours}</TimeValue>
          <TimeLabel>Hours</TimeLabel>
        </TimeUnit>
        <TimeUnit>
          <TimeValue>{timeLeft.minutes}</TimeValue>
          <TimeLabel>Minutes</TimeLabel>
        </TimeUnit>
        <TimeUnit>
          <TimeValue>{timeLeft.seconds}</TimeValue>
          <TimeLabel>Seconds</TimeLabel>
        </TimeUnit>
      </CountdownContainer>
      <LocalTime>
        Local Time: {new Date().toLocaleTimeString()}
      </LocalTime>
    </Container>
  );
}

export default App; 