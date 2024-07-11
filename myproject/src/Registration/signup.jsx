import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import '../assets/index.css'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const signup = () => {
    const [validated, setValidated] = useState(false);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail]=useState('');
    const [password,setPassword]=useState('');
const [isCompleted,setIsCompleted]=useState(false);
const [file,setFile]=useState(null);
const navigate=useNavigate();
    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      event.preventDefault();
      setValidated(true);

      axios.post('http://localhost:3000/signup',{name,lastName,email,password}).then(result=>{
        if(name!==''&&lastName!==''&&email!==''&&password!==''){
          setIsCompleted(true);
            navigate('/');
        }
        JSON.parse(localStorage.setItem('user',JSON.stringify(result))),
        console.log(result);
      }).catch(err=>console.log(err));
    } 
  return (
    <>
    {isCompleted&&<h2>Successfully Created Account</h2>}
     <Form noValidate validated={validated} onSubmit={handleSubmit} style={{width:'100%', marginTop:"120px"}}>
      <Row className="mb-3">
      <Form.Group className="position-relative mb-3">
            <Form.Label>File</Form.Label>
            <Form.Control
              type="file"
              required
              name="file"
            />
          </Form.Group>
        <Form.Group as={Col} md="5" controlId="validationCustom01">
          <Form.Label style={{color:"black"}}>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            onChange={(e)=>setName(e.target.value)}
          />
        
        </Form.Group>
        <Form.Group as={Col} md="5" controlId="validationCustom02">
          <Form.Label style={{color:'black'}}>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            onChange={(e)=>setLastName(e.target.value)}
          />
           <br/>
        </Form.Group>
        <Form.Group as={Col} md="5" controlId="validationCustomUsername">
          <Form.Label style={{color:'black'}}>Email</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="email"
              placeholder="Enter Your Valid email"
              aria-describedby="inputGroupPrepend"
              required
              onChange={(e)=>setEmail(e.target.value)}
            />
            
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md="5" controlId="validationCustomPassword">
          <Form.Label style={{color:'black'}}>Password</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="password"
              placeholder="Enter Your Valid Password"
              aria-describedby="inputGroupPrepend"
              required
              onChange={(e)=>setPassword(e.target.value)}
            />
            
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Button type="submit" style={{width:'420px',marginLeft:"420px"}}>Submit form</Button>
    </Form>
    <p style={{marginLeft:'620px',marginTop:"20px"}}>Already have an account<NavLink to='/signin'>Login</NavLink></p>
    </>

  )
}

export default signup