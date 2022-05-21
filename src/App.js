import Layout from "./Components/Layout";
import ComputerListPage from "./Pages/ComputerListPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import CreateList from "./Pages/CreateList";
import EditList from "./Pages/EditList";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material";
import LogIn from "./Pages/LogIn";
import Cart from "./Pages/Cart";
import PageNotFound from "./Pages/PageNotFound";
import RequireAuth from "./Components/RequireAuth";
import React , { useEffect, useState } from "react";
import Loading from "./Components/Loading";
import SpesificComputerListPage from "./Pages/SpesificComputerListPage";
import DescriptionPage from "./Pages/DescriptionPage";
import Profile from "./Pages/Profile";
import ProfileOrders from "./Pages/ProfileOrders";
import About from "./Pages/About";
import Ordermanager from "./Pages/Ordermanager";
const theme = createTheme({});

function App() {
  const [value, setValue] = useState( parseInt(localStorage.getItem("active")));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const isAdminRequired = true
  

    const setUserCart = (cart) => {
      setUser(prev => {return {...prev,cart} })
    }

  useEffect(() => {
    setIsLoading(true)
    let currentUser = localStorage.getItem("currentUser")
    if(currentUser !== null) {
      fetch("http://localhost:8001/users")
        .then((res) => res.json())
        .then((data) => data.forEach(user => {
          if(user.id === parseInt(currentUser) ){
            delete user.password
            setUser(user)
            setIsLoading(false)
          }
        }));}
        else setIsLoading(false)
  }, []);

  if(isLoading) {
  return <Loading />
}
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
              <Layout  user={user} setUser={setUser}>
                <Routes>
                  <Route path="/LogIn" element={<LogIn user={user} setUser={setUser}  />} />
                  <Route path="/Cart" element={ <RequireAuth user={user} ><Cart user={user} setUserCart={setUserCart} /> </RequireAuth>}/>
                  <Route path="/" element={<RequireAuth user={user}><Homepage /></RequireAuth>} />
                  <Route path="/User/:userID" element={<RequireAuth user={user}><Profile user={user}/></RequireAuth>} />
                  <Route path="/User/:userID/Orders" element={<RequireAuth user={user}><ProfileOrders user={user}/></RequireAuth>} />
                  <Route path="/ComputerListPage/All" element={<RequireAuth  user={user}> <ComputerListPage user={user} setUserCart={setUserCart} value={value} setValue={setValue}/></RequireAuth>} />
                  <Route path="/ComputerListPage/All/:id" element={<RequireAuth  user={user}> <DescriptionPage user={user} setUserCart={setUserCart}/></RequireAuth>} />
                  <Route path='/ComputerListPage/:name' element={<RequireAuth  user={user}> <SpesificComputerListPage user={user} setUserCart={setUserCart} value={value} setValue={setValue}/></RequireAuth>} />
                  <Route path="/CreateList" element={<RequireAuth user={user} isAdminRequired={isAdminRequired}> <CreateList isAdminRequired={isAdminRequired} />  </RequireAuth>} />
                  <Route path="/EditList" element={<RequireAuth user={user} isAdminRequired={isAdminRequired}><EditList isAdminRequired={isAdminRequired} /></RequireAuth>} />
                  <Route path="/OrderManagment" element={<RequireAuth user={user} isAdminRequired={isAdminRequired}><Ordermanager user={user} /></RequireAuth>} />
                  <Route path="/About" element={<RequireAuth user={user} ><About/></RequireAuth>} />
                  <Route path="*" element={<RequireAuth user={user}><PageNotFound /></RequireAuth>} />
                </Routes>
              </Layout>
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }


export default App;
