using EmployeeManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Core.Services
{
    public interface IPositionService
    {
        Task<IEnumerable<Position>> GetAllAsync();

        Task<Position> GetByIdAsync(int id);

        Task<Position> AddAsync(Position position);

        Task<Position> UpdateAsync(int id, Position position);

        Task DeleteAsync(int id);
    }
}
