// Loader que se muestra un instante mientras el navegador descarga el
// código de la página a la que estás navegando (ver explicación de
// code splitting en App.jsx). Reusa el mismo estilo de spinner que ya
// usan Destinations.jsx y DestinationDetail.jsx mientras cargan datos,
// para que se sienta parte del mismo sitio y no un loader genérico.
const PageLoader = () => (
  <div className="min-h-[60vh] grid place-items-center">
    <div className="h-10 w-10 rounded-full border-4 border-filete border-t-naranja animate-spin" />
  </div>
);

export default PageLoader;
