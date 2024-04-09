using EmployeeManagement.Core.Entities;

namespace EmployeeManagement.API.Models
{
    public class EmployeePostModel
    {
        public string Tz { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DateBirth { get; set; }
        public Gender Gender { get; set; }
        public IEnumerable<EmployeePositionsPostModel> EmployeePositions { get; set; }

    }
}
