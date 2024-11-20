
import help from "../styles/help.module.css";
import whatsappIcon from "../imagine/whatsapp.png"; 
import gmailIcon from "../imagine/gmail.png"; 

function Help() {
  return (
    <div className={help.completo_help}>
      {/* Título principal */}
      <h2 className={help.header_help_h2}>Ayuda</h2>

      {/* Contenedor para el subtítulo y el video */}
      <div className={help.videoContainer_help}>
        {/* Subtítulo */}
        <div className={help.header_help}>
          <h3>¿Cómo usar la app?</h3>
        </div>

        {/* Video de demostración */}
        <div className={help.video_help}>
          <video controls width="100%">
            <source src="tu_video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Contacto */}
      <div className={help.contacto_help}>
        <p>Contáctanos:</p>
        <div className={help.contactInfo_help}>
          {/* Contenedor horizontal para WhatsApp y Gmail */}
          <div className={help.contactItem_help}>
            <img
              src={whatsappIcon} // Usando la variable importada
              alt="WhatsApp Icon"
              className={help.icon_help}
            />
            <p>+57 313 436 3660</p>
          </div>
          <div className={help.contactItem_help}>
            <img
              src={gmailIcon} // Usando la variable importada
              alt="Gmail Icon"
              className={help.icon_help}
            />
            <p>PELC_devops@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
