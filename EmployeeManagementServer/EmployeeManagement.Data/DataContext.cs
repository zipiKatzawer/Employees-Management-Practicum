using EmployeeManagement.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Data
{
    public class DataContext:DbContext
    {
        public DbSet<Employee> employees { get; set; }
        public DbSet<EmployeePositions> employeesPositions { get; set; }
        public DbSet<Position> positions { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=EmployeeManagement");
        }

    }
}
