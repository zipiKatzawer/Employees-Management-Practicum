using EmployeeManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Core.DTO
{
    public class EmployeeDTO
    {
        public int Id { get; set; }
        public string Tz { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DateBirth { get; set; }
        public Gender Gender { get; set; }
        public bool Status { get; set; }
        public IEnumerable<EmployeePositionsDTO> EmployeePositions { get; set; }


    }
}
