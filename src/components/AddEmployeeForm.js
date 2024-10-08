import React, { useState, useEffect } from 'react';

const AddEmployeeForm = ({ onAddEmployee, employeeToEdit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');
  const [position, setPosition] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (employeeToEdit) {
      setName(employeeToEdit.name);
      setEmail(employeeToEdit.email);
      setPhone(employeeToEdit.phone);
      setImage(employeeToEdit.image || '');
      setPosition(employeeToEdit.position);
      setId(employeeToEdit.id);
    }
  }, [employeeToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEmployee = {
      name,
      email,
      phone,
      image,
      position,
      id
    };

    onAddEmployee(updatedEmployee);

    // Clear form fields after submission
    setName('');
    setEmail('');
    setPhone('');
    setImage('');
    setPosition('');
    setId('');
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <label className='labels'>Name:</label>
      <input className='inputs' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      <br />

      <label className='labels'>Email:</label>
      <input className='inputs' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <br />

      <label className='labels'>Phone Number:</label>
      <input className='inputs' type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <br />

      <label className='labels'>Image FILE:</label>
      <input className='inputs' type="file" value={image} onChange={(e) => setImage(e.target.value)} />
      <br />

      <label className='labels'>Position:</label>
      <input className='inputs' type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
      <br />

      <label className='labels'>ID:</label>
      <input className='inputs' type="text" value={id} onChange={(e) => setId(e.target.value)} required />
      <br />

      <button className='btn' type="submit">{employeeToEdit ? 'Update Employee' : 'Add Employee'}</button>
    </form>
  );
};

export default AddEmployeeForm;
