import Headers from "./components/Headers"
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    <div>
      <Headers></Headers>
      <ToastContainer/>
      <Container className="my-5">
      <Outlet></Outlet>
      </Container>
    </div>
  )
}

export default App
