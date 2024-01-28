import React, { useState } from 'react';
import { Button, Container, Form, Modal, Table } from 'react-bootstrap';


function Registration() {

    const [show, setShow] = useState(true);
    const [buttonState, setButtonState] = useState(true);
    const [allData, setAllData] = useState([{}]);
    const [index , setIndex] = useState(0);
    const [input, setInput] = useState({
        Fullname:"",
        email:"",
        password:"",
        mobilenumber:""
    })

    function getInputData(e) {
      let target = e.target;
      let value = target.value;
      let key = target.name;
     // console.log(key," ",value)
      return(
        setInput((old)=>{
            return{
                ...old,
            [key] : value
            }
        })
      )
    

    }
    let temp = {}

    const getFormData = (e) => {
        e.preventDefault();
        let form = e.target;
       // console.log(form)
        let formData = new FormData(form);
        //console.log(formData);
        //  console.log(formData.get("Fullname"));
        //  console.log(formData.get("email"));
        //  console.log(formData.get("password"));
        //  console.log(formData.get("mobilenumber"));
        //  console.log(formData.get("Dp"));
        for (let data of formData.entries()) {
            //console.log(data);
            let key = data[0];
            let value = data[1];
            //    console.log(value);
            //    console.log(typeof(value));

            if (typeof (value) == 'object') {
                value = URL.createObjectURL(value)
            }
            //  console.log(value);
             temp[key] = value;
            //console.log(temp);

        }

    }
        
    
    function deleteUser(index) {
        // console.log(index)
        let tempdata = [...allData];
        //console.log(tempdata)
        tempdata.splice(index, 1);
        //alert("Are you want to delete data")
        // console.log(tempdata)
        return (
            setAllData(tempdata)
        )
    }
     function insertData(e){
        e.preventDefault()
        //alert ("Insert Data")
        getFormData(e);
    
            return (
                setAllData((old) => {
                    return [
                        ...old,
                        temp
                    ]
                }),
                setShow(false),
                setInput({
                    Fullname:"",
                    email:"",
                    password:"",
                    mobilenumber:""
    
                })
            )
            
    }
    function updateData(e){
        e.preventDefault()
        //alert ("Update Data")
        //alert(index)
        getFormData(e);
        //console.log(temp)
        const tempData = [...allData];
         //console.log(tempData)
        tempData[index] = temp;
         console.log(tempData)
         
        return(
            setShow(false),
            setAllData(tempData)
         
        )
    }
      
    function editData(item) {
       //console.log(item)
       //alert(item.index)
       return(
        setShow(true),
       setInput(item),
       setButtonState(false),
       setIndex(item.index)
       )
    }

    function addButton(){
        return(
           setShow(true),
           setInput({
                Fullname:"",
                email:"",
                password:"",
                mobilenumber:""
           }),
           setButtonState(true)
        )
    }

    function Tr({ item }) {
        return (
            <>
                <tr className='text-center'>
                    <td>{item.index + 1}</td>
                    <td>{item.Fullname}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>{item.mobilenumber}</td>
                    <td><img src={item.Dp} alt='' width={50} height={50} className='rounded-circle' /></td >
                    <td>
                        <Button className='me-2' onClick={() => editData(item)}>
                            <i className='fa fa-edit'></i>
                        </Button>
                        <Button variant='danger' onClick={() => { deleteUser(item.index) }}>
                            <i className='fa fa-trash'></i>
                        </Button>

                    </td>
                </tr>

            </>
        )


    }

    return (
        <>
            <h1 className='text-center'>Registration Details</h1>
            <Button className="position-absolute bottom-0 end-0 me-3 mb-3 rounded-circle"
                onClick={addButton}>
                <i className="fa fa-plus"></i>
            </Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>User Registration</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={buttonState ? insertData : updateData}>
                        <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="Fullname"
                                placeholder="Full Name"
                                onChange={getInputData}
                                value = {input.Fullname}  >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                onChange={getInputData}
                                value ={input.email} ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                onChange={getInputData}
                                value ={input.password}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mobile No.</Form.Label>
                            <Form.Control
                                type="tel"
                                name="mobilenumber"
                                placeholder="Mobile Number"
                                onChange={getInputData}
                                value ={input.mobilenumber}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control 
                                type="file" 
                                name="Dp" 
                                placeholder="Upload proile picture"></Form.Control>
                        </Form.Group>
                        <br />
                        <Form.Group className='mt-3'>
                            {
                                buttonState ? <Button type='submit' variant="primary" className='me-2'>SUBMIT</Button> :
                                <Button type='submit' variant="info" className='me-2'>UPDATE</Button>
                            }
                        
                        <Button type='reset' variant="danger" onClick={()=>setShow(false)}>Cancle</Button>
                        </Form.Group>
                    </Form>
                      {/* <p>{JSON.stringify(input)}</p> */}
            
                </Modal.Body>
             </Modal> 

            {/* <p>{JSON.stringify(allData)}</p> */}

            <Container>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>sl.no</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Mobile Number</th>
                            <th>Profile Picture</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allData.map((item, index) => {
                                item['index'] = index
                                return < Tr item={item} key={index} />


                            })

                        }
                    </tbody>
                </Table>


            </Container>



        </>
    )
}

export default Registration;