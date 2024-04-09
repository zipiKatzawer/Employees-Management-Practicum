using AutoMapper;
using EmployeeManagement.API.Models;
using EmployeeManagement.Core.DTO;
using EmployeeManagement.Core.Entities;
using EmployeeManagement.Core.Services;
using EmployeeManagement.Service;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeeManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        private readonly IPositionService _positionService;
        private readonly IMapper _mapper;
        public PositionController(IPositionService positionService, IMapper mapper)
        {
            _positionService = positionService;
            _mapper = mapper;
        }

        // GET: api/<PositionController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var listPositions = await _positionService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<PositionDTO>>(listPositions));
        }

        // GET api/<PositionController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var position = await _positionService.GetByIdAsync(id);
            return Ok(_mapper.Map<PositionDTO>(position));
        }

        // POST api/<PositionController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PositionPostModel model)
        {
            var newPosition = await _positionService.AddAsync(_mapper.Map<Position>(model));
            return Ok(_mapper.Map<PositionDTO>(newPosition));
        }

        // PUT api/<PositionController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Position position)
        {
            return Ok(await _positionService.UpdateAsync(id, position));
        }

        // DELETE api/<PositionController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var position = await _positionService.GetByIdAsync(id);
            if (position is null)
                return NotFound();
            await _positionService.DeleteAsync(id);
            return NoContent();
        }
    }
}
