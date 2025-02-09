import Destinos from "../components/Destinos";

const Home = () => {
    return (
        <div>
            <div
                style={{
                    backgroundImage: "url('/hero.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textAlign: "center",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    textShadow: "2px 2px 10px rgba(0,0,0,0.5)",
                }}
            >
                <h1>Bienvenido a Lomas Turismo</h1>
            </div>
            <Destinos />
        </div>
    );
};

export default Home;