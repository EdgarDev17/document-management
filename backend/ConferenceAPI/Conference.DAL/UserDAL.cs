﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;
using System.Drawing.Drawing2D;
using Dapper;
using System.Data;
using Conference.Entities;
using System.Text.RegularExpressions;
using static System.Net.Mime.MediaTypeNames;
using System.IO;
using System.Xml.Linq;

namespace Conference.DAL
{
    public class UserDAL
    {
        private readonly Connection _connection;

        public UserDAL(Connection connection)
        {
            _connection = connection;
        }

        // Validar si existe correo
        public int EmailExists(string email)
        {
            int response = -1;

            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@p_email", email);
                parameters.Add("@resultado", dbType: DbType.Int32, direction: ParameterDirection.Output);

                _connection.Cnn.Execute("sp_email_exists", parameters, commandType: CommandType.StoredProcedure);

                response = parameters.Get<int>("@resultado");
            }
            catch (Exception ex)
            {
                response = -1;
                _connection.Cnn.Close();
                InsertErrorLog("Error en sp_email_exists BD", ex.Message);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return response;
        }

        // Registro de usuario 
        public UserEN RegisterUsers(string email, string name, string lastname, DateTime birthdate, string passwordSalt, string passwordHash)
        {
            UserEN user = new UserEN();
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_name", name);
                parameters.Add("@p_Lastname", lastname);
                parameters.Add("@p_Email", email);
                parameters.Add("@p_Birthdate", birthdate);
                parameters.Add("@p_passwordSalt", passwordSalt);
                parameters.Add("@p_passwordHash", passwordHash);

                user = _connection.Cnn.Query<UserEN>("user_data_registration", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault()!;
            }
            catch (Exception ex)
            {
                //Console.WriteLine("Error: " + ex.Message);
                _connection.Cnn.Close();

                user = null!;
                InsertErrorLog("Registro usuario SP user_data_registration", ex.Message);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return user;
        }

        // Autenticación de usuario
        public UserEN AuthenticatePerson(string email, string password)
        {
            UserEN user = new UserEN();
            try
            {
                bool isEmail = Regex.IsMatch(email, @"(?i)[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")!;

                if (isEmail)
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@p_email", email);
                    parameters.Add("@p_password", password);

                    user = _connection.Cnn.Query<UserEN>("sp_validate_credentials", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault()!;
                }
            }
            catch (Exception ex)
            {
                _connection.Cnn.Close();
                InsertErrorLog("Error en  AuthenticatePerson userDAL en sp_validate_credentials BD", ex.Message);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return user;
        }

        public UserEN VerifyUser(UserEN pUser)
        {
            UserEN user = new UserEN();
            try
            {
                if (pUser.email != null)
                {
                    var parameters = new DynamicParameters();
                    parameters.Add("@p_email", pUser.email);
                    parameters.Add("@p_password", pUser.Password);

                    user = _connection.Cnn.Query<UserEN>("sp_validate_credentials", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault()!;
                }
            }
            catch (Exception ex)
            {
                _connection.Cnn.Close();
                InsertErrorLog("Error en VerifyUser en userDAL en  sp_validate_credentials BD", ex.Message);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return user;
        }
        // agrega un log general sin especificar un sessionID
        public void InsertErrorLog(string eventText, string message)
        {
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("@p_event", eventText);
                parameters.Add("@p_message", message);


                _connection.Cnn.Execute("INSERT INTO logErrorGernal (event, RegDate, messege) VALUES (@p_event, CURRENT_TIMESTAMP, @p_message)", parameters);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _connection.Cnn.Close();
            }
        }

        //Agregar un log  espeficifico de un sessionID

        public void InsertErrorLogSession(string eventText, string message, int UserID)
        {
            try
            {
                _connection.Cnn.Open();

                var parameters = new DynamicParameters();
                parameters.Add("p_UserID", UserID);
                parameters.Add("p_event", eventText);
                parameters.Add("p_message", message);

                _connection.Cnn.Execute("sp_insert_log", parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            finally
            {
                _connection.Cnn.Close();
            }
        }


        // Actualizar el email confirmado en el registro de usuario en BD
        public int ValidateEmail(int userID)
        {
            int response;
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@p_UserID", userID);
                parameters.Add("@p_Status", dbType: DbType.Int32, direction: ParameterDirection.Output);

                _connection.Cnn.Execute("sp_validate_email", parameters, commandType: CommandType.StoredProcedure);

                response = parameters.Get<int>("@p_Status");
            }
            catch (Exception ex)
            {
                response = -1; // Indicador de error
                _connection.Cnn.Close();
                InsertErrorLog("Error en ValidateEmail en userDAL en  sp_validate_email BD", ex.Message);
            }
            finally
            {
                _connection.Cnn.Close();
            }

            return response;
        }

        // Guardar el inicio de sesión del usuario
        public void SessionStart(int userID)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@p_UserID", userID);

                _connection.Cnn.Execute("sp_start_session", parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error SessionStart: " + ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }
        }

        // Terminar la sesión del usuario
        public void SessionEND(int userID)
        {
            try
            {
                var parameters = new DynamicParameters();
                parameters.Add("@p_UserID", userID);

                _connection.Cnn.Execute("sp_end_session", parameters, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex)
            {
                _connection.Cnn.Close();
                InsertErrorLogSession("Error en SessionEND en userDAL en  sp_end_session BD", ex.Message, userID);
            }
            finally
            {
                _connection.Cnn.Close();
            }
        }



        //Registrar imagen de perfil de usuario
        public int RegisterImagens(byte[] image, string extension, int userId)
        {
            int response = -1;
            System.Drawing.Image newImg = null;
            string ruta = string.Empty;

            try
            {
                // Validar la extensión de la imagen
                var validExtensions = new List<string> { "JPG", "PNG", "JPEG" };
                if (validExtensions.Contains(extension.ToUpper()))
                {
                    using (System.Drawing.Image img = ConvertByteArrayToImage(image))
                    {
                        int ancho = 400;
                        int alto = 250;

                        if (img.Height > img.Width)
                        {
                            ancho = 250;
                            alto = 400;
                        }

                        using (newImg = CambiarTamanoImagen(img, ancho, alto))
                        {
                            string filename = $"{Guid.NewGuid()}.{extension.ToLower()}";
                            string directory = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "ImageUsers");
                            if (!Directory.Exists(directory))
                            {
                                Directory.CreateDirectory(directory);
                            }

                            ruta = Path.Combine(directory, filename);
                            newImg.Save(ruta);

                            using (var connection = _connection.Cnn)
                            {
                                connection.Open();

                                var parameters = new DynamicParameters();
                                parameters.Add("@p_UserID", userId);
                                parameters.Add("@p_url", ruta);
                                parameters.Add("@p_name", filename);
                                parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);

                                connection.Execute("sp_register_imagens", parameters, commandType: CommandType.StoredProcedure);

                                response = parameters.Get<int>("@result");


                                if (response==1)
                                {
                                    newImg.Save(ruta);
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _connection.Cnn.Close();
                InsertErrorLogSession("Error en RegisterImagens en userDAL en sp_register_imagens BD", ex.Message, userId);
            }

            return response;
        }

        public static System.Drawing.Image ConvertByteArrayToImage(byte[] byteArrayImage)
        {
            using (var ms = new System.IO.MemoryStream(byteArrayImage))
            {
                return System.Drawing.Image.FromStream(ms);
            }
        }

        public System.Drawing.Image CambiarTamanoImagen(System.Drawing.Image imagen, int ancho, int alto)
        {
            var bitmap = new Bitmap(ancho, alto);
            using (var graphics = Graphics.FromImage(bitmap))
            {
                graphics.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                graphics.DrawImage(imagen, 0, 0, ancho, alto);
            }
            return bitmap;
        }


        ////Registrar imagen de perfil de usuario

        //public void RegisterImagens(byte[] Image, string extension,int UserID)
        //{
        //    int response = -1;
        //    System.Drawing.Image newImg = null;

        //    var ruta =String.Empty;

        //    try
        //    {


        //    if (extension.ToUpper() == "JPG" || extension.ToUpper() == "PNG" || extension.ToUpper() == "JPEG")
        //    {

        //        System.Drawing.Image img = ConvertByteArrayToImage(Image);
        //        int pAncho = 400;
        //        int pAlto = 250;

        //        if (img.Height > img.Width)
        //        {
        //            pAncho = 250;
        //            pAlto = 400;
        //        }

        //        newImg = CambiarTamanoImagen(img, pAncho, pAlto);

        //        var filename= Guid.NewGuid().ToString()+extension;
        //        ruta = $"ImageUsers/{filename}";

        //        newImg.Save(ruta);

        //            _connection.Cnn.Open();

        //        var parameters = new DynamicParameters();
        //        parameters.Add("@p_UserID", UserID);
        //        parameters.Add("@p_url", ruta);
        //        parameters.Add("@p_name", filename);

        //        parameters.Add("@result", dbType: DbType.Int32, direction: ParameterDirection.Output);

        //        _connection.Cnn.Execute("sp_register_imagens", parameters, commandType: CommandType.StoredProcedure);

        //        response = parameters.Get<int>("@result");


        //    }

        //    }
        //    catch (Exception ex)
        //    {

        //        _connection.Cnn.Close();
        //        InsertErrorLogSession("Error en RegisterImagens en userDAL en sp_register_imagens BD", ex.Message, UserID);
        //    }
        //    finally
        //    {
        //        _connection.Cnn.Close();
        //    }

        //}

        //public static System.Drawing.Image ConvertByteArrayToImage(Byte[] ByteArrayImage)
        //{
        //    using (System.IO.MemoryStream ms = new System.IO.MemoryStream(ByteArrayImage))
        //    {
        //        System.Drawing.Image returnImage = System.Drawing.Image.FromStream(ms);
        //        return returnImage;
        //    }
        //}

        //public System.Drawing.Image CambiarTamanoImagen(System.Drawing.Image pImagen, int pAncho, int pAlto)
        //{
        //    //creamos un bitmap con el nuevo tamaño
        //    Bitmap vBitmap = new Bitmap(pAncho, pAlto);
        //    //creamos un graphics tomando como base el nuevo Bitmap
        //    using (Graphics vGraphics = Graphics.FromImage((System.Drawing.Image)vBitmap))
        //    {
        //        //especificamos el tipo de transformación, se escoge esta para no perder calidad.
        //        vGraphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
        //        //Se dibuja la nueva imagen
        //        vGraphics.DrawImage(pImagen, 0, 0, pAncho, pAlto);
        //    }
        //    //retornamos la nueva imagen
        //    return (System.Drawing.Image)vBitmap;
        //}
    }
}
