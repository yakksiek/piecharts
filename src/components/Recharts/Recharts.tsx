import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import * as S from './styled';

const CustomProgressChart = ({ percentage = 64.5 }) => {
  // const [blueActive, setBlueActive] = useState(true);
  // const [orangeActive, setOrangeActive] = useState(true);

  const handleBlueClick = (event: React.MouseEvent) => {
    if (event.shiftKey) {
      console.log('with shift');
    } else {
      console.log('click');
    }
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
        id='dropShadow'
        height='130%'
        width='130%'
        filterUnits='userSpaceOnUse'
      >
        <feFlood
          floodColor='rgb(87, 137, 213)'
          floodOpacity='0.7'
          result='shadowColor'
        />
        <feGaussianBlur in='SourceAlpha' stdDeviation='6' result='blur' />
        <feOffset dx='0' dy='0' result='offsetblur' />
        <feComposite
          in='shadowColor'
          in2='offsetblur'
          operator='in'
          result='coloredShadow'
        />
        <feMerge>
          <feMergeNode in='coloredShadow' />
          <feMergeNode in='SourceGraphic' />
        </feMerge>
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
          >
            <Cell fill='#EEEEF2' stroke='none' />
          </Pie>
          <Pie
            data={orangeData}
            cx='50%'
            cy='50%'
            innerRadius={55}
            outerRadius={78} // Smaller radius for orange segment
            startAngle={90}
            endAngle={-270}
            dataKey='value'
            cornerRadius={2}
            isAnimationActive={false}
            onClick={() => console.log('asdf')}
          >
            <Cell fill='url(#orangeGradient)' stroke='#F6F6F8' />
            {/* Orange gradient with stripes */}
            <Cell fill='transparent' stroke='none' />{' '}
            {/* Transparent cell for blue space */}
          </Pie>
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
            isAnimationActive={false}
          >
            <Cell fill='url(#diagonalStripes)' stroke='#F6F6F8' />
            <Cell fill='transparent' stroke='none' />
          </Pie>
          <Pie
            data={blueData}
            cx='50%'
            cy='50%'
            innerRadius={55}
            outerRadius={85}
            startAngle={90}
            endAngle={-270}
            dataKey='value'
            filter='url(#dropShadow)'
            cornerRadius={2}
            isAnimationActive={false}
            onClick={(e, index, event) => handleBlueClick(event)}
            style={{ cursor: 'pointer' }}
          >
            <Cell fill='transparent' stroke='none' />
            <Cell fill='url(#blueGradient)' />
          </Pie>

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
            <Cell fill='#F6F6F8' stroke='none' />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* <S.LabelWrapper>
        <S.Label>
          {percentage}
          <span>%</span>
        </S.Label>
      </S.LabelWrapper> */}
    </S.Wrapper>
  );
};

export default CustomProgressChart;
