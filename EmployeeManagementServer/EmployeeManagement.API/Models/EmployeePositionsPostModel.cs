namespace EmployeeManagement.API.Models
{
    public class EmployeePositionsPostModel
    {
        //public int EmployeeId { get; set; }
        public int PositionId { get; set; }
        public bool Admin { get; set; }
        public DateTime EntryDate { get; set; }
    }
}
