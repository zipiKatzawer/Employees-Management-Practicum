using EmployeeManagement.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Core.DTO
{
    public class EmployeePositionsDTO
    {
        public int PositionId { get; set; }
        public PositionDTO Position { get; set; }
        public bool Admin { get; set; }
        public DateTime EntryDate { get; set; }
    }
}
