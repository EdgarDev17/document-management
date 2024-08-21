

using Conference.BL;
using Conference.BL.Utils;
using Conference.DAL;
using Microsoft.Win32;
using Volo.Abp.Data;
using ConnectionStrings = Conference.DAL.ConnectionStrings;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddHttpContextAccessor();

//CORS investigar e implementar

builder.Services.AddCors(configuration =>
{
    configuration.AddDefaultPolicy(options =>
    {
        options.WithOrigins(builder.Configuration["allowedOrigins"]!).AllowAnyMethod().AllowAnyHeader();
    });
});

// Configurar la cadena de conexi�n para inyecci�n de dependencias
builder.Services.Configure<ConnectionStrings>(builder.Configuration.GetSection("ConnectionStrings"));

builder.Services.Configure<Settings>(builder.Configuration.GetSection("Settings"));

builder.Services.Configure<SettingsEmail>(builder.Configuration.GetSection("SettingsEmail"));

builder.Services.AddScoped<EmailSend>();

// Registra la clase Connection para inyecci�n de dependencias
builder.Services.AddScoped<Connection>();

// Registra la clase UserDAL para inyecci�n de dependencias
builder.Services.AddScoped<UserDAL>();

// Registra la clase UserBL para inyecci�n de dependencias
builder.Services.AddScoped<UserBL>();

// Registra la clase conferenceDAL para inyecci�n de dependencias
builder.Services.AddScoped<conferenceDAL>();

// Registra la clase  ConferenceBL para inyecci�n de dependencias
builder.Services.AddScoped<ConferenceBL>();


// Registra la clase ConferenceDocumentDAL para inyecci�n de dependencias
builder.Services.AddScoped<ConferenceDocumentDAL>();

// Registra la clase  ConferenceDocumentBL para inyecci�n de dependencias
builder.Services.AddScoped<ConferenceDocumentBL>();

// Registra la clase  CertificateDAL para inyecci�n de dependencias
builder.Services.AddScoped<CertificateDAL>();

// Registra la clase  CertificateBL para inyecci�n de dependencias
builder.Services.AddScoped<CertificateBL>();

builder.Services.AddScoped<LocalFileSaver>();

builder.Services.AddScoped<RatingDAL>();
builder.Services.AddScoped<RatingBL>();

builder.Services.AddScoped<InstitutionBL>();
builder.Services.AddScoped<InstitutionDAL>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseCors();  
app.UseHttpsRedirection();

app.UseAuthorization();
app.UseStaticFiles();

app.MapControllers();
app.UseRouting();
app.Run();



app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
