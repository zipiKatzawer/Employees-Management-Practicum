using EmployeeManagement.Core.Entities;
using EmployeeManagement.Core.Repositories;
using EmployeeManagement.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Service
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }
        public async Task<bool> IsValidAsync(Employee employee)
        {
            if (employee.StartDate.Day < employee.DateBirth.Day ||DateTime.Now.Year - employee.DateBirth.Year < 18 || employee.Tz.Length != 9
                //בדיקה אם התאריך כניסה לתפקיד קטן מהתאריך כניסה לעבודה
                || employee.EmployeePositions.Any(e => e.EntryDate < employee.StartDate))
            {
                return false;
            }
            return true;
            
        }
        public async Task<Employee> AddAsync(Employee employee)
        {
            if(await IsValidAsync(employee))
            {
                return await _employeeRepository.AddAsync(employee);
            }
            return null;
           
        }

        public async Task DeleteAsync(int id)
        {
             await _employeeRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _employeeRepository.GetAllAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _employeeRepository.GetByIdAsync(id);
        }

        public async Task<Employee> UpdateAsync(Employee employee)
        {
            return await _employeeRepository.UpdateAsync(employee);
        }
        public async Task<bool> Login(string name, string tz)
        {
            return await _employeeRepository.Login(name, tz);
        }
    }
}
