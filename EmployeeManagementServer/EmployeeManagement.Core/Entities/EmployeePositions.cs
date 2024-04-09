﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagement.Core.Entities
{
    public class EmployeePositions
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
        public int PositionId { get; set; }
        public Position Position { get; set; }
        public bool Admin { get; set; }
        public DateTime EntryDate { get; set; }
    }
}
