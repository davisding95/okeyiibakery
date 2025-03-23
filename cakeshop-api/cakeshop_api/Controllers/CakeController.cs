using Newtonsoft.Json;
using cakeshop_api.Models;
using cakeshop_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace cakeshop_api.Controllers
{

    [ApiController]
    [Route("api/[Controller]")]
    public class CakeController : ControllerBase
    {
        private readonly CakeService _cakeService;
        private readonly CloudflareR2Service _cloudflareR2Service;

        // Constructor to inject CakeService
        public CakeController(CakeService cakeService, CloudflareR2Service cloudflareR2Service)
        {
            _cakeService = cakeService;
            _cloudflareR2Service = cloudflareR2Service;
        }

        // Get all availabel cakes

        [HttpGet("available")]
        public async Task<IActionResult> GetAvailableCakes()
        {
            var availableCakes = await _cakeService.GetAvailableCakes();
            return Ok(availableCakes);
        }

        // GET /api/cake
        [HttpGet]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetAllCakes()
        {
            var cakes = await _cakeService.GetAllCakes();
            return Ok(cakes);
        }

        // POST /api/cake
        [HttpPost]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> CreateCake([FromForm] CreateCakeRequest request)
        {

            var cakeOptions = JsonConvert.DeserializeObject<List<CakeOption>>(request.CakeOptions) ?? new List<CakeOption>();

            if (cakeOptions is null)
            {
                return BadRequest("Cake options are required.");
            }

            var cake = new Cake
            {
                CakeName = request.CakeName,
                CakeDescription = request.CakeDescription,
                CakeOptions = cakeOptions,
                UserId = request.UserId,
                IsPromoted = request.IsPromoted,
                IsAvailable = request.IsAvailable
            };

            if (request.CakeImages is not null)
            {
                var imageUrls = new List<string>();

                foreach (var file in request.CakeImages)
                {
                    using var stream = file.OpenReadStream();
                    string fileName = $"{Path.GetFileNameWithoutExtension(file.FileName)}_{DateTime.Now.Ticks}{Path.GetExtension(file.FileName)}";

                    string imageUrl = await _cloudflareR2Service.UploadFileAsync(stream, fileName, file.ContentType);
                    imageUrls.Add(imageUrl);
                }
                cake.CakeImages = imageUrls;
            }

            var createdCake = await _cakeService.CreateCake(cake);

            return Ok(createdCake);
        }

    }
}