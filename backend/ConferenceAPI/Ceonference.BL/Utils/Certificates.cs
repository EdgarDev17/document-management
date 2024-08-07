using QuestPDF.Fluent;
using QuestPDF.Helpers;
using System.IO;

namespace Conference.BL.Utils
{
    public class Certificates
    {
        public static byte[] GeneratePDF(string Title, string Description,
                                       string Signed, string CongressLogo, string CongressSeal,
                                       string RegDate, string DateModified, string BackGroundImgURL,
                                       string OrganizerName1, string OrganizerName2, string OrganizerTitle1,
                                       string OrganizerTitle2, string SignatureImagePath1, string SignatureImagePath2,
                                       string EventDate, string ParticipantName, string InstitutionName, string TitleTopic)
        {
            using var memoryStream = new MemoryStream();
            try {
                var data = Document.Create(document =>
                {
                    document.Page(page =>
                    {
                        // Signature image #1
                        byte[] signature1 = System.IO.File.ReadAllBytes(SignatureImagePath1);

                        // Signature image #2
                        byte[] signature2 = System.IO.File.ReadAllBytes(SignatureImagePath2);

                        // Congress logo
                        byte[] congressLogo = System.IO.File.ReadAllBytes(CongressLogo);

                        // Congress seal
                        //byte[] congressSeal = System.IO.File.ReadAllBytes(CongressSeal);

                        page.Size(PageSizes.A4.Landscape());
                        page.Margin(30);

                        // Configurando encabezado
                        page.Header()
                        .Padding(20).ShowOnce().Row(row =>
                        {
                            row.ConstantItem(150)
                            .Width(150)
                            .AlignLeft()
                            .Image(congressLogo);

                            row.RelativeItem().Column(column =>
                            {
                                column.Item().AlignCenter().Text(InstitutionName.ToUpper()).FontSize(24).Bold().Underline();
                            });

                            row.ConstantItem(150);
                        });

                        page.Content()
                            .Column(column =>
                            {

                                column.Item()
                                    .PaddingVertical(5)
                                    .AlignCenter()
                                    .Text(Title)
                                    .FontSize(25)
                                    .Bold();

                                column.Item().PaddingVertical(10).AlignCenter().Text("Otorgado a:").FontSize(16);
                                column.Item().PaddingVertical(5).AlignCenter().Text(ParticipantName).FontSize(20).Bold();
                                column.Item().PaddingVertical(5).AlignCenter().Text(Description + " " + TitleTopic).FontSize(16);
                                column.Item().PaddingVertical(20).AlignCenter().Text($"Impartido el: {EventDate}").FontSize(16);


                                // Espacio para las firmas
                                column.Item().PaddingVertical(20).Row(row =>
                                {
                                    row.RelativeItem().Column(col =>
                                    {
                                        // Signature image
                                        col.Item().AlignCenter().Width(100).Image(signature1);

                                        // Signature line
                                        col.Item().AlignCenter().Text("_________________________"); // Line color
                                    });

                                    row.RelativeItem().Column(col =>
                                    {
                                        // Signature image
                                        col.Item().AlignCenter().Width(100).Image(signature2);

                                        // Signature line
                                        col.Item().AlignCenter().Text("_________________________"); // Line color
                                    });
                                });

                                column.Item().PaddingVertical(3).Row(row =>
                                {
                                    row.RelativeItem().AlignCenter().Text(OrganizerName1).FontSize(16);
                                    row.RelativeItem().AlignCenter().Text(OrganizerName2).FontSize(16);
                                });

                                column.Item().PaddingVertical(5).Row(row =>
                                {
                                    row.RelativeItem().AlignCenter().Text(OrganizerTitle1).FontSize(16).Bold();
                                    row.RelativeItem().AlignCenter().Text(OrganizerTitle2).FontSize(16).Bold();
                                });

                                column.Item().PaddingVertical(3).AlignCenter().Text("Sello").FontSize(16);

                            });
                    });
                });

                data.GeneratePdf(memoryStream);

            }catch(Exception ex)
            {
                Console.WriteLine(ex.InnerException);
            }

            return memoryStream.ToArray();
        }
    }
}
