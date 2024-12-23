import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import * as S from './styled';

const ACTIVE_THICKNESS = 85;
const DISABLED_THICKNESS = 78;
const ANIMATION_DURATION = 500;

export const CustomProgressChart = ({ percentage = 64.5 }) => {
  const [isAnimated, setIsAnimated] = useState(true);
  const [isBlueActive, setBlueActive] = useState(true);
  const [isOrangeActive, setOrangeActive] = useState(true);

  useEffect(() => {
    // Disable animation after the first render
    const timeout = setTimeout(() => setIsAnimated(false), 1000); // Adjust the delay as needed
    return () => clearTimeout(timeout);
  }, []);

  const handleBlueClick = (event: React.MouseEvent) => {
    if (event.shiftKey) {
      return handleOutsideClick();
    }

    if (!isBlueActive) {
      setBlueActive(!isBlueActive);
    }
    setOrangeActive(!isOrangeActive);
  };

  const handleOrangeClick = (event: React.MouseEvent) => {
    if (event.shiftKey) {
      return handleOutsideClick();
    }

    if (!isOrangeActive) {
      setOrangeActive(!isOrangeActive);
    }
    setBlueActive(!isBlueActive);
  };

  const handleOutsideClick = () => {
    setOrangeActive(true);
    setBlueActive(true);
  };

  const renderDefs = () => (
    <defs>
      <pattern
        id='diagonalStripes'
        patternUnits='userSpaceOnUse'
        width='4'
        height='4'
        patternTransform='rotate(40)'
      >
        <line
          x1='0'
          y1='0'
          x2='0'
          y2='4'
          stroke='rgba(255, 255, 255, 0.5)'
          strokeWidth='2'
        />
      </pattern>

      <radialGradient
        id='blueGradient'
        cx='50%'
        cy='50%'
        r='100%'
        fx='50%'
        fy='50%'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='10%' stopColor='#0D3B7F' />
        <stop offset='50%' stopColor='#176AE5' />
      </radialGradient>

      <radialGradient
        id='orangeGradient'
        cx='50%'
        cy='50%'
        r='100%'
        fx='50%'
        fy='50%'
        gradientUnits='userSpaceOnUse'
      >
        <stop offset='0%' stopColor='#E51793' />
        <stop offset='45%' stopColor='#EA5400' />
      </radialGradient>

      <pattern id='compositePattern' width='100%' height='100%'>
        <rect width='100%' height='100%' fill='url(#orangeGradient)' />
        <rect
          width='100%'
          height='100%'
          fill='url(#diagonalStripes)'
          fillOpacity='1'
        />
      </pattern>

      <filter
        id='dropShadowFilterOrange'
        x='-50%'
        y='-50%'
        width='200%'
        height='200%'
      >
        <feDropShadow
          dx='0'
          dy='0'
          stdDeviation='6'
          floodColor='rgba(234, 84, 0, 0.4)'
        />
        <feDropShadow
          dx='0'
          dy='0'
          stdDeviation='10'
          floodColor='rgba(234, 84, 0, 0.2)'
        />
      </filter>

      {/* <filter
        id='dropShadowFilterBlue'
        x='-50%'
        y='-50%'
        width='200%'
        height='200%'
      >
        <feDropShadow
          dx='0'
          dy='0'
          stdDeviation='6'
          floodColor='rgba(23, 106, 229, 0.3)'
        />
        <feDropShadow
          dx='0'
          dy='0'
          stdDeviation='10'
          floodColor='rgba(23, 106, 229, 0.2)'
        />
      </filter> */}
      <filter id='dropShadowFilterBlue'>
        <feDropShadow
          dx='0'
          dy='0'
          stdDeviation='8'
          floodColor='rgba(23, 106, 229, 0.7)'
        />
      </filter>
    </defs>
  );

  // Data for the blue segment (thicker)
  const blueData = [
    { value: 100 - percentage }, // Empty space for orange part
    {
      value: percentage,
    }, // Blue part
  ];

  // Data for the orange segment (thinner)
  const orangeData = [
    { value: 100 - percentage }, // Orange part
    { value: percentage }, // Empty space for blue part
  ];

  const backgroundData = [{ value: 100 }];

  return (
    <S.Wrapper>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          {renderDefs()}
          <Pie
            data={backgroundData}
            cx='50%'
            cy='50%'
            innerRadius={60}
            outerRadius={85}
            startAngle={90}
            endAngle={-270}
            dataKey='value'
            isAnimationActive={false}
            // animationDuration={ANIMATION_DURATION}
            style={{
              outline: 'none', // Removes the focus outline
              cursor: 'pointer',
            }}
          >
            <Cell fill='#EEEEF2' stroke='none' />
          </Pie>
          <Pie
            data={orangeData}
            cx='50%'
            cy='50%'
            innerRadius={55}
            outerRadius={isOrangeActive ? ACTIVE_THICKNESS : DISABLED_THICKNESS}
            startAngle={90}
            endAngle={-270}
            dataKey='value'
            cornerRadius={2}
            isAnimationActive={isAnimated}
            animationDuration={ANIMATION_DURATION}
            style={{
              outline: 'none', // Removes the focus outline
              cursor: 'pointer',
            }}
          >
            <Cell
              onClick={handleOrangeClick}
              fill='url(#orangeGradient)'
              stroke={'#F6F6F8'}
              filter={isOrangeActive ? 'url(#dropShadowFilterOrange)' : 'none'}
              style={
                isOrangeActive
                  ? {
                      // filter:
                      //   'drop-shadow(0 0 4px rgba(234, 84, 0, 0.4)) drop-shadow(0 0 8px rgba(234, 84, 0, 0.2))',
                      // WebkitFilter:
                      //   'drop-shadow(0 0 4px rgba(234, 84, 0, 0.4)) drop-shadow(0 0 8px rgba(234, 84, 0, 0.2))',
                      outline: 'none',
                      cursor: 'pointer',
                    }
                  : {
                      outline: 'none', // Removes the focus outline
                      cursor: 'pointer',
                    }
              }
            />
            <Cell fill='transparent' stroke='none' />
          </Pie>

          {/* render stripes */}
          {!isOrangeActive && (
            <Pie
              data={orangeData}
              cx='50%'
              cy='50%'
              innerRadius={55}
              outerRadius={78}
              startAngle={90}
              endAngle={-270}
              dataKey='value'
              cornerRadius={2}
              isAnimationActive={isAnimated}
              animationDuration={ANIMATION_DURATION}
              style={{
                outline: 'none', // Removes the focus outline
                cursor: 'pointer',
              }}
            >
              <Cell
                fill='url(#diagonalStripes)'
                stroke='#F6F6F8'
                style={{ pointerEvents: 'none' }}
              />
              <Cell fill='transparent' stroke='none' />
            </Pie>
          )}

          {/* BLUE SEGMENT */}
          <Pie
            data={blueData}
            cx='50%'
            cy='50%'
            innerRadius={55}
            outerRadius={isBlueActive ? ACTIVE_THICKNESS : DISABLED_THICKNESS}
            startAngle={90}
            endAngle={-270}
            dataKey='value'
            cornerRadius={2}
            isAnimationActive={isAnimated}
            animationDuration={ANIMATION_DURATION}
          >
            <Cell
              fill='transparent'
              stroke='none'
              style={{ pointerEvents: 'none' }}
            />
            <Cell
              fill='url(#blueGradient)'
              onClick={handleBlueClick}
              stroke={'#F6F6F8'}
              filter={isBlueActive ? 'url(#dropShadowFilterBlue)' : 'none'}
              style={
                isBlueActive
                  ? {
                      // filter:
                      //   'drop-shadow(0 0 8px rgba(23, 106, 229, 0.3)) drop-shadow(0 0 8px rgba(23, 106, 229, 0.2))',
                      outline: 'none', // Removes the focus outline
                      cursor: 'pointer',
                    }
                  : {
                      outline: 'none', // Removes the focus outline
                      cursor: 'pointer',
                    }
              }
            />
          </Pie>

          {/* render stripes for blue */}
          {!isBlueActive && (
            <Pie
              data={blueData}
              cx='50%'
              cy='50%'
              innerRadius={55}
              outerRadius={78}
              startAngle={90}
              endAngle={-270}
              dataKey='value'
              cornerRadius={2}
              isAnimationActive={isAnimated}
              animationDuration={ANIMATION_DURATION}
              style={{
                outline: 'none',
                cursor: 'pointer',
                pointerEvents: 'none',
              }}
            >
              <Cell fill='transparent' stroke='none' />
              <Cell fill='url(#diagonalStripes)' stroke='#F6F6F8' />
            </Pie>
          )}

          <Pie
            data={backgroundData}
            cx='50%'
            cy='50%'
            innerRadius={0}
            outerRadius={60}
            startAngle={90}
            endAngle={-270}
            dataKey='value'
            isAnimationActive={false}
            style={{
              outline: 'none', // Removes the focus outline
              cursor: 'pointer',
              pointerEvents: 'none',
            }}
          >
            <Cell fill='#F6F6F8' stroke='#EBEBF2' />
          </Pie>
          <Pie
            data={backgroundData}
            cx='50%'
            cy='50%'
            innerRadius={0}
            outerRadius={59.5}
            startAngle={90}
            endAngle={-270}
            dataKey='value'
            isAnimationActive={false}
          >
            <Cell
              fill='#F6F6F8'
              stroke='none'
              style={{
                outline: 'none', // Removes the focus outline
                cursor: 'pointer',
              }}
              onClick={handleOutsideClick}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <S.LabelWrapper>
        <S.Label>
          {percentage}
          <span>%</span>
        </S.Label>
      </S.LabelWrapper>
    </S.Wrapper>
  );
};
