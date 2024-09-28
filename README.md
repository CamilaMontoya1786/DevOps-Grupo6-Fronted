A continuación, se detallan los pasos para la instalación del proyecto.

Instrucciones de instalación

1. Clonando los repositorios

	Pasos para la clonación

•	Acceda al Directorio de Trabajo:

Cambie al directorio donde se desea almacenar el código fuente del repositorio. Por ejemplo:

cd /ruta/del/directorio

•	Clone los repositorios: Clone cada repositorio necesario utilizando el comando git clone. Reemplace [URL_del_Repositorio] con la URL correspondiente al repositorio de cada microservicio.

	git clone [URL_del_Repositorio]


Específicamente del Front-End

En la carpeta page encontrará los tres componentes .jsx que se elaboraron en este primer Sprint. 

loguin: contiene el inicio de sesión de la aplicación.

register: contiene el registro de los usuarios. 

restorepassword: contiene el restablecer contraseña de los usuarios este se hará a través del correo electrónico. 


En la carpeta styles encontrará tres archivos .css con los cuales le damos el diseño a los componentes anteriormente comentados. 

El restorepassword.css no lo encontrará desarrollado ya que no se pudo finalizar esta tarea. 


Para la visualización de lo anteriormente evidenciado haga lo siguiente:

1.	Abra la terminal del Visual Studio Code.
2.	
3.	Verifique que esta en la ruta ~/Desktop/MisLuquitas/DevOps-Grupo6-Fronted/Mis_luquitas/client
4.	
5.	Ingrese el comando "npm install" para que se le instalen las dependencias que le hagan falta.
6.	
7.	Ingrese el comando "npm run dev" ; cuando haga eso le saldrá la URL con la cual accederá al proyecto en un navegador.
8.	
9.	El URL anterior cópielo y péguelo en el navegador (Le recomendamos Chrome).
10.	
	Le deberá colocar:

	/loguin si desea visualizar el componente login.

	/register si desea visualizar el componente register.


Con la librería axios al haber instalado tanto el repositorio del backend como del Frontend y tener la base de datos podrá hacer el envío de los desde el navegador web.

