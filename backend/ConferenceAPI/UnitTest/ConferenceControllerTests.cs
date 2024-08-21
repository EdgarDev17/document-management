using System.ComponentModel;
using Conference.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
namespace UnitTest;
using Conference.BL;
using ConferenceAPI.Controllers;
using Moq;
using Xunit;

public class ConferenceControllerTests
{
       [Fact]
       public void GetConferencesDetails_ReturnsOkResult_WithListOfConferences() 
       {

    var mockUserBl = new Mock<UserBL>();
    var mockConferenceBl = new Mock<ConferenceBL>();


    var testToken = "token aqui";
    var testUserId = 4;

    var testUser = new UserEN
    {
        UserID = testUserId,
    };

    var testConferences = new List<ConferencesDetailsEN>
    {
        new ConferencesDetailsEN
        {
            conferenceID = 1,
            conference_name = "string",
            conference_type = "string",
            description = "string",
            conference_RegDate = DateTime.Parse("07/28/2024 22:43:44").ToString("yyyy-MM-dd HH:mm:ss"),
            beggingDate = DateTime.Parse("05/18/2024 21:35:30").ToString("yyyy-MM-dd HH:mm:ss"),
            finishDate = DateTime.Parse("08/28/2024 23:54:24").ToString("yyyy-MM-dd HH:mm:ss"),
            documentAttempt = 4,
            institutionID = 1,
            institution_name = "string",
            institution_website = "string",
            institution_contact_phone = "string",
            Status = 1,
            rolID = 1,
        },
    };

    // Setup mocks
    mockUserBl.Setup(u => u.VerifyPersonAuthentication(It.IsAny<IEnumerable<string>>())).Returns(testUser);
    mockConferenceBl.Setup(c => c.get_conferences_general(testUserId)).Returns(testConferences);

    // Configurar el controlador con las dependencias simuladas
    var controller = new ConferenceController(mockConferenceBl.Object, mockUserBl.Object);

    // Configurar el HttpContext con el encabezado Authorization-Token
    controller.ControllerContext = new ControllerContext
    {
        HttpContext = new DefaultHttpContext()
    };
    controller.ControllerContext.HttpContext.Request.Headers["Authorization-Token"] = testToken;

    // Act 
    // Llamar al método GetConferencesDetails
    var result = controller.GetConferencesDetails();

    // Assert 
    // Verificar que el resultado sea de tipo OkObjectResult
    var okResult = Assert.IsType<OkObjectResult>(result.Result);
    Assert.NotNull(okResult);

    // Verificar que el valor devuelto no sea nulo
    var returnedValue = okResult.Value as dynamic;
    Assert.NotNull(returnedValue);

    var conferences = returnedValue.Conference as List<ConferencesDetailsEN>;
    Assert.NotNull(conferences);

    Assert.Equal(testConferences.Count, conferences.Count);

        }
       
}
