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
import React , { createContext, useEffect, useState } from "react";
import Loading from "./Components/Loading";
import SpesificComputerListPage from "./Pages/SpesificComputerListPage";
import DescriptionPage from "./Pages/DescriptionPage";
import Profile from "./Pages/Profile";
import ProfileOrders from "./Pages/ProfileOrders";
import About from "./Pages/About";
import OrderManagement from "./Pages/OrderManagement";
import SignUp from "./Pages/Signup";

const theme = createTheme({});
export const UserContext = createContext();

function App() {
  const [value, setValue] = useState(parseInt(localStorage.getItem("active")));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAdminRequired = true;
  

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
            console.log(user)
          }
        }));
      }else
         setIsLoading(false)
  }, []);

  if(isLoading) {
  return <Loading />
}
    return (
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
          <UserContext.Provider value={{user: user, setUser:setUser, setUserCart:setUserCart}}>
              <Layout>
                <Routes>
                  <Route path="/LogIn" element={<LogIn/>} />
                  <Route path="/SignUp" element={<SignUp/>} />
                  <Route path="/Cart" element={ <RequireAuth><Cart/> </RequireAuth>}/>
                  <Route path="/" element={<RequireAuth><Homepage /></RequireAuth>} />
                  <Route path="/User/:userID" element={<RequireAuth><Profile/></RequireAuth>} />
                  <Route path="/User/:userID/Orders" element={<RequireAuth><ProfileOrders/></RequireAuth>} />
                  <Route path="/ComputerListPage/All" element={<RequireAuth> <ComputerListPage value={value} setValue={setValue}/></RequireAuth>} />
                  <Route path="/ComputerListPage/All/:id" element={<RequireAuth> <DescriptionPage/></RequireAuth>} />
                  <Route path='/ComputerListPage/:name' element={<RequireAuth> <SpesificComputerListPage value={value} setValue={setValue}/></RequireAuth>} />
                  <Route path="/CreateList" element={<RequireAuth isAdminRequired={isAdminRequired}> <CreateList isAdminRequired={isAdminRequired} />  </RequireAuth>} />
                  <Route path="/EditList" element={<RequireAuth isAdminRequired={isAdminRequired}><EditList isAdminRequired={isAdminRequired} /></RequireAuth>} />
                  <Route path="/OrderManagment" element={<RequireAuth isAdminRequired={isAdminRequired}><OrderManagement/></RequireAuth>} />
                  <Route path="/About" element={<RequireAuth ><About/></RequireAuth>} />
                  <Route path="*" element={<RequireAuth><PageNotFound /></RequireAuth>} />
                </Routes>
              </Layout>
              </UserContext.Provider>
          </BrowserRouter>
        </ThemeProvider>
      </StyledEngineProvider>
    );
  }


export default App;
