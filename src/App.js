import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEmployeeForm from './components/AddEmployeeForm';
import EmployeeCard from './components/EmployeeCard';
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.error('Error fetching employees:', error));
  }, []);

  const handleAddEmployee = (newEmployee) => {
    if (newEmployee.image) {
      newEmployee.image = URL.createObjectURL(newEmployee.image); 
    }

    if (employeeToEdit) {
      axios.put(`http://localhost:5000/employees/${newEmployee.id}`, newEmployee)
        .then(response => {
          const updatedEmployees = employees.map(emp => emp.id === newEmployee.id ? newEmployee : emp);
          setEmployees(updatedEmployees);
          setEmployeeToEdit(null);
        })
        .catch(error => console.error('Error updating employee:', error));
    } else {
      axios.post('http://localhost:5000/employees', newEmployee)
        .then(response => {
          setEmployees([...employees, response.data]);
        })
        .catch(error => console.error('Error adding employee:', error));
    }
  };

  const handleEditEmployee = (employee) => {
    setEmployeeToEdit(employee);
  };

  const handleDeleteEmployee = (id) => {
    axios.delete(`http://localhost:5000/employees/${id}`)
      .then(response => {
        const updatedEmployees = employees.filter(emp => emp.id !== id);
        setEmployees(updatedEmployees);
      })
      .catch(error => console.error('Error deleting employee:', error));
  };

  const handleSearch = () => {
    if (searchQuery) {
      const filteredEmployees = employees.filter(emp => emp.id.includes(searchQuery));
      setEmployees(filteredEmployees);
    } else {
      axios.get('http://localhost:5000/employees')
        .then(response => setEmployees(response.data))
        .catch(error => console.error('Error fetching employees:', error));
    }
  };

  return (
    <div className="App">
      <h1 className='form-title'>Employee Registration Application</h1>
      <AddEmployeeForm onAddEmployee={handleAddEmployee} employeeToEdit={employeeToEdit} />

      <h2 className='searchH'>Search Employee by ID</h2>
      <input 
        className='inputSearch'
        type="text" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Search by ID" 
      />
      <button className='btnSearch' onClick={handleSearch}>Search</button>

      <h2>Employees List</h2>
      <div className="employee-list">
        {employees.map(employee => (
          <EmployeeCard 
            key={employee.id} 
            employee={employee} 
            onEdit={handleEditEmployee} 
            onDelete={handleDeleteEmployee} 
          />
        ))}
      </div>
    </div>
  );
};

export default App;
