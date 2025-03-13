using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using cakeshop_api.Models;
using cakeshop_api.Services;
using cakeshop_api.Utils;
using MongoDB.Driver;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace cakeshop_api.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly JwtHelper _jwtHelper;

        public UserController(UserService userService, JwtHelper jwtHelper)
        {
            _userService = userService;
            _jwtHelper = jwtHelper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var existingUser = await _userService.GetUserByEmail(user.Email);
            if (existingUser is not null)
            {
                return BadRequest(new { message = "User with this email already exists." });
            }

            var address = user.Address ?? string.Empty;
            var createdUser = await _userService.CreateUser(user.Username, user.Email, user.PasswordHash, user.Role, user.PhoneNumber, address);

            var token = _jwtHelper.GenerateJwtToken(createdUser);

            return Ok(new { User = createdUser, Token = token });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin user)
        {
            var existingUser = await _userService.GetUserByEmail(user.Email);
            if (existingUser is null)
            {
                return BadRequest(new { message = "Invalid Email or Password! Please try again." });
            }

            var isPasswordValid = await _userService.ValidatePassword(existingUser, user.PasswordHash);
            if (!isPasswordValid)
            {
                return BadRequest(new { message = "Invalid Email or Password! Please try again." });
            }

            var token = _jwtHelper.GenerateJwtToken(existingUser);

            return Ok(new { User = existingUser, Token = token });
        }

        [HttpGet("all")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUserByToken()
        {
            var authHeader = Request.Headers["Authorization"].FirstOrDefault();
            if (authHeader == null || !authHeader.StartsWith("Bearer "))
            {
                return Unauthorized(new { message = "Invalid or missing Authorization header." });
            }
            var jwt = authHeader.Substring("Bearer ".Length).Trim();
            Console.WriteLine(jwt);
            var jwtToken = new JwtSecurityTokenHandler().ReadToken(jwt) as JwtSecurityToken;
            if (jwtToken == null)
            {
                return Unauthorized(new { message = "Invalid JWT token." });
            }
            var email = jwtToken.Claims.First(claim => claim.Type == ClaimTypes.Email).Value;
            var user = await _userService.GetUserByEmail(email);
            if (user == null)
            {
                return Unauthorized(new { message = "User not found." });
            }

            return Ok(new { User = user });
        }
    }
}