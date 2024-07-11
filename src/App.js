import React, { useState, useEffect } from 'react';
import AddEmployeeForm from './components/AddEmployeeForm';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  // Load employees from localStorage on initial render
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  const handleAddEmployee = (newEmployee) => {
    let updatedEmployees;
    if (employeeToEdit) {
      // Update existing employee
      updatedEmployees = employees.map(employee =>
        employee.id === employeeToEdit.id ? newEmployee : employee
      );
      setEmployeeToEdit(null);
    } else {
      // Add new employee
      updatedEmployees = [...employees, newEmployee];
    }
    
    // Update state with updated employees array
    setEmployees(updatedEmployees);

    // Update localStorage with updated employees array
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const handleEditEmployee = (employee) => {
    // Set employeeToEdit to enable editing mode
    setEmployeeToEdit(employee);
  };

  const handleDeleteEmployee = (id) => {
    // Filter out the employee with the specified id
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);

    // Update localStorage with updated employees array
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  return (
    <div className="App">
      <h1>Employee Registration Application</h1>
      <AddEmployeeForm onAddEmployee={handleAddEmployee} employeeToEdit={employeeToEdit} />

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



// import React, { useState, useEffect } from 'react';
// import AddEmployeeForm from './components/AddEmployeeForm';

// const App = () => {
//   const [employees, setEmployees] = useState([]);
//   const [searchId, setSearchId] = useState('');
//   const [searchedEmployee, setSearchedEmployee] = useState(null);

//   // Fetch employees from JSON Server on initial render
//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/employees');
//       if (!response.ok) {
//         throw new Error('Failed to fetch employees');
//       }
//       const data = await response.json();
//       setEmployees(data);
//     } catch (error) {
//       console.error('Error fetching employees:', error);
//     }
//   };

//   const handleSearchEmployee = () => {
//     const employee = employees.find(emp => emp.id === parseInt(searchId));
//     setSearchedEmployee(employee || null);
//   };

//   const handleAddEmployee = async (newEmployee) => {
//     try {
//       const response = await fetch('http://localhost:5000/employees', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newEmployee),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to add employee');
//       }
//       const addedEmployee = await response.json();
//       setEmployees([...employees, addedEmployee]);
  
//       // Update localStorage with updated employees array
//       localStorage.setItem('employees', JSON.stringify([...employees, addedEmployee]));
//     } catch (error) {
//       console.error('Error adding employee:', error);
//     }
//   };
  
//   const handleEditEmployee = async (updatedEmployee) => {
//     try {
//       const response = await fetch(`http://localhost:5000/employees/${updatedEmployee.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedEmployee),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to update employee');
//       }
//       const updatedEmployeeData = await response.json();
//       const updatedEmployees = employees.map(emp =>
//         emp.id === updatedEmployeeData.id ? updatedEmployeeData : emp
//       );
//       setEmployees(updatedEmployees);
  
//       // Update localStorage with updated employees array
//       localStorage.setItem('employees', JSON.stringify(updatedEmployees));
//     } catch (error) {
//       console.error('Error updating employee:', error);
//     }
//   };
  
//   const handleDeleteEmployee = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5000/employees/${id}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete employee');
//       }
//       const updatedEmployees = employees.filter(emp => emp.id !== id);
//       setEmployees(updatedEmployees);
  
//       // Update localStorage with updated employees array
//       localStorage.setItem('employees', JSON.stringify(updatedEmployees));
//     } catch (error) {
//       console.error('Error deleting employee:', error);
//     }
//   };
  

//   return (
//     <div className="App">
//       <h1>Employee Registration Application</h1>
//       <AddEmployeeForm />

//       <div>
//         <label>Search Employee by ID:</label>
//         <input type="text" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
//         <button onClick={handleSearchEmployee}>Search</button>
//         {searchedEmployee && (
//           <div>
//             <h3>Employee Found:</h3>
//             <p>ID: {searchedEmployee.id}</p>
//             <p>Name: {searchedEmployee.name}</p>
//             <p>Email: {searchedEmployee.email}</p>
//             <p>Phone: {searchedEmployee.phone}</p>
//             <p>Image: <img src={searchedEmployee.image} alt="Employee" /></p>
//             <p>Position: {searchedEmployee.position}</p>
//           </div>
//         )}
//       </div>

//       <h2>Employees List</h2>
//       <ul>
//         {employees.map(employee => (
//           <li key={employee.id}>
//             {employee.name} - {employee.position}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;

