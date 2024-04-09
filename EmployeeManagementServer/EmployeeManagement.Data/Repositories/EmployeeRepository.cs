using EmployeeManagement.Core.Entities;
using EmployeeManagement.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Data.Repositories
{
    public class EmployeeRepository: IEmployeeRepository
    {
        private readonly DataContext _context;
        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Employee> AddAsync(Employee employee)
        {
            employee.Status = true;
            _context.employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task DeleteAsync(int id)
        {
            var employee = await GetByIdAsync(id);
            employee.Status=false;
            //_context.employees.Remove(employee);
            await _context.SaveChangesAsync();

        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            return await _context.employees.Include(e=>e.EmployeePositions).ThenInclude(p=>p.Position).ToListAsync();
        }

        public async Task<Employee> GetByIdAsync(int id)
        {
            return await _context.employees.Include(e => e.EmployeePositions).ThenInclude(p => p.Position).FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Employee> UpdateAsync(Employee employee)
        {
            var existEmployee = await GetByIdAsync(employee.Id);
            _context.Entry(existEmployee).CurrentValues.SetValues(employee);
            await _context.SaveChangesAsync();
            return existEmployee;
        }
        public async Task<bool> Login(string name, string tz)
        {
            var employee = await _context.employees
            .Include(e => e.EmployeePositions)
            .FirstOrDefaultAsync(e => e.Tz == tz && e.LastName == name);

            if (employee != null)
            {
                if(employee.Status)
                    return true;
            }

            return false;
        }
    }
}
