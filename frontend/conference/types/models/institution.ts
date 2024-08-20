export interface Institution {
  institutionID: number; // `institutionID` es la clave primaria autoincremental.
  name: string; // Nombre de la institución, no puede ser nulo.
  website: string; // Sitio web de la institución, no puede ser nulo.
  contact_phone: string; // Teléfono de contacto, no puede ser nulo.
  DateModified?: Date | null; // Fecha de última modificación, puede ser nulo.
  RegDate?: Date; // Fecha de registro con valor por defecto `CURRENT_TIMESTAMP`.
  description?: string | null; // Descripción de la institución, puede ser nulo.
  userID: number; // ID del usuario asociado, no puede ser nulo.
  image_url?: string | null; // URL de la imagen, puede ser nulo.
  image_name?: string | null; // Nombre de la imagen, puede ser nulo.
  image?: string | null; // Nombre de la imagen, puede ser nulo.
}
