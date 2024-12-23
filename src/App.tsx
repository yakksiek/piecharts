import { CircularProgressChart } from './components/GradientChart';
import { CustomProgressChart } from './components/Recharts';

const App = () => {
  return (
    <div>
      <h4>Gradient Chart with Stripes</h4>
      <CircularProgressChart />
      <CustomProgressChart />
    </div>
  );
};

export default App;
