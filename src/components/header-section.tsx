import { useEffect, useState } from "react";
import { Button, Container, Dropdown, Modal, Nav, Navbar, NavDropdown } from "react-bootstrap";

import { useToastor, useUserObs, useTokenObs, msalSrv } from '../services/gateway-service';


export const LoginButton = () => {
    const [openState,setModalState] = useState(false);

   const openModal = () => setModalState(true);
   const closeModal = () => setModalState(false);
  
   return (
    <>
        <Button type="button" className="btn btn-outline-primary me-2" onClick={openModal}>Login</Button>
        <Modal show={openState} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Login User</Modal.Title>
          </Modal.Header>
          <Modal.Body><div><h5>Please enter your email address</h5><input type="text" id="txt-email" name="txt-email" /></div></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Check in
            </Button>
          </Modal.Footer>
        </Modal>
      </>
   )

}

export const SignInButton = () => {
    const { setToken } = useTokenObs();
    // const login = () => {
    //     instance.loginRedirect(loginRequest)
    //     .catch((e:string) => {
    //         console.log(e);
    //     });
    // }
    // const login = async() => {
        
    //     auth0Srv.LoginRedirect();
    // }
    const login = () => {
        msalSrv.Login();
    }

    // const login = () => {
    //     window.location.href = "https://newdepowersoft.b2clogin.com/newdepowersoft.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signin&client_id=194b076d-67f6-4075-8050-3fa69cdebde1&nonce=defaultNonce&redirect_uri=http://localhost:3000&scope=openid&response_type=id_token&prompt=login";
    // }
    return (
        <button type="button" className="btn btn-outline-primary me-2" onClick={() => login()}>Login</button>
    )
}

const SignOutButton = () => {
    const logout = () => {
        msalSrv.Logout();
    }

    return (
        <button type="button" className="btn btn-outline-primary me-2" onClick={() => logout()}>Logout</button>
    )
}

export const MoreAction = () => {
    const { addText,clear } = useToastor();
    const { getUserList ,users} = useUserObs();



    return (
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            More...
          </Dropdown.Toggle>
    
          <Dropdown.Menu>
            <Dropdown.Item href="#" onClick={() => getUserList() }>Get users</Dropdown.Item>
            <Dropdown.Item href="#" onClick={() => addText('hello')}>Send Msg</Dropdown.Item>
            <Dropdown.Item href="#">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      );
}

// export const Welcome = () => {
//     // const msalObj = new PublicClientApplication(msalConfig);
//     // const loginaccounts = msalObj.getAllAccounts();
//     // const isAuthenicated = useIsAuthenticated();
//     // const { instance, accounts } = useMsal();


//     if (window.location.href.indexOf("id_token") >= 0) {
//         const lines = window.location.href.split('id_token=');
//         const token = lines[1];
//         setToken(token);
//         t = token;
//     }
//     return (
//         <div>{ t != null ? `welcome: sign in` : '' }</div>
        
//     )
// }

export const HeaderSection = (props:any) => {
    const [isAuthenticated,setAuthenticated] = useState<boolean>(false);
    const { setToken,idToken } = useTokenObs();
    
    useEffect(() => {
        if (msalSrv.IsAuthenicated()) {
            const token = msalSrv.GetToken();
            setToken(token);
            setAuthenticated(true);
        }
        
        // auth0Srv.IsAuthenticated()
        //     .subscribe((signin:boolean) => {
        //         setAuthenticated(signin);
        //     })
    },[]);

    
   
    //const isAuthenicated = useIsAuthenticated();
    return (
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home"><div className="logo"></div></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  {/* <Nav.Link href="#features">Features</Nav.Link>
                  <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                  {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
                <Nav>
                  <Nav.Link href="#deets">Login</Nav.Link>
                  {/* <Nav.Link eventKey={2} href="#memes">
                      Desmond Tam
                  </Nav.Link> */}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

    );
}

