import Headers from "./components/Headers"
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'


const App = () => {
  return (
    <div>
      <Headers></Headers>
      <Container className="my-5">
      <Outlet></Outlet>
      </Container>
    </div>
  )
}

export default App
