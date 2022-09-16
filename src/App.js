import { data } from './data'
import { data2 } from './data2'

function App() {
  return (
    <div>
      {data2.map((c) => <div>{c.commit.message}</div>)}
      { data2.length}
    </div>
  );
}

export default App;
