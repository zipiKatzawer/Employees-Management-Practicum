using EmployeeManagement.Core.Entities;
using EmployeeManagement.Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Data.Repositories
{
    public class PositionRepository : IPositionRepository
    {
        private readonly DataContext _context;
        public PositionRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Position> AddAsync(Position position)
        {
            _context.positions.AddAsync(position);
            await _context.SaveChangesAsync();
            return position;
        }

        public async Task DeleteAsync(int id)
        {
            var position = await GetByIdAsync(id);
            _context.positions.Remove(position);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Position>> GetAllAsync()
        {
            return await _context.positions.ToListAsync();
        }

        public async Task<Position> GetByIdAsync(int id)
        {
            return await _context.positions.FindAsync(id);
        }

        public async Task<Position> UpdateAsync(int id, Position position)
        {
            var existPosition =await GetByIdAsync(id);
            existPosition.positionName = position.positionName;
            await _context.SaveChangesAsync();
            return existPosition;
        }
    }
}
