using Microsoft.AspNetCore.Mvc;
using NCP.API.Services;

namespace NCP.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        // Dependency Injection
        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpPost("parse")]
        public ActionResult<string> ParseNotification([FromBody] string input)
        {
            var result = _notificationService.ParseNotification(input);
            return Ok(result);
        }

        [HttpPost("tag")]
        public ActionResult WriteToFile([FromBody] string newValue)
        {
            if (string.IsNullOrEmpty(newValue))
            {
                return BadRequest("File name and tag cannot be empty.");
            }

            try
            {
                _notificationService.WriteToFile(newValue);
                return Ok($"Value '{newValue}' added to file tags.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("tags")]
        public ActionResult<HashSet<string>> ReadToFile()
        {
            var tags = _notificationService.ReadToFile();
            return Ok(tags);
        }

        [HttpGet("hello")]
        public ActionResult<string> GetHelloWorld()
        {
            return Ok(_notificationService.GetHelloWorld());
        }
    }
}
