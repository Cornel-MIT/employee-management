// import React, { useState, useEffect } from 'react';
// import AddEmployeeForm from './components/AddEmployeeForm';

// const App = () => {
//   const [employees, setEmployees] = useState([]);
//   const [employeeToEdit, setEmployeeToEdit] = useState(null);

//   // Load employees from localStorage on initial render
//   useEffect(() => {
//     const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
//     setEmployees(storedEmployees);
//   }, []);

//   const handleAddEmployee = (newEmployee) => {
//     let updatedEmployees;
//     if (employeeToEdit) {
//       // Update existing employee
//       updatedEmployees = employees.map(employee =>
//         employee.id === employeeToEdit.id ? newEmployee : employee
//       );
//       setEmployeeToEdit(null);
//     } else {
//       // Add new employee
//       updatedEmployees = [...employees, newEmployee];
//     }
    
//     // Update state with updated employees array
//     setEmployees(updatedEmployees);

//     // Update localStorage with updated employees array
//     localStorage.setItem('employees', JSON.stringify(updatedEmployees));
//   };

//   const handleEditEmployee = (employee) => {
//     // Set employeeToEdit to enable editing mode
//     setEmployeeToEdit(employee);
//   };

//   const handleDeleteEmployee = (id) => {
//     // Filter out the employee with the specified id
//     const updatedEmployees = employees.filter(employee => employee.id !== id);
//     setEmployees(updatedEmployees);

//     // Update localStorage with updated employees array
//     localStorage.setItem('employees', JSON.stringify(updatedEmployees));
//   };

//   return (
//     <div className="App">
//       <h1>Employee Registration Application</h1>
//       <AddEmployeeForm onAddEmployee={handleAddEmployee} employeeToEdit={employeeToEdit} />

//       <h2>Employees List</h2>
//       <ul>
//         {employees.map(employee => (
//           <li key={employee.id}>
//             {employee.name} - {employee.position}
//             <button onClick={() => handleEditEmployee(employee)}>Edit</button>
//             <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEmployeeForm from './components/AddEmployeeForm';

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
      <h1>Employee Registration Application</h1>
      <AddEmployeeForm onAddEmployee={handleAddEmployee} employeeToEdit={employeeToEdit} />

      <h2>Search Employee by ID</h2>
      <input 
        type="text" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Search by ID" 
      />
      <button onClick={handleSearch}>Search</button>

      <h2>Employees List</h2>
      <ul>
        {employees.map(employee => (
          <li key={employee.id}>
            {employee.name} - {employee.position}
            <button onClick={() => handleEditEmployee(employee)}>Edit</button>
            <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
